import { Button } from '@/components/ui/button';
import type { CreatePatientPayload, Patient } from '../types/patient';
import { usePatientForm } from '../hooks/use-patient-form';
import { FormField } from './patient-form-field';
import { GenderSelect } from './patient-form-gender-select';

type Props = {
    onSubmit: (payload: CreatePatientPayload) => Promise<unknown>;
    initialValues?: Patient;
};

/**
 * Create/edit patient form. Renders in "create" mode when `initialValues` is
 * omitted, or "edit" mode (pre-filled, different submit label) otherwise.
 */
export function PatientForm({ onSubmit, initialValues }: Props) {
    const { form, submitting, error, fieldErrors, handleChange, handleSubmit, setField } = usePatientForm({
        initialValues,
        onSubmit,
    });

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="medical_record_number"
                    label="Medical Record Number"
                    value={form.medical_record_number}
                    onChange={handleChange('medical_record_number')}
                    error={fieldErrors.medical_record_number}
                />
                <FormField
                    id="first_name"
                    label="First Name"
                    value={form.first_name}
                    onChange={handleChange('first_name')}
                    error={fieldErrors.first_name}
                />
                <FormField
                    id="last_name"
                    label="Last Name"
                    value={form.last_name}
                    onChange={handleChange('last_name')}
                    error={fieldErrors.last_name}
                />
                <FormField
                    id="birth_date"
                    label="Birth Date"
                    type="date"
                    value={form.birth_date}
                    onChange={handleChange('birth_date')}
                    error={fieldErrors.birth_date}
                />
                <FormField
                    id="phone"
                    label="Phone"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    error={fieldErrors.phone}
                />
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    error={fieldErrors.email}
                />
                <GenderSelect
                    genderValue={form.gender}
                    onChange={(value) => setField('gender', value ?? '')}
                    error={fieldErrors.gender}
                />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-fit mt-4">
                {initialValues ? 'Save' : submitting ? 'Saving...' : 'Add Patient'}
            </Button>
        </form>
    );
}
