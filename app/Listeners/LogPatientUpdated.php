<?php

namespace App\Listeners;

use App\Events\PatientUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class LogPatientUpdated implements ShouldQueue
{
    public function handle(PatientUpdated $event): void
    {
        Log::info('Patient updated', [
            'patient_id' => $event->patient->id,
            'caused_by_user_id' => $event->causedByUserId,
            'ip' => $event->causedByIp,
            'changed_fields' => $event->changedFields,
        ]);
    }

    /**
     * Groups this patient's audit events together so they process in
     * order, while different patients' events can process in parallel
     * (relevant only for FIFO queue connections, e.g. SQS).
     */
    public function messageGroup(PatientUpdated $event): string
    {
        return "patient-{$event->patient->id}";
    }
}
