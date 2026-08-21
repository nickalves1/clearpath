import PatientsController from '@/actions/App/Http/Controllers/PatientsController';
import { ValidationError } from '@/lib/http/errors/validation-error';
import type {
    CreatePatientPayload,
    Patient,
    PaginatedResponse,
    FiltersPatients,
} from '../types/patient';

/**
 * Thin wrapper around `fetch`. The only function in the project that knows
 * the raw shape of an HTTP response (status code, JSON, errors) — hooks and
 * components never deal with that directly.
 *
 * Throws a {@link ValidationError} on a 422 response, or a plain `Error`
 * (using the server's message when available) for any other non-OK response.
 */
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);

        if (response.status === 422 && body?.message) {
            throw new ValidationError(body.message, body.errors);
        }

        throw new Error(
            body?.message ?? `Request failed (status ${response.status})`,
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

/**
 * Fetches a page of patients.
 *
 * @param page - 1-indexed page number.
 * @param sort - Column to sort by; prefix with `-` for descending (e.g. `-first_name`).
 */
export function getPatients(
    page: number,
    sort: string,
    filters?: FiltersPatients,
    search?: string,
): Promise<PaginatedResponse<Patient>> {
    const { url, method } = PatientsController.index({
        query: { page, sort, filters, search },
    });

    return request<PaginatedResponse<Patient>>(url, { method });
}

/** Creates a new patient. */
export function createPatient(payload: CreatePatientPayload): Promise<Patient> {
    const { url, method } = PatientsController.store();

    return request<Patient>(url, {
        method,
        body: JSON.stringify(payload),
    });
}

/** Updates an existing patient by id. */
export function updatePatient(
    id: number,
    payload: CreatePatientPayload,
): Promise<Patient> {
    const { url, method } = PatientsController.update(id);

    return request<Patient>(url, {
        method,
        body: JSON.stringify(payload),
    });
}

/** Deletes a patient. */
export function destroyPatient(patient: Patient): Promise<void> {
    const { url, method } = PatientsController.destroy(patient);

    return request<void>(url, {
        method,
    });
}
