<?php

namespace Tests\Feature\Auth;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Fortify\Features;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::registration());
    }

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get(route('register'));

        $response->assertOk();
    }

    public function test_new_users_can_register()
    {
        $response = $this->post(route('register.store'), [
            'company_name' => 'City Hospital',
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'StrongPass123!',
            'password_confirmation' => 'StrongPass123!',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));

        $tenant = Tenant::query()->where('name', 'City Hospital')->firstOrFail();
        $this->assertSame('city-hospital', $tenant->slug);

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();
        $this->assertSame($tenant->id, $user->tenant_id);
        $this->assertTrue($user->hasRole('admin'));
    }

    public function test_registration_requires_a_company_name()
    {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'StrongPass123!',
            'password_confirmation' => 'StrongPass123!',
        ]);

        $response->assertSessionHasErrors('company_name');
        $this->assertGuest();
    }

    public function test_registration_fails_with_a_weak_password()
    {
        $response = $this->post(route('register.store'), [
            'company_name' => 'City Hospital',
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors('password');
        $this->assertGuest();
        $this->assertDatabaseMissing('tenants', ['name' => 'City Hospital']);
    }
}
