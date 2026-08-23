<?php

namespace App\Models;

use App\Concerns\BelongsToTenant;
use Database\Factories\StudyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Study extends Model
{
    use BelongsToTenant;

    /** @use HasFactory<StudyFactory> */
    use HasFactory;
}
