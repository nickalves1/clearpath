import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import type { Patient } from '../types/patient';
import { PatientDeleteDialog } from './patient-delete-dialog';

describe('PatientDeleteDialog', () => {
    let patient: Patient;
    let onConfirm: Mock<() => void>;
    let onOpenChange: Mock<(open: boolean) => void>;

    beforeEach(() => {
        patient = {
            id: 1,
            medical_record_number: 'MRN-123456789',
            first_name: 'Nicolas',
            last_name: 'Alves',
            birth_date: '06/13/1998',
            gender: 'Male',
            phone: '19981442121',
            email: 'nicolas@teste.com',
            created_at: '08/20/2026',
            updated_at: '08/20/2026',
            deleted_at: null,
        };

        onConfirm = vi.fn();
        onOpenChange = vi.fn();

        render(
            <PatientDeleteDialog
                patient={patient}
                onOpenChange={onOpenChange}
                onConfirm={onConfirm}
            />,
        );
    });

    it('calls onConfirm when the Confirm button is clicked', () => {
        fireEvent.click(screen.getByText('Confirm'));
        expect(onConfirm).toHaveBeenCalled();
    });

    it('calls onOpenChange when the Cancel button is clicked', () => {
        fireEvent.click(screen.getByText('Cancel'));
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });
});
