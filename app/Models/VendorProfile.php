<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorProfile extends Model
{
    // Sesuai dengan kolom di ERD kamu
    protected $fillable = [
        'user_id', 
        'business_name', 
        'address', 
        'bank_account', 
        'is_verified'
    ];

    /**
     * Relasi balik ke User (Satu profil dimiliki oleh satu user)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}