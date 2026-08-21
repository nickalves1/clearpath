<?php

namespace App\Models;

use Database\Factories\StudyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Study extends Model
{
    /** @use HasFactory<StudyFactory> */
    use HasFactory;
}
