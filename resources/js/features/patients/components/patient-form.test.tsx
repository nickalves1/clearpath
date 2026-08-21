import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ValidationError } from '@/lib/http/errors/validation-error';
import type { Patient } from '../types/patient';
import { PatientForm } from './patient-form';

const existingPatient: Patient = {
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
};

describe('PatientForm', () => {
    it('shows "Add Patient" and empty fields in create mode', () => {
        render(<PatientForm onSubmit={vi.fn()} />);

        expect(screen.getByText('Add Patient')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name')).toHaveValue('');
    });

    it('shows "Save" and pre-filled fields in edit mode', () => {
        render(
            <PatientForm onSubmit={vi.fn()} initialValues={existingPatient} />,
        );

        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name')).toHaveValue('Nicolas');
    });

    it('calls onSubmit with the current form values when submitted', async () => {
        const onSubmit = vi.fn().mockResolvedValue(existingPatient);

        render(
            <PatientForm onSubmit={onSubmit} initialValues={existingPatient} />,
        );

        fireEvent.change(screen.getByLabelText('First Name'), {
            target: { value: 'Ana' },
        });
        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith(
                expect.objectContaining({ first_name: 'Ana' }),
            );
        });
    });

    it('shows field-level validation errors when onSubmit throws a ValidationError', async () => {
        const onSubmit = vi.fn().mockRejectedValue(
            new ValidationError('The given data was invalid.', {
                first_name: ['The first name field is required.'],
            }),
        );

        render(
            <PatientForm onSubmit={onSubmit} initialValues={existingPatient} />,
        );

        fireEvent.click(screen.getByText('Save'));

        expect(
            await screen.findByText('The first name field is required.'),
        ).toBeInTheDocument();
    });
});
