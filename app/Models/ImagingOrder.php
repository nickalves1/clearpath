<?php

namespace App\Models;

use App\Concerns\BelongsToTenant;
use Database\Factories\ImagingOrderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagingOrder extends Model
{
    use BelongsToTenant;

    /** @use HasFactory<ImagingOrderFactory> */
    use HasFactory;
}
