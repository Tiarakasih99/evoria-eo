<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_service_type', function (Blueprint $table) {
            $table->id();
            // Foreign key ke tabel event_categories PUNYA KAMU
            $table->foreignId('event_category_id')->constrained('event_categories')->onDelete('cascade');
            
            // Foreign key ke tabel service_types BARU
            $table->foreignId('service_type_id')->constrained('service_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_service_type');
    }
};
