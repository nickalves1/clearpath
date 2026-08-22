<?php

namespace Tests\Unit;

use App\Models\Patient;
use App\Repositories\Contracts\PatientsRepositoryInterface;
use App\Services\PatientsService;
use Illuminate\Pagination\LengthAwarePaginator;
use Mockery\MockInterface;
use Tests\TestCase;

class PatientsServiceTest extends TestCase
{
    public function test_store_delegates_to_the_repository(): void
    {
        $patient = Patient::factory()->make();
        $data = ['first_name' => 'Nicolas'];

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($data, $patient) {
            $mock->shouldReceive('create')->once()->with($data)->andReturn($patient);
        });

        $result = (new PatientsService($repository))->store($data);

        $this->assertSame($patient, $result);
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

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($patient, $data) {
            $mock->shouldReceive('update')->once()->with($patient, $data)->andReturn($patient);
        });

        $result = (new PatientsService($repository))->update($patient, $data);

        $this->assertSame($patient, $result);
    }

    public function test_soft_delete_delegates_to_the_repository(): void
    {
        $patient = Patient::factory()->make();

        $repository = $this->mock(PatientsRepositoryInterface::class, function (MockInterface $mock) use ($patient) {
            $mock->shouldReceive('delete')->once()->with($patient);
        });

        (new PatientsService($repository))->softDelete($patient);
    }
}
