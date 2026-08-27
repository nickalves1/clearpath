import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
    id?: string;
    value: string | null | undefined;
    onChange: (value: string) => void;
    placeholder?: string;
};

/**
 * A single-date picker backed by a plain `yyyy-MM-dd` string, the same
 * format the native `<input type="date">` it replaces used to produce.
 */
export function DatePicker({
    id,
    value,
    onChange,
    placeholder = 'Pick a date',
}: Props) {
    const [open, setOpen] = useState(false);
    const date = value ? new Date(`${value}T00:00:00`) : undefined;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    type="button"
                    variant="outline"
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    startMonth={new Date(1900, 0)}
                    endMonth={new Date()}
                    selected={date}
                    onSelect={(selected) => {
                        if (!selected) {
                            return;
                        }

                        onChange(format(selected, 'yyyy-MM-dd'));
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
