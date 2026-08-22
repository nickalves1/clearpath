import { renderHook, act, waitFor } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import * as patientsService from '../services/patients.service';
import type {
    PaginatedResponse,
    Patient,
    FiltersPatients,
} from '../types/patient';
import { usePatients } from './use-patients';

vi.mock('../services/patients.service');

function makeResponse(patients: Patient[] = []): PaginatedResponse<Patient> {
    return {
        data: patients,
        links: { first: null, last: null, prev: null, next: null },
        meta: {
            current_page: 1,
            from: 1,
            last_page: 1,
            per_page: 10,
            to: patients.length,
            total: patients.length,
        },
    };
}

const allFilters: FiltersPatients = {
    is_active: 'all',
    gender: 'all',
    created_at: 'all',
    created_at_from: null,
    created_at_to: null,
    deleted_at: 'all',
    deleted_at_from: null,
    deleted_at_to: null,
};

describe('usePatients', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(patientsService.getPatients).mockResolvedValue(
            makeResponse(),
        );
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('fetches patients on mount', async () => {
        renderHook(() => usePatients());

        await waitFor(() => {
            expect(patientsService.getPatients).toHaveBeenCalledTimes(1);
        });
    });

    it('does not fetch a second time on mount once the debounce delay passes', async () => {
        vi.useFakeTimers();
        renderHook(() => usePatients());

        await act(async () => {
            await vi.advanceTimersByTimeAsync(300);
        });

        expect(patientsService.getPatients).toHaveBeenCalledTimes(1);
    });

    it('debounces the search, firing only one extra request after typing stops', async () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => usePatients());

        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        expect(patientsService.getPatients).toHaveBeenCalledTimes(1);

        act(() => {
            result.current.handleChangeSearch({
                target: { value: 'n' },
            } as unknown as ChangeEvent<HTMLInputElement>);
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(100);
        });
        act(() => {
            result.current.handleChangeSearch({
                target: { value: 'ni' },
            } as unknown as ChangeEvent<HTMLInputElement>);
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(100);
        });
        act(() => {
            result.current.handleChangeSearch({
                target: { value: 'nic' },
            } as unknown as ChangeEvent<HTMLInputElement>);
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(300);
        });

        expect(patientsService.getPatients).toHaveBeenCalledTimes(2);
    });

    it('resets to page 1 when filters are applied', async () => {
        const { result } = renderHook(() => usePatients());
        await waitFor(() =>
            expect(patientsService.getPatients).toHaveBeenCalledTimes(1),
        );

        act(() => {
            result.current.goToPage(3);
        });
        await waitFor(() => expect(result.current.data.page).toBe(3));

        act(() => {
            result.current.applyFilters(allFilters);
        });

        await waitFor(() => expect(result.current.data.page).toBe(1));
    });
});
