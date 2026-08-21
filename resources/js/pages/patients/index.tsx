import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import Paginate from '@/components/paginator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        addPatient,
        editPatient,
        goToPage,
        deletePatient,
        orderByColumn,
        applyFilters,
        handleChangeSearch,
        search,
    } = usePatients();
    const { open, setIsOpen, filters, handleChange, openDialog } =
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
                <div className="flex items-center gap-2">
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
                    <div className="relative ml-auto w-2xs">
                        <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            className="pl-8"
                            placeholder="Search by name, phone, or MRN..."
                            onChange={handleChangeSearch}
                            value={search}
                        />
                    </div>
                </div>
                <PatientFiltersDialog
                    open={open}
                    onOpenChange={setIsOpen}
                    handleChange={handleChange}
                    filters={filters}
                    applyFilters={applyFilters}
                />
                <PatientFormDialog
                    open={dialog.isOpen}
                    onOpenChange={dialog.setIsOpen}
                    patient={dialog.editingPatient}
                    onSubmit={handleSubmit}
                />
                {data.loading && (
                    <p className="text-sm text-muted-foreground">
                        Loading patients...
                    </p>
                )}
                {data.error && (
                    <p className="text-sm text-destructive">{data.error}</p>
                )}
                {!data.loading && !data.error && (
                    <>
                        <PatientsTable
                            patients={data.patients}
                            onEdit={dialog.openToEdit}
                            setToDelete={setPatientToDelete}
                            setColumnOrder={orderByColumn}
                            activeColumn={data.column}
                            direction={data.direction}
                            isActiveFilter={filters.is_active}
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
                        <Paginate
                            meta={data.meta}
                            page={data.page}
                            goToPage={goToPage}
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
