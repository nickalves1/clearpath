import type { Patient } from '../types/patient';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
    patient: Patient | null;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
};

/**
 * Confirmation dialog shown before deleting a patient.
 * Open state is derived from `patient`: it's open whenever a patient is set.
 */
export function PatientDeleteDialog({ patient, onOpenChange, onConfirm }: Props) {
    return (
        <Dialog open={!!patient} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">Are you sure you want to delete this?</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center gap-2 max-h-20">
                    <Button variant="outline" className="w-28" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant="destructive" className="w-28" onClick={onConfirm}>Confirm</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}