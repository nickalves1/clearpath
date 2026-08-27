import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { FiltersPatients } from '../types/patient';
import PatientFiltersForm from './patient-filters-form';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleChange: (field: keyof FiltersPatients) => (value: string) => void;
    filters: FiltersPatients;
    applyFilters: (filters: FiltersPatients) => void;
    resetFilters: () => void;
};

export function PatientFiltersDialog({
    open,
    onOpenChange,
    handleChange,
    filters,
    applyFilters,
    resetFilters,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-125">
                <DialogHeader>
                    <DialogTitle>Filter Patients</DialogTitle>
                </DialogHeader>
                <PatientFiltersForm
                    handleChange={handleChange}
                    filters={filters}
                    applyFilters={applyFilters}
                    onOpenChange={onOpenChange}
                    resetFilters={resetFilters}
                />
            </DialogContent>
        </Dialog>
    );
}
