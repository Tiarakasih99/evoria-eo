<?php

namespace App\Services;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService {
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo) {
        $this->userRepo = $userRepo;
    }

    // Register khusus Customer
    public function registerCustomer(array $data) {
        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'customer'; // Paksa role jadi customer
        
        $user = $this->userRepo->create($data);
        
        return [
            'user'  => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ];
    }

    // Register khusus Vendor
    public function registerVendor(array $data) {
        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'vendor'; // Paksa role jadi vendor
        
        $user = $this->userRepo->create($data);

        // Jika nanti ada tabel 'vendors' untuk simpan nama toko/alamat:
        // $this->vendorRepo->create(['user_id' => $user->id, 'store_name' => $data['store_name']]);

        return [
            'user'  => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ];
    }

    public function login(array $credentials, string $requiredRole) {
        // PERBAIKAN: Gunakan $this->userRepo sesuai variabel di constructor
        $user = $this->userRepo->findByEmail($credentials['email']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Kredensial yang diberikan salah.'],
            ]);
        }

        if ($user->role !== $requiredRole) {
            throw ValidationException::withMessages([
                'role' => ["Akun ini tidak terdaftar sebagai $requiredRole."],
            ]);
        }

        return [
            'user'  => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ];
    }
}

// namespace App\Services;

// use App\Models\User;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Auth;

// class AuthService
// {
//     public function loginOrRegisterGoogle($googleUser)
//     {
//         // 1. Cari user atau buat baru jika belum ada
//         $user = User::updateOrCreate(
//             ['email' => $googleUser->email],
//             [
//                 'name' => $googleUser->name,
//                 'google_id' => $googleUser->id,
//                 'role' => 'customer', // Default awal adalah customer
//             ]
//         );

//         // 2. Buat token Sanctum untuk user ini
//         $token = $user->createToken('auth_token')->plainTextToken;

//         return [
//             'user' => $user,
//             'access_token' => $token,
//             'token_type' => 'Bearer',
//         ];
//     }
// }