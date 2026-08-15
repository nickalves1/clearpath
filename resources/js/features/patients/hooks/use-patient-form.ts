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

export function usePatientForm ({ initialValues, onSubmit }: Props){
    const [form, setForm] = useState<CreatePatientPayload>(initialValues ?? emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});


    function handleChange(field: keyof CreatePatientPayload) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setForm((current) => ({ ...current, [field]: event.target.value }));
            setFieldErrors((current) => {
                const { [field]: _, ...rest } = current;
                return rest;
            });
        };
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault(); // impede o comportamento padrão do <form> (recarregar a página)
        setSubmitting(true);
        setError(null);

        try {
            await onSubmit(form);
            
            if (!initialValues) { // limpa o form após sucesso
                setForm(emptyForm);
            }
        } catch (err) {
            if (err instanceof ValidationError) {
                setFieldErrors(err.errors);
            } else {
                setError(err instanceof Error ? err.message : 'Erro ao salvar paciente.');
            }
        } finally {
            setSubmitting(false);
        }
    }

    return {form, submitting, error, fieldErrors, handleChange, handleSubmit}
}