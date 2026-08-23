<?php

namespace App\Listeners;

use App\Events\PatientCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class LogPatientCreated implements ShouldQueue
{
    public function handle(PatientCreated $event): void
    {
        Log::info('Patient created', [
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
    public function messageGroup(PatientCreated $event): string
    {
        return "patient-{$event->patient->id}";
    }
}
