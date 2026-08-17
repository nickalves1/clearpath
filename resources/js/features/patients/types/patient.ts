/**
 * Mirrors the `patients` table (migration + $fillable on the Patient model).
 * This is the contract between the front and back ends.
 */
export interface Patient {
    id: number;
    medical_record_number: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    gender: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

/** Fields the create/edit form sends to the API. */
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

/** Shape of a Laravel `LengthAwarePaginator` serialized to JSON. */
export type PaginatedResponse<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};
