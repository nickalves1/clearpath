<?php

namespace App\Listeners;

use App\Events\PatientDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class LogPatientDeleted implements ShouldQueue
{
    public function handle(PatientDeleted $event): void
    {
        Log::info('Patient deleted', [
            'patient_id' => $event->patient->id,
            'caused_by_user_id' => $event->causedByUserId,
            'ip' => $event->causedByIp,
        ]);
    }

    /**
     * Groups this patient's audit events together so they process in
     * order, while different patients' events can process in parallel
     * (relevant only for FIFO queue connections, e.g. SQS).
     */
    public function messageGroup(PatientDeleted $event): string
    {
        return "patient-{$event->patient->id}";
    }
}
