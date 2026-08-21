import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import * as patientsService from '@/features/patients/services/patients.service';
import type { Patient, PaginatedResponse } from '@/features/patients/types/patient';
import PatientsIndex from './index';

vi.mock('@/features/patients/services/patients.service');
vi.mock('@inertiajs/react', () => ({
    Head: () => null,
}));

const patient: Patient = {
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

function makeResponse(patients: Patient[]): PaginatedResponse<Patient> {
    return {
        data: patients,
        links: { first: null, last: null, prev: null, next: null },
        meta: { current_page: 1, from: 1, last_page: 1, per_page: 10, to: patients.length, total: patients.length },
    };
}

describe('PatientsIndex page flow', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(patientsService.getPatients).mockResolvedValue(makeResponse([patient]));
    });

    it('loads and shows the patient list on the initial render', async () => {
        render(<PatientsIndex />);

        expect(await screen.findByText('Nicolas Alves')).toBeInTheDocument();
    });

    it('opens the filter dialog when the Filter button is clicked', async () => {
        render(<PatientsIndex />);
        await screen.findByText('Nicolas Alves');

        fireEvent.click(screen.getByText('Filter'));

        expect(await screen.findByText('Filter Patients')).toBeInTheDocument();
    });

    it('opens the new patient dialog when the New Patient button is clicked', async () => {
        render(<PatientsIndex />);
        await screen.findByText('Nicolas Alves');

        fireEvent.click(screen.getByText('New Patient'));

        expect(await screen.findByText('Add Patient')).toBeInTheDocument();
    });

    it('opens the delete confirmation dialog when the delete button is clicked', async () => {
        render(<PatientsIndex />);
        await screen.findByText('Nicolas Alves');

        const deleteButtons = screen.getAllByRole('button').filter((button) => button.querySelector('svg.lucide-trash'));
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(screen.getByText('Are you sure you want to delete this?')).toBeInTheDocument();
        });
    });
});
