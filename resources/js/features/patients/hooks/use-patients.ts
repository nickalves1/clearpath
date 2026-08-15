import { useCallback, useEffect, useState } from 'react';
import { createPatient, getPatients, updatePatient } from '../services/patients.service';
import type { CreatePatientPayload, Patient, PaginatedResponse } from '../types/patient';
import { toast } from 'sonner';

/**
 * Custom hook = função que começa com "use" e pode chamar outros hooks
 * (useState, useEffect...) dentro dela. É a forma do React de empacotar
 * "estado + lógica" reutilizável, fora de um componente visual.
 *
 * Aqui ele guarda 3 estados clássicos de toda tela que busca dado assíncrono:
 * - patients: os dados em si
 * - loading: está buscando agora?
 * - error: deu erro? qual mensagem mostrar?
 */
export function usePatients() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [meta, setMeta] = useState<PaginatedResponse<Patient> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);

    // useCallback memoriza a função entre re-renders, para não recriar uma
    // função nova a cada render (importante porque ela é dependência do useEffect abaixo).
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getPatients(page);
            setPatients(response.data);
            setMeta(response);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro ao carregar pacientes.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [page]);

    // useEffect com array de dependências [fetchPatients] roda a função
    // logo depois do componente montar na tela (e de novo só se fetchPatients mudar,
    // o que não vai acontecer aqui pois ela é memorizada acima).
    // Isso é o equivalente a "quando a página carregar, busca os dados".
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    // Cria um paciente e já atualiza a lista local, sem precisar recarregar tudo.
    const addPatient = useCallback(async (payload: CreatePatientPayload) => {
        const newPatient = await createPatient(payload);
        await fetchPatients();
        return newPatient;
    }, [fetchPatients]);

    const editPatient = useCallback(async (id: number, payload: CreatePatientPayload) => {
        const currentPatient = await updatePatient(id, payload);
        setPatients((current) => 
            current.map((patient) => (patient.id === currentPatient.id ? currentPatient : patient))
        );
        return currentPatient;
    }, []);

    const goToPage = useCallback((page: number) => {
        setPage(page);
    },[]);

    // O componente que usar esse hook só enxerga essa "API" pública, nunca
    // sabe que por trás tem fetch, JSON.parse, etc.
    return { data: {patients, loading, error, meta, page}, refetch: fetchPatients, addPatient, editPatient, goToPage };
}
