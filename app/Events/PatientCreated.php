<?php

namespace App\Events;

use App\Models\Patient;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PatientCreated
{
    use Dispatchable;
    use SerializesModels;

    public function __construct(
        public readonly Patient $patient,
        public readonly ?int $causedByUserId = null,
        public readonly ?string $causedByIp = null,
    ) {}
}
