<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display the desktop environment
     */
    public function desktop()
    {
        return view('desktop.index');
    }

    /**
     * Display users list (for iframe/window)
     */
    public function index(Request $request)
    {
        $query = User::query();
        
        // Search filter
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }
        
        // Status filter
        if ($request->has('status')) {
            $query->where('email_verified_at', $request->get('status') === 'active' ? '!=' : '=', null);
        }
        
        $users = $query->orderBy('name')->paginate(15);
        
        // Return minimal layout for iframe
        return view('desktop.users.index', compact('users'));
    }

    /**
     * Show edit form (for iframe/window)
     */
    public function edit($user)
    {
        // Handle new user (id = 0)
        if ($user == 0) {
            $user = new User();
        } else {
            $user = User::findOrFail($user);
        }
        
        return view('desktop.users.edit', compact('user'));
    }

    /**
     * Update user
     */
    public function update(Request $request, $user)
    {
        $isNew = $user == 0;
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . ($isNew ? '' : $user),
            'password' => ($isNew ? 'required' : 'nullable') . '|string|min:8',
        ]);
        
        if ($isNew) {
            $user = new User();
        } else {
            $user = User::findOrFail($user);
        }
        
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        
        $user->save();
        
        // Return success response for AJAX
        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => $isNew ? 'Usuário criado com sucesso!' : 'Usuário atualizado com sucesso!',
                'user' => $user
            ]);
        }
        
        return redirect()->back()->with('success', 'Usuário salvo com sucesso!');
    }

    /**
     * Get user data as JSON
     */
    public function show(User $user)
    {
        return response()->json($user);
    }
}
