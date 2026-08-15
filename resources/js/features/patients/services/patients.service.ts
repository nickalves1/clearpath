import PatientsController from '@/actions/App/Http/Controllers/PatientsController';
import type { CreatePatientPayload, Patient, PaginatedResponse } from '../types/patient';
import { ValidationError } from '@/lib/http/errors/validation-error';

/**
 * Wrapper fino em cima do `fetch` nativo.
 * Essa é a ÚNICA função do projeto que sabe o formato cru de uma resposta HTTP
 * (status code, JSON, erro). Hooks e componentes nunca lidam com isso direto.
 * 
 * 
 * O fluxo de uma chamada fetch tem 2 etapas, não 1:
 * await fetch(url) → devolve a resposta HTTP (status, headers...), mas ainda não o conteúdo.
 * await response.json() → aí sim converte o corpo da resposta de JSON (texto) pra objeto/array JavaScript.
 * 
 * 
 */
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
        // Envia o cookie de sessão do Laravel (autenticação via Inertia/Fortify).
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        // Se o Laravel devolveu erros de validação (422) ou outro erro, tenta ler a mensagem.
        const body = await response.json().catch(() => null);

        if (response.status ===422 && body?.message) {
            throw new ValidationError(body.message, body.errors);
        }

        throw new Error(body?.message ?? `Falha na requisição (status ${response.status})`);
    }

    if (response.status === 204) {
        // 204 No Content (comum em destroy) não tem corpo para converter em JSON.
        return undefined as T;
    }

    return response.json();
}

/**
 * Busca a lista de pacientes.
 *
 * ATENÇÃO: aqui eu assumi que `PatientsController::index` devolve um array puro
 * de pacientes (`response()->json($patients)`), sem paginação/Resource.
 * Se o seu controller usa `->paginate()` ou um API Resource, o JSON real vem
 * como `{ data: [...], links: {...}, meta: {...} }` e essa função vai
 * precisar extrair `body.data` em vez do array direto. Testa e me fala o que veio.
 */
export function getPatients(page: number): Promise<PaginatedResponse<Patient>> {
    const { url, method } = PatientsController.index({ query: { page }});
    return request<PaginatedResponse<Patient>>(url, { method });
}

export function createPatient(payload: CreatePatientPayload): Promise<Patient> {
    const { url, method } = PatientsController.store();
    return request<Patient>(url, {
        method,
        body: JSON.stringify(payload),
    });
}

export function updatePatient(id: number, payload: CreatePatientPayload): Promise<Patient> {
    const { url, method } = PatientsController.update(id);
    return request<Patient>(url, {
        method,
        body: JSON.stringify(payload),
    });
}
