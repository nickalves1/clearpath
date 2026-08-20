import { useCallback, useEffect, useState } from 'react';
import { createPatient, getPatients, updatePatient, destroyPatient } from '../services/patients.service';
import type { CreatePatientPayload, Patient, PaginatedResponse, FiltersPatients } from '../types/patient';
import { toast } from 'sonner';

const emptyFilters: FiltersPatients = {
    is_active: 'true',
    gender: 'all',
    created_at: 'all',
    created_at_from: null,
    created_at_to: null,
    deleted_at: 'all',
    deleted_at_from: null,
    deleted_at_to: null,
};

/**
 * Fetches and manages the paginated, sortable list of patients, plus the
 * mutations (create, update, delete) that keep it in sync.
 */
export function usePatients() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [meta, setMeta] = useState<PaginatedResponse<Patient>['meta'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [column, setColumn] = useState<string>('');
    const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
    const [filters, setSelectedFilters] = useState<FiltersPatients>(emptyFilters);

    /**
     * Fetches the current page of patients, applying the active sort column,
     * direction, and filters.
     */
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const sort = direction === 'desc' ? `-${column}` : column;
            const response = await getPatients(page, sort, filters);
            setPatients(response.data);
            setMeta(response.meta);
        } catch (err) {
            console.log(err);
            const message = err instanceof Error ? err.message : 'Failed to load patients.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [page, column, direction, filters]);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    /**
     * Creates a patient and refetches the current page to reflect it.
     */
    const addPatient = useCallback(async (payload: CreatePatientPayload) => {
        const newPatient = await createPatient(payload);
        await fetchPatients();
        return newPatient;
    }, [fetchPatients]);

    /**
     * Updates a patient and replaces it in the local list in place.
     */
    const editPatient = useCallback(async (id: number, payload: CreatePatientPayload) => {
        const currentPatient = await updatePatient(id, payload);
        setPatients((current) =>
            current.map((patient) => (patient.id === currentPatient.id ? currentPatient : patient))
        );
        return currentPatient;
    }, []);

    /**
     * Deletes a patient, refetches the current page, and removes it from the local list.
     */
    const deletePatient = useCallback(async (patient: Patient) => {
        await destroyPatient(patient);
        await fetchPatients();
        setPatients((current) => current.filter((p) => p.id !== patient.id));
    }, [fetchPatients]);

    /**
     * Navigates to the given page number.
     */
    const goToPage = useCallback((page: number) => {
        setPage(page);
    }, []);

    /**
     * Sorts by the given column. Toggles direction if it's already the active
     * column, otherwise switches to it in ascending order.
     */
    const orderByColumn = useCallback((newColumn: string) => {
        if (newColumn === column) {
            setDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
        } else {
            setColumn(newColumn);
            setDirection('asc');
        }
    }, [column]);

    /**
     * Replaces the active filters, triggering a refetch on the next render.
     */
    const applyFilters = useCallback((appliedFilters: FiltersPatients) => {
        setSelectedFilters(appliedFilters);
    }, [filters]);

    return {
        data: { patients, loading, error, meta, page, column, direction },
        refetch: fetchPatients,
        addPatient,
        editPatient,
        goToPage,
        deletePatient,
        orderByColumn,
        applyFilters,
    };
}
