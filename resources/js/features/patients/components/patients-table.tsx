import { Button } from '@/components/ui/button';
import type { Patient } from '../types/patient';
import { Pen, Trash, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

type Props = {
    patients: Patient[];
    onEdit: (patient: Patient) => void;
    setToDelete: (patient: Patient) => void;
    setColumnOrder: (column: string) => void;
    activeColumn: string;
    direction: 'asc' | 'desc';
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR');
}

type SortableHeaderProps = {
    column: string;
    label: string;
    activeColumn: string;
    direction: 'asc' | 'desc';
    onSort: (column: string) => void;
};

function SortableHeader({ column, label, activeColumn, direction, onSort }: SortableHeaderProps) {
    const isActive = column === activeColumn;

    return (
        <th className="px-4 py-3 font-medium" scope="rowgroup">
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => onSort(column)}>
                {label}
                {isActive ? (
                    direction === 'asc' ? <ArrowUp className="size-4" /> : <ArrowDown className="size-4" />
                ) : (
                    <ArrowUpDown className="size-4 text-muted-foreground" />
                )}
            </Button>
        </th>
    );
}

export function PatientsTable({ patients, onEdit, setToDelete, setColumnOrder, activeColumn, direction }: Props) {
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
                        <SortableHeader column="medical_record_number" label="Prontuário" activeColumn={activeColumn} direction={direction} onSort={setColumnOrder} />
                        <SortableHeader column="first_name" label="Nome" activeColumn={activeColumn} direction={direction} onSort={setColumnOrder} />
                        <SortableHeader column="birth_date" label="Nascimento" activeColumn={activeColumn} direction={direction} onSort={setColumnOrder} />
                        <SortableHeader column="gender" label="Gênero" activeColumn={activeColumn} direction={direction} onSort={setColumnOrder} />
                        <SortableHeader column="phone" label="Telefone" activeColumn={activeColumn} direction={direction} onSort={setColumnOrder} />
                        <SortableHeader column="email" label="Email" activeColumn={activeColumn} direction={direction} onSort={setColumnOrder} />
                        <th className="py-3 font-medium"></th>
                        <th className="py-3 font-medium"></th>
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
                            <td className="py-3">
                                <Button variant="ghost" size="icon" onClick={() => onEdit(patient)}>
                                    <Pen />
                                </Button>
                            </td>
                            <td className="py-3">
                                <Button variant="ghost" size="icon" onClick={() => setToDelete(patient)}>
                                    <Trash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}