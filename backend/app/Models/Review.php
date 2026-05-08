<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['user_id', 'service_id', 'order_id', 'rating', 'comment', 'review_image'];

    // Relasi ke User yang memberi rating
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Layanan yang di-rate
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}