<?php

namespace Tests\Unit\Listeners;

use App\Events\PatientCreated;
use App\Events\PatientDeleted;
use App\Events\PatientUpdated;
use App\Listeners\LogFailedLogin;
use App\Listeners\LogPatientCreated;
use App\Listeners\LogPatientDeleted;
use App\Listeners\LogPatientUpdated;
use App\Models\Patient;
use Illuminate\Auth\Events\Failed;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class PatientAuditLoggingTest extends TestCase
{
    public function test_log_patient_created_logs_the_patient_user_and_ip(): void
    {
        $patient = Patient::factory()->make(['id' => 42, 'tenant_id' => 1]);
        Log::shouldReceive('info')->once()->with('Patient created', [
            'patient_id' => 42,
            'caused_by_user_id' => 7,
            'ip' => '127.0.0.1',
        ]);

        (new LogPatientCreated)->handle(new PatientCreated($patient, causedByUserId: 7, causedByIp: '127.0.0.1'));
    }

    public function test_log_patient_updated_logs_the_patient_user_ip_and_changed_fields(): void
    {
        $patient = Patient::factory()->make(['id' => 42, 'tenant_id' => 1]);
        Log::shouldReceive('info')->once()->with('Patient updated', [
            'patient_id' => 42,
            'caused_by_user_id' => 7,
            'ip' => '127.0.0.1',
            'changed_fields' => ['phone', 'email'],
        ]);

        (new LogPatientUpdated)->handle(new PatientUpdated(
            $patient,
            causedByUserId: 7,
            causedByIp: '127.0.0.1',
            changedFields: ['phone', 'email'],
        ));
    }

    public function test_log_patient_deleted_logs_the_patient_user_and_ip(): void
    {
        $patient = Patient::factory()->make(['id' => 42, 'tenant_id' => 1]);
        Log::shouldReceive('info')->once()->with('Patient deleted', [
            'patient_id' => 42,
            'caused_by_user_id' => 7,
            'ip' => '127.0.0.1',
        ]);

        (new LogPatientDeleted)->handle(new PatientDeleted($patient, causedByUserId: 7, causedByIp: '127.0.0.1'));
    }

    public function test_log_failed_login_logs_the_guard_and_ip_without_credentials(): void
    {
        Log::shouldReceive('warning')->once()->with('Failed login attempt', [
            'guard' => 'web',
            'ip' => '127.0.0.1',
        ]);

        (new LogFailedLogin)->handle(new Failed('web', null, ['email' => 'a@a.com', 'password' => 'secret']));
    }

    public function test_log_failed_login_does_not_propagate_a_logging_backend_failure(): void
    {
        Log::shouldReceive('warning')->once()->andThrow(new \RuntimeException('Elasticsearch unreachable'));

        (new LogFailedLogin)->handle(new Failed('web', null, ['email' => 'a@a.com', 'password' => 'secret']));

        $this->assertTrue(true);
    }
}
