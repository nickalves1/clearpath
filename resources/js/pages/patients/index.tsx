import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { PatientForm, PatientsTable, usePatients } from '@/features/patients';
import { dashboard } from '@/routes';

/**
 * A "page" é intencionalmente burra: ela só junta o hook (dados + ações)
 * com os componentes visuais da feature. Quase nenhuma lógica deveria morar aqui.
 */
export default function PatientsIndex() {
    const { patients, loading, error, addPatient } = usePatients();

    return (
        <>
            <Head title="Pacientes" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title="Pacientes" description="Cadastro e listagem de pacientes" />

                <PatientForm onSubmit={addPatient} />

                {loading && <p className="text-sm text-muted-foreground">Carregando pacientes...</p>}
                {error && <p className="text-sm text-destructive">{error}</p>}
                {!loading && !error && <PatientsTable patients={patients} />}
            </div>
        </>
    );
}

// Segue o mesmo padrão que você já tem em dashboard.tsx / profile.tsx
PatientsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Pacientes', href: '/patients' },
    ],
};
