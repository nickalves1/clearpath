import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
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
    resetFilters: () => void;
};

export default function PatientFiltersForm({
    handleChange,
    filters,
    applyFilters,
    onOpenChange,
    resetFilters,
}: Props) {
    return (
        <form
            onSubmit={(event) => {
                applyFilters(filters);
                event.preventDefault();
                onOpenChange(false);
            }}
            className="grid gap-2"
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
                            <DatePicker
                                id="created_at_from"
                                value={filters.created_at_from}
                                onChange={handleChange('created_at_from')}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="created_at_to">To</Label>
                            <DatePicker
                                id="created_at_to"
                                value={filters.created_at_to}
                                onChange={handleChange('created_at_to')}
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
                            <DatePicker
                                id="deleted_at_from"
                                value={filters.deleted_at_from}
                                onChange={handleChange('deleted_at_from')}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="deleted_at_to">To</Label>
                            <DatePicker
                                id="deleted_at_to"
                                value={filters.deleted_at_to}
                                onChange={handleChange('deleted_at_to')}
                            />
                        </div>
                    </div>
                )}
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={resetFilters}>
                    Reset
                </Button>
                <Button type="submit">Apply</Button>
            </DialogFooter>
        </form>
    );
}
