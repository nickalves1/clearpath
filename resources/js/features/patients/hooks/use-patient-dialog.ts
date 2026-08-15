import { useState } from 'react';
import type { Patient } from '../types/patient';

export function usePatientDialog() {
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    function openToCreate() {
        setEditingPatient(null);
        setIsOpen(true);
    }

    function openToEdit(patient: Patient) {
        setEditingPatient(patient);
        setIsOpen(true);
    }

    return {editingPatient, isOpen, setIsOpen, openToCreate, openToEdit};
}