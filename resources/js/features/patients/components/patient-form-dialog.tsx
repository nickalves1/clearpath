import type { Patient, CreatePatientPayload } from '../types/patient';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PatientForm } from '@/features/patients';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patient: Patient | null;
    onSubmit: (payload: CreatePatientPayload) => Promise<Patient>;
};

/**
 * Dialog wrapping PatientForm for both creating and editing a patient.
 * `patient` selects the mode: `null` renders the form empty ("New Patient"),
 * a `Patient` pre-fills it ("Edit Patient").
 */
export function PatientFormDialog({ open, onOpenChange, patient, onSubmit }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{patient ? 'Edit Patient' : 'New Patient'}</DialogTitle>
                </DialogHeader>
                <PatientForm key={patient?.id ?? 'new'} initialValues={patient ?? undefined} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    );
}
