import type { Patient } from '../types/patient';

type Props = {
    patients: Patient[];
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR');
}

/**
 * Componente "burro" (presentational component): só recebe dados via props
 * e renderiza. Não sabe de onde `patients` veio (API? mock? outro hook?).
 * Isso facilita reaproveitar em outra tela e testar isoladamente.
 */
export function PatientsTable({ patients }: Props) {
    if (patients.length === 0) {
        return (
            <div className="rounded-xl border border-sidebar-border/70 p-6 text-center text-sm text-muted-foreground dark:border-sidebar-border">
                Nenhum paciente cadastrado ainda.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-sidebar-border/70 bg-muted/50 dark:border-sidebar-border">
                    <tr>
                        <th className="px-4 py-3 font-medium">Prontuário</th>
                        <th className="px-4 py-3 font-medium">Nome</th>
                        <th className="px-4 py-3 font-medium">Nascimento</th>
                        <th className="px-4 py-3 font-medium">Gênero</th>
                        <th className="px-4 py-3 font-medium">Telefone</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        // `key` é obrigatório em listas no React: ajuda ele a saber
                        // qual <tr> corresponde a qual dado entre um render e outro.
                        <tr
                            key={patient.id}
                            className="border-b border-sidebar-border/50 last:border-0 dark:border-sidebar-border/50"
                        >
                            <td className="px-4 py-3">{patient.medical_record_number}</td>
                            <td className="px-4 py-3">
                                {patient.first_name} {patient.last_name}
                            </td>
                            <td className="px-4 py-3">{formatDate(patient.birth_date)}</td>
                            <td className="px-4 py-3">{patient.gender}</td>
                            <td className="px-4 py-3">{patient.phone}</td>
                            <td className="px-4 py-3">{patient.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
