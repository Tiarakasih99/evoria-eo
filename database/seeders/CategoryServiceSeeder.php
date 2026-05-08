<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventCategory;
use App\Models\ServiceType;
use Illuminate\Support\Str;

class CategoryServiceSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Kategori Event
        $wisuda = EventCategory::updateOrCreate(
            ['slug' => 'wisuda'],
            ['name' => 'Wisuda']
        );

        $wedding = EventCategory::updateOrCreate(
            ['slug' => 'wedding'],
            ['name' => 'Wedding']
        );

        $birthday = EventCategory::updateOrCreate(
            ['slug' => 'birthday'],
            ['name' => 'Birthday Party']
        );

        // 2. Buat Tipe Layanan (Master)
        $mua = ServiceType::updateOrCreate(['slug' => 'mua'], ['name' => 'MUA']);
        $foto = ServiceType::updateOrCreate(['slug' => 'fotografer'], ['name' => 'Fotografer']);
        $dekor = ServiceType::updateOrCreate(['slug' => 'dekorasi'], ['name' => 'Dekorasi']);
        $catering = ServiceType::updateOrCreate(['slug' => 'catering'], ['name' => 'Catering']);
        $mc = ServiceType::updateOrCreate(['slug' => 'mc'], ['name' => 'Master of Ceremony']);

        // 3. Hubungkan Kategori dengan Tipe (Tercurasi)
        
        // Wisuda biasanya butuh: MUA, Fotografer, MC
        $wisuda->serviceTypes()->sync([$mua->id, $foto->id, $mc->id]);

        // Wedding butuh hampir semuanya
        $wedding->serviceTypes()->sync([$mua->id, $foto->id, $dekor->id, $catering->id, $mc->id]);

        // Birthday butuh: Dekorasi, Catering, MC, Fotografer (Tapi tidak MUA pengantin)
        $birthday->serviceTypes()->sync([$dekor->id, $catering->id, $mc->id, $foto->id]);
    }
}
