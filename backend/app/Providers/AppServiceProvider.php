<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// Pastikan use statement ini ada dan jalurnya tepat!
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository; // Sesuaikan dengan folder repository kamu
use App\Repositories\Interfaces\ServiceRepositoryInterface;
use App\Repositories\ServiceRepository;
use App\Repositories\Interfaces\VendorProfileRepositoryInterface;
use App\Repositories\VendorProfileRepository;
use App\Repositories\Interfaces\EventCategoryRepositoryInterface;
use App\Repositories\EventCategoryRepository;
use App\Repositories\Interfaces\ServiceTypeRepositoryInterface;
use App\Repositories\ServiceTypeRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            UserRepositoryInterface::class, 
            UserRepository::class);

        $this->app->bind(
            ServiceRepositoryInterface::class,
            ServiceRepository::class);

        $this->app->bind(
            VendorProfileRepositoryInterface::class,
            VendorProfileRepository::class);
        $this->app->bind(
            EventCategoryRepositoryInterface::class,
            EventCategoryRepository::class);
        $this->app->bind(
            ServiceTypeRepositoryInterface::class,
            ServiceTypeRepository::class);
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
