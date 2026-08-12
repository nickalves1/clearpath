import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreatePatientPayload } from '../types/patient';

type Props = {
    // O form não sabe chamar a API diretamente — quem decide "o que fazer
    // com os dados" é quem usa o componente (a página), passando essa função.
    // Isso é chamado de "inversão de controle": o componente só avisa "o usuário
    // enviou isso", não decide o que acontece depois.
    onSubmit: (payload: CreatePatientPayload) => Promise<unknown>;
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

export function PatientForm({ onSubmit }: Props) {
    // "Controlled input": o valor do <input> vive no estado do React (form),
    // não no DOM. Cada tecla digitada atualiza o estado, e o input reflete o estado.
    const [form, setForm] = useState<CreatePatientPayload>(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleChange(field: keyof CreatePatientPayload) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setForm((current) => ({ ...current, [field]: event.target.value }));
        };
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault(); // impede o comportamento padrão do <form> (recarregar a página)
        setSubmitting(true);
        setError(null);

        try {
            await onSubmit(form);
            setForm(emptyForm); // limpa o form após sucesso
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar paciente.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="medical_record_number">Prontuário</Label>
                    <Input
                        id="medical_record_number"
                        value={form.medical_record_number}
                        onChange={handleChange('medical_record_number')}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="first_name">Nome</Label>
                    <Input id="first_name" value={form.first_name} onChange={handleChange('first_name')} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="last_name">Sobrenome</Label>
                    <Input id="last_name" value={form.last_name} onChange={handleChange('last_name')} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="birth_date">Nascimento</Label>
                    <Input
                        id="birth_date"
                        type="date"
                        value={form.birth_date}
                        onChange={handleChange('birth_date')}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="gender">Gênero</Label>
                    <Input id="gender" value={form.gender} onChange={handleChange('gender')} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" value={form.phone} onChange={handleChange('phone')} required />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={handleChange('email')} required />
                </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-fit">
                {submitting ? 'Salvando...' : 'Adicionar paciente'}
            </Button>
        </form>
    );
}
