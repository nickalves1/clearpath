/**
 * "Barrel export": centraliza tudo que a feature expõe pra fora, num só lugar.
 * Quem importa de '@/features/patients' não precisa saber a estrutura interna
 * de pastas (types/, hooks/, components/) — só o que está exportado aqui.
 */
export * from './types/patient';
export * from './hooks/use-patients';
export * from './hooks/use-patient-dialog';
export { PatientsTable } from './components/patients-table';
export { PatientForm } from './components/patient-form';
export { PatientFormDialog } from './components/patient-form-dialog';
