<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Editar Usuário</title>
    @vite(['resources/css/app.css'])
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            font-family: system-ui, -apple-system, sans-serif;
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 h-full">
    <div class="flex flex-col h-full">
        {{-- Header --}}
        <div class="px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3">
                <span class="text-2xl">{{ $user->id ? '✏️' : '➕' }}</span>
                <div>
                    <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ $user->id ? 'Editar Usuário' : 'Novo Usuário' }}
                    </h1>
                    @if($user->id)
                        <p class="text-sm text-gray-500 dark:text-gray-400">ID: {{ $user->id }}</p>
                    @endif
                </div>
            </div>
        </div>

        {{-- Form --}}
        <form 
            id="user-form"
            method="POST" 
            action="{{ $user->id ? route('desktop.users.update', $user) : route('desktop.users.update', 0) }}"
            class="flex-1 overflow-auto p-6"
        >
            @csrf
            @if($user->id)
                @method('PUT')
            @endif

            <div class="space-y-5 max-w-lg">
                {{-- Nome --}}
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome completo
                    </label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value="{{ old('name', $user->name) }}"
                        required
                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Digite o nome completo"
                    >
                    @error('name')
                        <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                    @enderror
                </div>

                {{-- Email --}}
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        name="email" 
                        value="{{ old('email', $user->email) }}"
                        required
                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="email@exemplo.com"
                    >
                    @error('email')
                        <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                    @enderror
                </div>

                {{-- Password --}}
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Senha {{ $user->id ? '(deixe em branco para manter)' : '' }}
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        name="password" 
                        {{ !$user->id ? 'required' : '' }}
                        class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="••••••••"
                    >
                    @error('password')
                        <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                    @enderror
                </div>

                {{-- Status Info --}}
                @if($user->id)
                    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Informações</h3>
                        <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>
                                <span class="font-medium">Status:</span>
                                @if($user->email_verified_at)
                                    <span class="text-green-600 dark:text-green-400">✓ Verificado em {{ $user->email_verified_at->format('d/m/Y H:i') }}</span>
                                @else
                                    <span class="text-yellow-600 dark:text-yellow-400">⏳ Aguardando verificação</span>
                                @endif
                            </p>
                            <p><span class="font-medium">Criado em:</span> {{ $user->created_at->format('d/m/Y H:i') }}</p>
                            <p><span class="font-medium">Atualizado em:</span> {{ $user->updated_at->format('d/m/Y H:i') }}</p>
                        </div>
                    </div>
                @endif
            </div>
        </form>

        {{-- Footer --}}
        <div class="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-end gap-3">
                <button 
                    type="button"
                    onclick="window.parent.postMessage({action: 'close'}, '*')"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    Cancelar
                </button>
                <button 
                    type="submit"
                    form="user-form"
                    id="btn-save"
                    class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                    <span id="btn-text">💾 Salvar</span>
                    <span id="btn-loading" class="hidden">
                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('user-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const form = this;
            const btnSave = document.getElementById('btn-save');
            const btnText = document.getElementById('btn-text');
            const btnLoading = document.getElementById('btn-loading');
            
            // Show loading
            btnSave.disabled = true;
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Notify parent to refresh list
                    if (parent.refreshUsersList) {
                        parent.refreshUsersList();
                    }
                    
                    // Show success message
                    btnText.textContent = '✓ Salvo!';
                    btnText.classList.remove('hidden');
                    btnLoading.classList.add('hidden');
                    btnSave.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                    btnSave.classList.add('bg-green-500');
                    
                    // Close after delay
                    setTimeout(() => {
                        // Try to close the window
                        window.parent.postMessage({action: 'close'}, '*');
                    }, 1000);
                } else {
                    throw new Error(data.message || 'Erro ao salvar');
                }
            } catch (error) {
                console.error('Error:', error);
                btnText.textContent = '❌ Erro!';
                btnText.classList.remove('hidden');
                btnLoading.classList.add('hidden');
                btnSave.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                btnSave.classList.add('bg-red-500');
                
                setTimeout(() => {
                    btnText.textContent = '💾 Salvar';
                    btnSave.disabled = false;
                    btnSave.classList.remove('bg-red-500');
                    btnSave.classList.add('bg-blue-500', 'hover:bg-blue-600');
                }, 2000);
            }
        });
    </script>
</body>
</html>
