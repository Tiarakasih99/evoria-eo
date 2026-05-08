<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password','role','phone','status'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function services()
    {
        return $this->hasMany(Service::class, 'vendor_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'customer_id');
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class, 'vendor_id');
    }

    // Relasi ke profil customer
    public function customerProfile()
    {
        return $this->hasOne(CustomerProfile::class);
    }

    // Relasi ke daftar favorit (wishlist)
    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

        public function vendorProfile()
    {
        return $this->hasOne(VendorProfile::class);
    }
}
