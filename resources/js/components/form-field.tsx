import type { ComponentProps } from 'react';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type Props = {
    id: string;
    label: string;
    error?: string | string[];
} & ComponentProps<typeof Input>;

/**
 * Labeled text input with an optional validation error message. Shared
 * across features — accepts either a controlled `value`/`onChange` pair or
 * an uncontrolled `name` (read via FormData on submit), since both patterns
 * are used across the app.
 */
export function FormField({
    id,
    label,
    error,
    required = true,
    ...inputProps
}: Props) {
    const message = Array.isArray(error) ? error[0] : error;

    return (
        <Field data-invalid={!!message}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input
                id={id}
                required={required}
                aria-invalid={!!message}
                {...inputProps}
            />
            <FieldError>{message}</FieldError>
        </Field>
    );
}
