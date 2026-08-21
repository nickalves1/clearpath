import { useState } from 'react';
import { toast } from 'sonner';
import type { Patient } from '../types/patient';

type Props = {
    deletePatient: (patient: Patient) => void;
};

/**
 * Controls the delete confirmation dialog: which patient (if any) is pending
 * deletion, and the confirm action that actually deletes it.
 */
export function usePatientDeleteDialog({ deletePatient }: Props) {
    const [patientToDelete, setPatientToDelete] = useState<Patient | null>(
        null,
    );

    /** Deletes the pending patient and closes the dialog. */
    async function handleConfirmDelete() {
        if (!patientToDelete) {
            return;
        }

        await deletePatient(patientToDelete);
        toast.success('Patient deleted successfully!');
        setPatientToDelete(null);
    }

    return { patientToDelete, handleConfirmDelete, setPatientToDelete };
}
