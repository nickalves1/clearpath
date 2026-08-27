import { Head } from '@inertiajs/react';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    PatientsTable,
    usePatients,
    usePatientDialog,
    PatientFormDialog,
    usePatientDeleteDialog,
    PatientDeleteDialog,
    PatientFiltersDialog,
    usePatientFiltersDialog,
} from '@/features/patients';
import type { CreatePatientPayload } from '@/features/patients/types/patient';

export default function PatientsIndex() {
    const {
        data,
        filters: appliedFilters,
        addPatient,
        editPatient,
        goToPage,
        deletePatient,
        orderByColumn,
        applyFilters,
        handleChangeSearch,
        search,
    } = usePatients();
    const { open, setIsOpen, filters, handleChange, openDialog, resetFilters } =
        usePatientFiltersDialog();
    const dialog = usePatientDialog();
    const { patientToDelete, handleConfirmDelete, setPatientToDelete } =
        usePatientDeleteDialog({ deletePatient });

    const handleSubmit = async (payload: CreatePatientPayload) => {
        const result = dialog.editingPatient
            ? await editPatient(dialog.editingPatient.id, payload)
            : await addPatient(payload);

        toast.success(
            dialog.editingPatient
                ? 'Patient updated successfully!'
                : 'Patient created successfully!',
        );

        dialog.setIsOpen(false);

        return result;
    };

    return (
        <>
            <Head title="Patients" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading
                    title="Patients"
                    description="Patient registration and listing"
                />
                <PatientFiltersDialog
                    open={open}
                    onOpenChange={setIsOpen}
                    handleChange={handleChange}
                    filters={filters}
                    applyFilters={applyFilters}
                    resetFilters={resetFilters}
                />
                <PatientFormDialog
                    open={dialog.isOpen}
                    onOpenChange={dialog.setIsOpen}
                    patient={dialog.editingPatient}
                    onSubmit={handleSubmit}
                />
                {data.error && (
                    <p className="text-sm text-destructive">{data.error}</p>
                )}
                {!data.error && (
                    <>
                        <PatientsTable
                            patients={data.patients}
                            onEdit={dialog.openToEdit}
                            setToDelete={setPatientToDelete}
                            setColumnOrder={orderByColumn}
                            activeColumn={data.column}
                            direction={data.direction}
                            isActiveFilter={appliedFilters.is_active}
                            search={search}
                            onSearchChange={handleChangeSearch}
                            meta={data.meta}
                            page={data.page}
                            goToPage={goToPage}
                            toolbarActions={
                                <>
                                    <Button
                                        className="w-36"
                                        onClick={() => {
                                            dialog.openToCreate();
                                        }}
                                    >
                                        New Patient
                                    </Button>
                                    <Button
                                        className="w-36"
                                        variant="outline"
                                        onClick={() => {
                                            openDialog();
                                        }}
                                    >
                                        Filter
                                    </Button>
                                </>
                            }
                        />
                        <PatientDeleteDialog
                            patient={patientToDelete}
                            onOpenChange={(open) => {
                                if (!open) {
                                    setPatientToDelete(null);
                                }
                            }}
                            onConfirm={handleConfirmDelete}
                        />
                    </>
                )}
            </div>
        </>
    );
}

PatientsIndex.layout = {
    breadcrumbs: [{ title: 'Patients', href: '/patients' }],
};
