<?php

namespace App\Models;

use App\Concerns\BelongsToTenant;
use Database\Factories\PhysicianFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Physician extends Model
{
    use BelongsToTenant;

    /** @use HasFactory<PhysicianFactory> */
    use HasFactory;
}
