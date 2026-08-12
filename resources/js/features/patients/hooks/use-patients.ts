import { useCallback, useEffect, useState } from 'react';
import { createPatient, getPatients } from '../services/patients.service';
import type { CreatePatientPayload, Patient } from '../types/patient';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useCallback memoriza a função entre re-renders, para não recriar uma
    // função nova a cada render (importante porque ela é dependência do useEffect abaixo).
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getPatients();
            setPatients(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar pacientes.');
        } finally {
            setLoading(false);
        }
    }, []);

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
        setPatients((current) => [...current, newPatient]);
        return newPatient;
    }, []);

    // O componente que usar esse hook só enxerga essa "API" pública, nunca
    // sabe que por trás tem fetch, JSON.parse, etc.
    return { patients, loading, error, refetch: fetchPatients, addPatient };
}
