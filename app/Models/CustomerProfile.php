<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerProfile extends Model
{
    protected $fillable = ['user_id', 'address', 'phone_number', 'birth_date', 'profile_picture'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}