/**
 * O que é: uma interface do TypeScript. 
 * Ela não gera código nenhum em JavaScript — existe só em tempo de compilação, 
 * pra te avisar (e avisar o editor) quando você usar um campo errado ou esquecer um obrigatório.
 * 
 * 
 * Por que ela existe aqui: ela é o "espelho" da sua tabela patients no banco. 
 * Assim, quando o service buscar dados da API, o TypeScript sabe exatamente 
 * quais campos existem em um paciente — e te dá autocomplete e erro em tempo 
 * de digitação se você escrever patient.frist_name errado, por exemplo.
 * 
 * 
 * Espelha a tabela `patients` (migration + $fillable do model).
 * Isso é o "contrato" entre o front e o back: se um dia mudar uma coluna
 * no banco, é aqui que ajustamos primeiro.
 */
export interface Patient {
    id: number;
    medical_record_number: string;
    first_name: string;
    last_name: string;
    birth_date: string; // Laravel serializa `date` como string "YYYY-MM-DD"
    gender: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null; // SoftDeletes -> sempre null, exceto se excluído
}

/**
 * Campos que o formulário de criação envia para o POST /api/patients.
 * `Pick` reaproveita os tipos de `Patient` em vez de reescrever tudo:
 * se o tipo de `birth_date` mudar lá em cima, muda aqui também sem esforço.
 */
export type CreatePatientPayload = Pick<
    Patient,
    | 'medical_record_number'
    | 'first_name'
    | 'last_name'
    | 'birth_date'
    | 'gender'
    | 'phone'
    | 'email'
>;

export type PaginatedResponse<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};