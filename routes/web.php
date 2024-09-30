<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use ipinfo\ipinfo\IPinfo;
use Illuminate\Http\Request; 

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');

Route::post('/generate-user', function () {
    $user = User::factory()->create();
    return response()->json([
        'email' => $user->email,
        'password' => 'password',
    ]);
})->name('generate-user');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->post('/ipinfo',function(Request $request){
    
    $request->validate([
        'IP' => 'required|ip',
    ]);
    
    $access_token = env('IPINFO_SECRET');
    $client = new IPinfo($access_token);
    $ip_address = '216.239.36.21';
    $details = $client->getDetails($ip_address);
    
    dd($details);
})->name('ipinfo');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
