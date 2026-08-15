import { Button } from '@/components/ui/button';
import type { CreatePatientPayload, Patient } from '../types/patient';
import { usePatientForm } from '../hooks/use-patient-form';
import { FormField } from './patient-form-field';

type Props = {
    onSubmit: (payload: CreatePatientPayload) => Promise<unknown>;
    initialValues?: Patient;
};

export function PatientForm({ onSubmit, initialValues }: Props) {

    const { form, submitting, error, fieldErrors, handleChange, handleSubmit } = usePatientForm({ initialValues,onSubmit });

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField 
                    id="medical_record_number" 
                    label="Prontuário" 
                    value={form.medical_record_number} 
                    onChange={handleChange('medical_record_number')} 
                    error={fieldErrors.medical_record_number} 
                />
                <FormField 
                    id="first_name" 
                    label="Nome" 
                    value={form.first_name} 
                    onChange={handleChange('first_name')} 
                    error={fieldErrors.first_name} 
                />
                <FormField 
                    id="last_name" 
                    label="Sobrenome" 
                    value={form.last_name} 
                    onChange={handleChange('last_name')} 
                    error={fieldErrors.last_name} 
                />
                <FormField 
                    id="birth_date" 
                    label="Nascimento" 
                    value={form.birth_date} 
                    onChange={handleChange('birth_date')} 
                    error={fieldErrors.birth_date} 
                />
                <FormField 
                    id="gender" 
                    label="Gênero" 
                    value={form.gender} 
                    onChange={handleChange('gender')} 
                    error={fieldErrors.gender} 
                />
                <FormField 
                    id="phone" 
                    label="Telefone" 
                    value={form.phone} 
                    onChange={handleChange('phone')} 
                    error={fieldErrors.phone} 
                />
                <FormField 
                    id="email" 
                    label="Email" 
                    value={form.email} 
                    onChange={handleChange('email')} 
                    error={fieldErrors.email} 
                />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-fit">
                {initialValues ? 'Salvar' : submitting ? 'Salvando...' : 'Adicionar paciente'}
            </Button>
        </form>
    );
}
