import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePatientFiltersDialog } from './use-patient-filters-dialog';

describe('usePatientFiltersDialog', () => {
    it('starts with is_active defaulting to "true" and the rest "all"', () => {
        const { result } = renderHook(() => usePatientFiltersDialog());

        expect(result.current.filters.is_active).toBe('true');
        expect(result.current.filters.gender).toBe('all');
    });

    it('updates only the given field, keeping the rest of the filters untouched', () => {
        const { result } = renderHook(() => usePatientFiltersDialog());

        act(() => {
            result.current.handleChange('gender')('Male');
        });

        expect(result.current.filters.gender).toBe('Male');
        expect(result.current.filters.is_active).toBe('true');
        expect(result.current.filters.created_at).toBe('all');
    });

    it('opens the dialog', () => {
        const { result } = renderHook(() => usePatientFiltersDialog());

        expect(result.current.open).toBe(false);

        act(() => {
            result.current.openDialog();
        });

        expect(result.current.open).toBe(true);
    });
});
