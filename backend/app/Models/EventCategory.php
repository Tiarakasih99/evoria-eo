<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventCategory extends Model
{
    /** @use HasFactory<\Database\Factories\EventCategoryFactory> */
    use HasFactory;
    // public function services()
    // {
    //     return $this->hasMany(Service::class);
    // }
    public function serviceTypes()
    {
        // Menghubungkan Kategori Event ke daftar jenis layanan yang tersedia
        return $this->belongsToMany(ServiceType::class, 'category_service_type', 'event_category_id', 'service_type_id');
    }

    public function services()
    {
        // Relasi yang sudah ada ke tabel jasa
        return $this->hasMany(Service::class, 'event_category_id');
    }

}


