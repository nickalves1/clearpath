import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Patient } from '../types/patient';
import { PatientsTable } from './patients-table';

function makePatient(overrides: Partial<Patient> = {}): Patient {
    return {
        id: 1,
        medical_record_number: 'MRN-00001',
        first_name: 'Nicolas',
        last_name: 'Alves',
        birth_date: '1998-06-13',
        gender: 'Male',
        phone: '11999999999',
        email: 'nicolas@example.com',
        created_at: '2026-08-01T00:00:00.000000Z',
        updated_at: '2026-08-01T00:00:00.000000Z',
        deleted_at: null,
        ...overrides,
    };
}

const noop = () => {};

describe('PatientsTable', () => {
    it('shows a message when there are no patients', () => {
        render(
            <PatientsTable
                patients={[]}
                onEdit={noop}
                setToDelete={noop}
                setColumnOrder={noop}
                activeColumn=""
                direction="asc"
                isActiveFilter="true"
            />,
        );

        expect(
            screen.getByText('No patients registered yet.'),
        ).toBeInTheDocument();
    });

    it('hides the Deleted At column when the active filter is "true"', () => {
        render(
            <PatientsTable
                patients={[makePatient()]}
                onEdit={noop}
                setToDelete={noop}
                setColumnOrder={noop}
                activeColumn=""
                direction="asc"
                isActiveFilter="true"
            />,
        );

        expect(screen.queryByText('Deleted At')).not.toBeInTheDocument();
    });

    it('shows the Deleted At column when the active filter is not "true"', () => {
        render(
            <PatientsTable
                patients={[makePatient()]}
                onEdit={noop}
                setToDelete={noop}
                setColumnOrder={noop}
                activeColumn=""
                direction="asc"
                isActiveFilter="all"
            />,
        );

        expect(screen.getByText('Deleted At')).toBeInTheDocument();
    });

    it('hides the edit and delete buttons for a deleted patient', () => {
        render(
            <PatientsTable
                patients={[
                    makePatient({ deleted_at: '2026-08-20T00:00:00.000000Z' }),
                ]}
                onEdit={noop}
                setToDelete={noop}
                setColumnOrder={noop}
                activeColumn=""
                direction="asc"
                isActiveFilter="all"
            />,
        );

        // 8 sortable column headers (Deleted At column shown), 0 action buttons
        expect(screen.getAllByRole('button')).toHaveLength(8);
    });

    it('shows the edit and delete buttons for an active patient', () => {
        render(
            <PatientsTable
                patients={[makePatient()]}
                onEdit={noop}
                setToDelete={noop}
                setColumnOrder={noop}
                activeColumn=""
                direction="asc"
                isActiveFilter="true"
            />,
        );

        expect(screen.getAllByRole('button')).toHaveLength(2 + 7);
    });

    it('calls setColumnOrder with the column name when a header is clicked', () => {
        const setColumnOrder = vi.fn();

        render(
            <PatientsTable
                patients={[makePatient()]}
                onEdit={noop}
                setToDelete={noop}
                setColumnOrder={setColumnOrder}
                activeColumn=""
                direction="asc"
                isActiveFilter="true"
            />,
        );

        fireEvent.click(screen.getByText('Name'));

        expect(setColumnOrder).toHaveBeenCalledWith('first_name');
    });
});
