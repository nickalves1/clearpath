import { DatePicker } from '@/components/date-picker';
import { FormField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { usePatientForm } from '../hooks/use-patient-form';
import type { CreatePatientPayload, Patient } from '../types/patient';
import { GenderSelect } from './patient-form-gender-select';

type Props = {
    onSubmit: (payload: CreatePatientPayload) => Promise<unknown>;
    onCancel: () => void;
    initialValues?: Patient;
};

/**
 * Create/edit patient form. Renders in "create" mode when `initialValues` is
 * omitted, or "edit" mode (pre-filled, different submit label) otherwise.
 */
export function PatientForm({ onSubmit, onCancel, initialValues }: Props) {
    const {
        form,
        submitting,
        error,
        fieldErrors,
        handleChange,
        handleSubmit,
        setField,
    } = usePatientForm({
        initialValues,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
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
                <Field data-invalid={!!fieldErrors.birth_date}>
                    <FieldLabel htmlFor="birth_date">Birth Date</FieldLabel>
                    <DatePicker
                        id="birth_date"
                        value={form.birth_date}
                        onChange={(value) => setField('birth_date', value)}
                    />
                    <FieldError>{fieldErrors.birth_date?.[0]}</FieldError>
                </Field>
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

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                    {initialValues
                        ? 'Save'
                        : submitting
                          ? 'Saving...'
                          : 'Add Patient'}
                </Button>
            </DialogFooter>
        </form>
    );
}
