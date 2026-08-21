import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import type { FiltersPatients } from '../types/patient';
import { GENDER_OPTIONS } from '../types/patient';

type Props = {
    handleChange: (field: keyof FiltersPatients) => (value: string) => void;
    filters: FiltersPatients;
    applyFilters: (filters: FiltersPatients) => void;
    onOpenChange: (open: boolean) => void;
};

export default function PatientFiltersForm({
    handleChange,
    filters,
    applyFilters,
    onOpenChange,
}: Props) {
    return (
        <form
            onSubmit={(event) => {
                applyFilters(filters);
                event.preventDefault();
                onOpenChange(false);
            }}
            className="grid gap-2 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
        >
            <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="is_active">Is Active</Label>
                <Select
                    value={filters.is_active}
                    onValueChange={handleChange('is_active')}
                >
                    <SelectTrigger className="w-full" id="is_active">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                <Label htmlFor="gender">Gender</Label>
                <Select
                    value={filters.gender}
                    onValueChange={handleChange('gender')}
                >
                    <SelectTrigger className="w-full" id="gender">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {GENDER_OPTIONS.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                                {gender}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Label htmlFor="created_at">Created At</Label>
                <Select
                    value={filters.created_at}
                    onValueChange={handleChange('created_at')}
                >
                    <SelectTrigger className="w-full" id="created_at">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="last_7_days">Last 7 days</SelectItem>
                        <SelectItem value="last_30_days">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                </Select>
                {filters.created_at === 'custom' && (
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <div className="grid gap-1">
                            <Label htmlFor="created_at_from">From</Label>
                            <input
                                type="date"
                                id="created_at_from"
                                value={filters.created_at_from ?? ''}
                                className="rounded-md border px-2 py-1"
                                onChange={(event) =>
                                    handleChange('created_at_from')(
                                        event.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="created_at_to">To</Label>
                            <input
                                type="date"
                                id="created_at_to"
                                value={filters.created_at_to ?? ''}
                                className="rounded-md border px-2 py-1"
                                onChange={(event) =>
                                    handleChange('created_at_to')(
                                        event.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                )}
                <Label htmlFor="deleted_at">Deleted At</Label>
                <Select
                    value={filters.deleted_at}
                    onValueChange={handleChange('deleted_at')}
                >
                    <SelectTrigger className="w-full" id="deleted_at">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="last_7_days">Last 7 days</SelectItem>
                        <SelectItem value="last_30_days">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                </Select>
                {filters.deleted_at === 'custom' && (
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <div className="grid gap-1">
                            <Label htmlFor="deleted_at_from">From</Label>
                            <input
                                type="date"
                                id="deleted_at_from"
                                value={filters.deleted_at_from ?? ''}
                                className="rounded-md border px-2 py-1"
                                onChange={(event) =>
                                    handleChange('deleted_at_from')(
                                        event.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="deleted_at_to">To</Label>
                            <input
                                type="date"
                                id="deleted_at_to"
                                value={filters.deleted_at_to ?? ''}
                                className="rounded-md border px-2 py-1"
                                onChange={(event) =>
                                    handleChange('deleted_at_to')(
                                        event.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                )}
            </div>

            <Button type="submit" className="mt-4 w-fit">
                Apply
            </Button>
        </form>
    );
}
