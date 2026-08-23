<?php

namespace Tests\Unit;

use App\Events\PatientCreated;
use App\Events\PatientDeleted;
use App\Events\PatientUpdated;
use App\Models\Patient;
use App\Repositories\Contracts\PatientsRepositoryInterface;
use App\Services\PatientsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Event;
use Mockery\MockInterface;
use Tests\TestCase;

class PatientsServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_delegates_to_the_repository(): void
    {
        $patient = Patient::factory()->make();
        $data = ['first_name' => 'Nicolas'];
        Event::fake();

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($data, $patient) {
            $mock->shouldReceive('create')->once()->with($data)->andReturn($patient);
        });

        $result = (new PatientsService($repository))->store($data);

        $this->assertSame($patient, $result);
    }

    public function test_store_dispatches_patient_created(): void
    {
        $patient = Patient::factory()->make();
        Event::fake();

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($patient) {
            $mock->shouldReceive('create')->andReturn($patient);
        });

        (new PatientsService($repository))->store([]);

        Event::assertDispatched(
            PatientCreated::class,
            fn (PatientCreated $event) => $event->patient === $patient
                && $event->causedByIp === '127.0.0.1',
        );
    }

    public function test_index_delegates_to_the_repository(): void
    {
        $paginator = $this->createMock(LengthAwarePaginator::class);
        $data = ['search' => 'nicolas'];

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($data, $paginator) {
            $mock->shouldReceive('paginate')->once()->with($data)->andReturn($paginator);
        });

        $result = (new PatientsService($repository))->index($data);

        $this->assertSame($paginator, $result);
    }

    public function test_update_delegates_to_the_repository(): void
    {
        $patient = Patient::factory()->make();
        $data = ['first_name' => 'Updated'];
        Event::fake();

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($patient, $data) {
            $mock->shouldReceive('update')->once()->with($patient, $data)->andReturn($patient);
        });

        $result = (new PatientsService($repository))->update($patient, $data);

        $this->assertSame($patient, $result);
    }

    public function test_update_dispatches_patient_updated(): void
    {
        $patient = Patient::factory()->make();
        Event::fake();

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($patient) {
            $mock->shouldReceive('update')->andReturn($patient);
        });

        (new PatientsService($repository))->update($patient, []);

        Event::assertDispatched(
            PatientUpdated::class,
            fn (PatientUpdated $event) => $event->patient === $patient
                && $event->causedByIp === '127.0.0.1',
        );
    }

    public function test_update_dispatches_patient_updated_with_the_changed_field_names_only(): void
    {
        $patient = Patient::factory()->create(['phone' => '111', 'email' => 'old@example.com']);
        $data = ['phone' => '222', 'email' => 'new@example.com'];
        Event::fake();

        // A real, persisted update so getChanges() reflects an actual diff.
        $patient->update($data);

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($patient, $data) {
            $mock->shouldReceive('update')->with($patient, $data)->andReturn($patient);
        });

        (new PatientsService($repository))->update($patient, $data);

        Event::assertDispatched(PatientUpdated::class, function (PatientUpdated $event) {
            $fields = $event->changedFields;
            sort($fields);

            return $fields === ['email', 'phone'];
        });
    }

    public function test_soft_delete_delegates_to_the_repository(): void
    {
        $patient = Patient::factory()->make();
        Event::fake();

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($patient) {
            $mock->shouldReceive('delete')->once()->with($patient);
        });

        (new PatientsService($repository))->softDelete($patient);
    }

    public function test_soft_delete_dispatches_patient_deleted(): void
    {
        $patient = Patient::factory()->make();
        Event::fake();

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) {
            $mock->shouldReceive('delete');
        });

        (new PatientsService($repository))->softDelete($patient);

        Event::assertDispatched(
            PatientDeleted::class,
            fn (PatientDeleted $event) => $event->patient === $patient
                && $event->causedByIp === '127.0.0.1',
        );
    }
}
