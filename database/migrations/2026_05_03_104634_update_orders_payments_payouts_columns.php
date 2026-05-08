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
        // Update Tabel Orders
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('remaining_balance', 10, 2)->default(0)->after('dp_amount');
        });

        // Update Tabel Payments
        Schema::table('payments', function (Blueprint $table) {
            $table->string('payment_method', 50)->nullable()->after('amount');
            $table->string('proof_of_payment')->nullable()->after('payment_method');
        });

        // Update Tabel Payouts
// Update Tabel Payouts
        Schema::table('payouts', function (Blueprint $table) {
            $table->timestamp('payout_date')->nullable()->after('amount');
            
            // CEK DULU: Hanya tambah kolom 'status' jika belum ada
            if (!Schema::hasColumn('payouts', 'status')) {
                $table->enum('status', ['pending', 'processing', 'completed', 'failed'])
                    ->default('pending')
                    ->after('commission');
            }

            $table->timestamp('scheduled_at')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
