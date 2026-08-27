import {
    columnVisibilityFeature,
    createColumnHelper,
    tableFeatures,
    useTable,
} from '@tanstack/react-table';
import type { ColumnVisibilityState } from '@tanstack/react-table';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronDown,
    Pen,
    Trash,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Patient } from '../types/patient';

type Props = {
    patients: Patient[];
    onEdit: (patient: Patient) => void;
    setToDelete: (patient: Patient) => void;
    setColumnOrder: (column: string) => void;
    activeColumn: string;
    direction: 'asc' | 'desc';
    isActiveFilter: string;
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('en-US');
}

const COLUMN_LABELS: Record<string, string> = {
    medical_record_number: 'Medical Record Number',
    name: 'Name',
    birth_date: 'Birth Date',
    gender: 'Gender',
    phone: 'Phone',
    email: 'Email',
    created_at: 'Created At',
    deleted_at: 'Deleted At',
};

// Server-side sorting and pagination already live in usePatients — this
// table only needs to render one already-fetched page, so the only
// TanStack Table feature actually in use is column visibility.
const features = tableFeatures({
    columnVisibilityFeature,
});

const columnHelper = createColumnHelper<typeof features, Patient>();

type SortButtonProps = {
    column: string;
    label: string;
    activeColumn: string;
    direction: 'asc' | 'desc';
    onSort: (column: string) => void;
};

/**
 * Clickable column header that sorts by `column` and shows an arrow
 * indicating direction when it's the active column.
 */
function SortButton({
    column,
    label,
    activeColumn,
    direction,
    onSort,
}: SortButtonProps) {
    const isActive = column === activeColumn;

    return (
        <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => onSort(column)}
        >
            {label}
            {isActive ? (
                direction === 'asc' ? (
                    <ArrowUp className="size-4" />
                ) : (
                    <ArrowDown className="size-4" />
                )
            ) : (
                <ArrowUpDown className="size-4 text-muted-foreground" />
            )}
        </Button>
    );
}

/**
 * Sortable, paginated list of patients with per-row edit/delete actions.
 */
export function PatientsTable({
    patients,
    onEdit,
    setToDelete,
    setColumnOrder,
    activeColumn,
    direction,
    isActiveFilter,
}: Props) {
    const [columnVisibility, setColumnVisibility] =
        useState<ColumnVisibilityState>({
            deleted_at: isActiveFilter !== 'true',
        });

    // The "Is Active" filter still decides the Deleted At column's default
    // visibility whenever it changes — the Columns menu lets the user
    // override that in between filter changes. Adjusted during render
    // (not an effect) per React's guidance for state derived from props.
    const [prevIsActiveFilter, setPrevIsActiveFilter] =
        useState(isActiveFilter);

    if (isActiveFilter !== prevIsActiveFilter) {
        setPrevIsActiveFilter(isActiveFilter);
        setColumnVisibility((current) => ({
            ...current,
            deleted_at: isActiveFilter !== 'true',
        }));
    }

    const columns = useMemo(
        () =>
            columnHelper.columns([
                columnHelper.accessor('medical_record_number', {
                    header: () => (
                        <SortButton
                            column="medical_record_number"
                            label={COLUMN_LABELS.medical_record_number}
                            activeColumn={activeColumn}
                            direction={direction}
                            onSort={setColumnOrder}
                        />
                    ),
                    enableHiding: false,
                }),
                columnHelper.display({
                    id: 'name',
                    header: () => (
                        <SortButton
                            column="first_name"
                            label={COLUMN_LABELS.name}
                            activeColumn={activeColumn}
                            direction={direction}
                            onSort={setColumnOrder}
                        />
                    ),
                    cell: ({ row }) =>
                        `${row.original.first_name} ${row.original.last_name}`,
                    enableHiding: false,
                }),
                columnHelper.accessor('birth_date', {
                    header: () => (
                        <SortButton
                            column="birth_date"
                            label={COLUMN_LABELS.birth_date}
                            activeColumn={activeColumn}
                            direction={direction}
                            onSort={setColumnOrder}
                        />
                    ),
                    cell: ({ getValue }) => formatDate(getValue()),
                }),
                columnHelper.accessor('gender', {
                    header: () => (
                        <SortButton
                            column="gender"
                            label={COLUMN_LABELS.gender}
                            activeColumn={activeColumn}
                            direction={direction}
                            onSort={setColumnOrder}
                        />
                    ),
                }),
                columnHelper.accessor('phone', {
                    header: () => (
                        <SortButton
                            column="phone"
                            label={COLUMN_LABELS.phone}
                            activeColumn={activeColumn}
                            direction={direction}
                            onSort={setColumnOrder}
                        />
                    ),
                }),
                columnHelper.accessor('email', {
                    header: () => (
                        <SortButton
                            column="email"
                            label={COLUMN_LABELS.email}
                            activeColumn={activeColumn}
                            direction={direction}
                            onSort={setColumnOrder}
                        />
                    ),
                }),
                columnHelper.accessor('created_at', {
                    header: () => (
                        <SortButton
                            column="created_at"
                            label={COLUMN_LABELS.created_at}
                            activeColumn={activeColumn}
                            direction={direction}
                            onSort={setColumnOrder}
                        />
                    ),
                    cell: ({ getValue }) => formatDate(getValue()),
                }),
                columnHelper.accessor('deleted_at', {
                    header: () => (
                        <SortButton
                            column="deleted_at"
                            label={COLUMN_LABELS.deleted_at}
                            activeColumn={activeColumn}
                            direction={direction}
                            onSort={setColumnOrder}
                        />
                    ),
                    cell: ({ getValue }) => {
                        const value = getValue();

                        return value ? formatDate(value) : '—';
                    },
                }),
                columnHelper.display({
                    id: 'edit',
                    enableHiding: false,
                    cell: ({ row }) =>
                        !row.original.deleted_at && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(row.original)}
                            >
                                <Pen />
                            </Button>
                        ),
                }),
                columnHelper.display({
                    id: 'delete',
                    enableHiding: false,
                    cell: ({ row }) =>
                        !row.original.deleted_at && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setToDelete(row.original)}
                            >
                                <Trash />
                            </Button>
                        ),
                }),
            ]),
        [activeColumn, direction, setColumnOrder, onEdit, setToDelete],
    );

    const table = useTable({
        features,
        data: patients,
        columns,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
        },
    });

    if (patients.length === 0) {
        return (
            <div className="rounded-xl border border-sidebar-border/70 p-6 text-center text-sm text-muted-foreground dark:border-sidebar-border">
                No patients registered yet.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {COLUMN_LABELS[column.id] ?? column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <table.FlexRender header={header} />
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => {
                            const isDeleted = row.original.deleted_at !== null;

                            return (
                                <TableRow
                                    key={row.id}
                                    className={
                                        isDeleted
                                            ? 'bg-muted/40 text-muted-foreground'
                                            : ''
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <table.FlexRender cell={cell} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
