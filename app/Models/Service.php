<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Service extends Model

{
    /** @use HasFactory<\Database\Factories\ServiceFactory> */
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'name',
        'description',
        'price',
        'event_category_id',
        'service_type_id', // <--- Tambahkan ini
        'portfolio_images'
    ];

    protected $casts = [
        'portfolio_images' => 'array', // Mengubah JSON di DB menjadi Array PHP secara otomatis
    ];

    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    public function category()
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    public function serviceType()
    {
        // Setiap jasa sekarang punya 1 tipe spesifik (misal: MUA)
        return $this->belongsTo(ServiceType::class, 'service_type_id');
        
    }
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        // Gunakan belongsTo karena satu jasa dimiliki satu user/vendor
        // Parameter kedua adalah foreign key yang ada di tabel services kamu (vendor_id)
        return $this->belongsTo(User::class, 'vendor_id');
    }


    // Tambahkan ini di dalam class
    public function getPortfolioUrlsAttribute()
    {
        if (!$this->portfolio_images) return [];

        return collect($this->portfolio_images)->map(function ($path) {
            return asset('storage/' . $path);
        });
    }

    // Tambahkan ke appends agar muncul saat diconvert ke JSON
    protected $appends = ['portfolio_urls'];
}
