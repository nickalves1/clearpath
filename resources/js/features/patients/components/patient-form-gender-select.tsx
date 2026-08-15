import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Props = {
    onChange: (value: string) => void;
    error: string[];
    genderValue: string;
};

export function GenderSelect({onChange, error, genderValue} : Props){
    return (
        <div className="grid gap-2">
        <Label htmlFor="gender">Gênero</Label>
        <Select value={genderValue} onValueChange={onChange}>
            <SelectTrigger id="gender" aria-invalid={!!error}>
                <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Feminino">Feminino</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
                <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
            </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error[0]}</p>}
    </div>
    )
}