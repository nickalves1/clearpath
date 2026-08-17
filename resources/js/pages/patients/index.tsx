import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { PatientsTable, usePatients, usePatientDialog, PatientFormDialog, usePatientDeleteDialog, PatientDeleteDialog } from '@/features/patients';
import type {CreatePatientPayload} from '@/features/patients/types/patient';
import { Button } from '@/components/ui/button';
import Paginate from '@/components/paginator';
import { toast } from 'sonner';

export default function PatientsIndex() {
    const { data, addPatient, editPatient, goToPage, deletePatient, orderByColumn } = usePatients();
    const dialog = usePatientDialog();
    const {  patientToDelete, handleConfirmDelete,  setPatientToDelete } = usePatientDeleteDialog({deletePatient});

    const handleSubmit = async (payload: CreatePatientPayload) => {
        const result = dialog.editingPatient
        ? await editPatient(dialog.editingPatient.id, payload)
        : await addPatient(payload);

        toast.success(dialog.editingPatient ? 'Patient updated successfully!' : 'Patient created successfully!');

        dialog.setIsOpen(false);
        return result;
    }

    return (
        <>
            <Head title="Patients" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title="Patients" description="Patient registration and listing" />
                <Button className="w-fit" onClick={()=>{dialog.openToCreate()}}>New Patient</Button>
                <PatientFormDialog
                    open={dialog.isOpen}
                    onOpenChange={dialog.setIsOpen}
                    patient={dialog.editingPatient}
                    onSubmit={handleSubmit}
                />
                {data.loading && <p className="text-sm text-muted-foreground">Loading patients...</p>}
                {data.error && <p className="text-sm text-destructive">{data.error}</p>}
                {!data.loading && !data.error && (
                    <>
                        <PatientsTable
                            patients={data.patients}
                            onEdit={dialog.openToEdit}
                            setToDelete={setPatientToDelete}
                            setColumnOrder={orderByColumn}
                            activeColumn={data.column}
                            direction={data.direction}
                        />
                        <PatientDeleteDialog
                            patient={patientToDelete}
                            onOpenChange={(open) => { if (!open) setPatientToDelete(null); }}
                            onConfirm={handleConfirmDelete}
                        />
                        <Paginate meta={data.meta} page={data.page} goToPage={goToPage}/>
                    </>
                )}
            </div>
        </>
    );
}

PatientsIndex.layout = {
    breadcrumbs: [{ title: 'Patients', href: '/patients' }],
};
