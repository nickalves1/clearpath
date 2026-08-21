/** Allowed values for `Patient.gender`, matching the backend's validation rules. */
export const GENDER_OPTIONS = [
    'Male',
    'Female',
    'Other',
    'Prefer not to say',
] as const;

/**
 * Mirrors the `patients` table (migration + $fillable on the Patient model).
 * This is the contract between the front and back ends.
 */
export interface Patient {
    id: number;
    medical_record_number: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    gender: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

/** Fields the create/edit form sends to the API. */
export type CreatePatientPayload = Pick<
    Patient,
    | 'medical_record_number'
    | 'first_name'
    | 'last_name'
    | 'birth_date'
    | 'gender'
    | 'phone'
    | 'email'
>;

/** Shape of a Laravel API Resource collection wrapping a paginated response. */
export type PaginatedResponse<T> = {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        per_page: number;
        to: number | null;
        total: number;
    };
};

/** Fields to filter patients on screen patients. */
export type FiltersPatients = {
    is_active: string;
    gender: string;
    created_at: string;
    created_at_from: string | null;
    created_at_to: string | null;
    deleted_at: string;
    deleted_at_from: string | null;
    deleted_at_to: string | null;
};
