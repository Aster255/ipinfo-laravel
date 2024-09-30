<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Models\History;
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
    $history=History::orderBy('updated_at', 'desc',)->paginate(10);
    return Inertia::render('Dashboard',["History"=>$history]);    
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->post('/ipinfo',function(Request $request){
    $request->validate([
        'IP' => 'required|ip',
    ]);
    $user = Auth::user();

    $access_token = env('IPINFO_SECRET');
    $client = new IPinfo($access_token);
    $ip_address = $request->IP;
    $details = $client->getDetails($ip_address);
    
    
    $history=History::create([
        'ip'=>$request->IP,
        'details'=>$details,
        'user_id'=>$user->id
    ]);
    return Inertia::location(route('geo.show', ['id' => $history->id]));
})->name('ipinfo');

Route::get('/ip-geopos/{id}', function ($id) {
    $history = History::findOrFail($id);    
    return Inertia::render('GeoPos', [
        'history' => $history,
    ]);
})->middleware(['auth'])->name('geo.show');

Route::post('/delete-ip-history', function(Request $request){
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:histories,id',
        ]);

        if ($validator->fails()) {
            return;
        }

        History::whereIn('id', $request->ids)->delete();
    })
    ->middleware(['auth'])
    ->name('delete-ip-history');
    
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
