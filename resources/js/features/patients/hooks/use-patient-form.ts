import { useState, type FormEvent, type ChangeEvent } from 'react';
import type { CreatePatientPayload, Patient } from '../types/patient';
import { ValidationError } from '@/lib/http/errors/validation-error';

type Props = {
    onSubmit: (payload: CreatePatientPayload) => Promise<unknown>;
    initialValues?: Patient;
};

const emptyForm: CreatePatientPayload = {
    medical_record_number: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    phone: '',
    email: '',
};

/**
 * Manages the create/edit patient form's state, field-level validation
 * errors, and submission.
 */
export function usePatientForm({ initialValues, onSubmit }: Props) {
    const [form, setForm] = useState<CreatePatientPayload>(initialValues ?? emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    /**
     * Updates a single field's value and clears its validation error, if any.
     */
    function setField(field: keyof CreatePatientPayload, value: string) {
        setForm((current) => ({ ...current, [field]: value }));
        setFieldErrors((current) => {
            const { [field]: _, ...rest } = current;
            return rest;
        });
    }

    /**
     * Returns an onChange handler bound to the given field, for plain text inputs.
     */
    function handleChange(field: keyof CreatePatientPayload) {
        return (event: ChangeEvent<HTMLInputElement>) => setField(field, event.target.value);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await onSubmit(form);

            if (!initialValues) {
                setForm(emptyForm);
            }
        } catch (err) {
            if (err instanceof ValidationError) {
                setFieldErrors(err.errors);
            } else {
                setError(err instanceof Error ? err.message : 'Failed to save patient.');
            }
        } finally {
            setSubmitting(false);
        }
    }

    return { form, submitting, error, fieldErrors, handleChange, handleSubmit, setField };
}
