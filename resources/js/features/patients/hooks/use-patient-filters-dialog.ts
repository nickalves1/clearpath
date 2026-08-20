import { useState } from 'react';
import { FiltersPatients } from '../types/patient'
/**
 * Control the state and select type filters
 */

const emptyForm: FiltersPatients = {
    is_active: 'true',
    gender: 'all',
    created_at: 'all',
    created_at_from: null,
    created_at_to: null,
    deleted_at: 'all',
    deleted_at_from: null,
    deleted_at_to: null,
};

export function usePatientFiltersDialog()
{
    const [open, setIsOpen] = useState(false)
    const [filters, setFilters] = useState<FiltersPatients>(emptyForm);

    /** Opens the dialog. */
    function openDialog() {
        setIsOpen(true);
    }

    /**
     * Returns a handler bound to the given field, for updating a single
     * filter value without touching the rest of `filters`.
     */
    function handleChange(field: keyof FiltersPatients) {
         return (value: string) => setFilters((current) => ({ ...current, [field]: value }));
    }

    return {open, setIsOpen, filters, setFilters, openDialog, handleChange};
}