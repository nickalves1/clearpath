import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { GENDER_OPTIONS } from '../types/patient';

type Props = {
    onChange: (value: string) => void;
    error: string[];
    genderValue: string;
};

/**
 * Gender field for the patient form.
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
                    {GENDER_OPTIONS.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                            {gender}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-sm text-destructive">{error[0]}</p>}
        </div>
    );
}
