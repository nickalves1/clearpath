import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { PatientsTable, usePatients, usePatientDialog, PatientFormDialog } from '@/features/patients';
import type {CreatePatientPayload} from '@/features/patients/types/patient';
import { Button } from '@/components/ui/button';
import Paginate from '@/components/paginator';

/**
 * A "page" é intencionalmente burra: ela só junta o hook (dados + ações)
 * com os componentes visuais da feature. Quase nenhuma lógica deveria morar aqui.
 */
export default function PatientsIndex() {
    const { data, addPatient, editPatient, goToPage } = usePatients();
    const dialog = usePatientDialog();

    const handleSubmit = async (payload: CreatePatientPayload) => {
        const result = dialog.editingPatient
        ? await editPatient(dialog.editingPatient.id, payload)
        : await addPatient(payload);
        dialog.setIsOpen(false);
        return result;
    }

    return (
        <>
            <Head title="Pacientes" />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title="Pacientes" description="Cadastro e listagem de pacientes" />
                <Button className="w-fit" onClick={()=>{dialog.openToCreate()}}>Novo paciente</Button>
                <PatientFormDialog
                    open={dialog.isOpen}
                    onOpenChange={dialog.setIsOpen}
                    patient={dialog.editingPatient}
                    onSubmit={handleSubmit}
                />  
                {data.loading && <p className="text-sm text-muted-foreground">Carregando pacientes...</p>}
                {data.error && <p className="text-sm text-destructive">{data.error}</p>}
                {!data.loading && !data.error && (
                    <>
                        <PatientsTable patients={data.patients} onEdit={dialog.openToEdit} />
                        <Paginate meta={data.meta} page={data.page} goToPage={goToPage}/>
                    </>
                )}
            </div>
        </>
    );
}

// Segue o mesmo padrão que você já tem em dashboard.tsx / profile.tsx
PatientsIndex.layout = {
    breadcrumbs: [
        //{ title: 'Dashboard', href: dashboard() },
        { title: 'Pacientes', href: '/patients' },
    ],
};
