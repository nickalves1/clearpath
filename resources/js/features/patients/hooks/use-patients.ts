import { useCallback, useEffect, useState } from 'react';
import { createPatient, getPatients, updatePatient, destroyPatient } from '../services/patients.service';
import type { CreatePatientPayload, Patient, PaginatedResponse } from '../types/patient';
import { toast } from 'sonner';

export function usePatients() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [meta, setMeta] = useState<PaginatedResponse<Patient> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [column, setColumn] = useState<string>("");
    const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

    const fetchPatients = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const sort = direction === 'desc' ? `-${column}` : column;
            const response = await getPatients(page, sort);
            setPatients(response.data);
            setMeta(response);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro ao carregar pacientes.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [page, column, direction]);

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

    const deletePatient = useCallback(async (patient: Patient) => {
        await destroyPatient(patient);
        await fetchPatients();
        setPatients((current) => current.filter((p) => p.id !== patient.id));
    }, [fetchPatients]);

    const goToPage = useCallback((page: number) => {
        setPage(page);
    },[]);

    const orderByColumn = useCallback((newColumn: string) => {
        if (newColumn === column) {
            setDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
        } else {
            setColumn(newColumn);
            setDirection('asc');
        }
    }, [column]);

    return { data: {patients, loading, error, meta, page, column, direction}, refetch: fetchPatients, addPatient, editPatient, goToPage, deletePatient, orderByColumn };
}
