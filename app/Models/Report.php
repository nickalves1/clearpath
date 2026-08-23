<?php

namespace App\Models;

use App\Concerns\BelongsToTenant;
use Database\Factories\ReportFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use BelongsToTenant;

    /** @use HasFactory<ReportFactory> */
    use HasFactory;
}
