import { useState } from 'react';
import type { Patient } from '../types/patient';

/**
 * Controls the create/edit patient dialog: which patient (if any) is being
 * edited, and whether the dialog is open.
 */
export function usePatientDialog() {
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    /** Opens the dialog in "create" mode. */
    function openToCreate() {
        setEditingPatient(null);
        setIsOpen(true);
    }

    /** Opens the dialog in "edit" mode for the given patient. */
    function openToEdit(patient: Patient) {
        setEditingPatient(patient);
        setIsOpen(true);
    }

    return { editingPatient, isOpen, setIsOpen, openToCreate, openToEdit };
}
