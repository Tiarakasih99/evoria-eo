<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ServiceType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    // Relasi ke Kategori Event (Kebalikan dari EventCategory)
    public function eventCategories()
    {
        return $this->belongsToMany(EventCategory::class, 'category_service_type', 'service_type_id', 'event_category_id');
    }

    // Relasi ke Jasa (Satu tipe bisa dipakai banyak jasa)
    public function services()
    {
        return $this->hasMany(Service::class, 'service_type_id');
    }
}