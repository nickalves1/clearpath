import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Props = {
    onChange: (value: string) => void;
    error: string[];
    genderValue: string;
};

/**
 * Gender field for the patient form. The options must stay in sync with the
 * `gender` validation rules on StorePatientRequest/UpdatePatientRequest.
 */
export function GenderSelect({ onChange, error, genderValue }: Props) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={genderValue} onValueChange={onChange}>
                <SelectTrigger id="gender" aria-invalid={!!error}>
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
            </Select>
            {error && <p className="text-sm text-destructive">{error[0]}</p>}
        </div>
    );
}