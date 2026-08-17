/** Public API of the `patients` feature. */
export * from './types/patient';
export * from './hooks/use-patients';
export * from './hooks/use-patient-dialog';
export * from './hooks/use-patient-delete-dialog';
export { PatientsTable } from './components/patients-table';
export { PatientForm } from './components/patient-form';
export { PatientFormDialog } from './components/patient-form-dialog';
export { PatientDeleteDialog } from './components/patient-delete-dialog';
