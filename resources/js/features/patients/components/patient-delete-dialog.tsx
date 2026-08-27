import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Patient } from '../types/patient';

type Props = {
    patient: Patient | null;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
};

/**
 * Confirmation dialog shown before deleting a patient.
 * Open state is derived from `patient`: it's open whenever a patient is set.
 */
export function PatientDeleteDialog({
    patient,
    onOpenChange,
    onConfirm,
}: Props) {
    return (
        <AlertDialog open={!!patient} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Patient</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
