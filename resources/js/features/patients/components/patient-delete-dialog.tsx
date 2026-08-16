import type { Patient } from '../types/patient';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
    patient: Patient | null;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
};

export function PatientDeleteDialog({ patient, onOpenChange, onConfirm }: Props) {
    return (
        <Dialog open={!!patient} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                    <DialogTitle className="text-center">Deseja mesmo deletar?</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button variant="destructive" onClick={onConfirm}>Confirmar</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}