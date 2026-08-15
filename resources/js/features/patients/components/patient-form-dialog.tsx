import type { Patient, CreatePatientPayload } from '../types/patient';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PatientForm } from '@/features/patients';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patient: (Patient| null);
    onSubmit: (payload: CreatePatientPayload) => Promise<Patient>;
};

export function PatientFormDialog({open, onOpenChange, patient, onSubmit } : Props)  {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {patient? 'Editar Paciente' : 'Novo paciente'}
                    </DialogTitle>
                </DialogHeader>
                <PatientForm key={patient?.id ?? 'new'} initialValues={patient ?? undefined} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    );
}
    