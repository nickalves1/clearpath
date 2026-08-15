import { type ChangeEvent } from 'react';
import type { CreatePatientPayload } from '../types/patient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormFieldProps = {
    id: keyof CreatePatientPayload;
    label: string;
    type?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string[];
};

export function FormField({ id, label, type = 'text', value, onChange, error }: FormFieldProps) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} value={value} onChange={onChange} aria-invalid={!!error} required />
            {error && <p className="text-sm text-destructive">{error[0]}</p>}
        </div>
    );
}