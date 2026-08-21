<?php

namespace App\Models;

use Database\Factories\PhysicianFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Physician extends Model
{
    /** @use HasFactory<PhysicianFactory> */
    use HasFactory;
}
