import { useState } from 'react';
import type { Patient } from '../types/patient';
import { toast } from 'sonner';

type Props = {
    deletePatient: (patient: Patient) => void;
}
export function usePatientDeleteDialog({deletePatient} : Props) {

    const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

    async function handleConfirmDelete() {
        if (!patientToDelete) return;
        await deletePatient(patientToDelete);
        toast.success('Paciente excluído com sucesso!');
        setPatientToDelete(null);
    }

    return { patientToDelete, handleConfirmDelete,  setPatientToDelete};
}
