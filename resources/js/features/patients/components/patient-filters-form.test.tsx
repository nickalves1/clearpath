import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { FiltersPatients } from '../types/patient';
import PatientFiltersForm from './patient-filters-form';

const baseFilters: FiltersPatients = {
    is_active: 'all',
    gender: 'all',
    created_at: 'all',
    created_at_from: null,
    created_at_to: null,
    deleted_at: 'all',
    deleted_at_from: null,
    deleted_at_to: null,
};

describe('PatientFiltersForm', () => {
    it('does not show the Created At date range inputs by default', () => {
        render(
            <PatientFiltersForm
                handleChange={() => vi.fn()}
                filters={baseFilters}
                applyFilters={vi.fn()}
                onOpenChange={vi.fn()}
            />
        );

        expect(screen.queryByLabelText('From')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('To')).not.toBeInTheDocument();
    });

    it('shows the Created At date range inputs when the preset is custom', () => {
        render(
            <PatientFiltersForm
                handleChange={() => vi.fn()}
                filters={{ ...baseFilters, created_at: 'custom' }}
                applyFilters={vi.fn()}
                onOpenChange={vi.fn()}
            />
        );

        expect(screen.getByLabelText('From')).toBeInTheDocument();
        expect(screen.getByLabelText('To')).toBeInTheDocument();
    });

    it('calls applyFilters with the current filters and closes the dialog on submit', () => {
        const applyFilters = vi.fn();
        const onOpenChange = vi.fn();

        render(
            <PatientFiltersForm
                handleChange={() => vi.fn()}
                filters={baseFilters}
                applyFilters={applyFilters}
                onOpenChange={onOpenChange}
            />
        );

        fireEvent.click(screen.getByText('Apply'));

        expect(applyFilters).toHaveBeenCalledWith(baseFilters);
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });
});
