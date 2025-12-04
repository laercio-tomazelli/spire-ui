<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Usuários</title>
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
        {{-- Toolbar --}}
        <div class="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <form method="GET" class="flex-1 flex gap-2">
                <div class="relative flex-1">
                    <input 
                        type="text" 
                        name="search" 
                        value="{{ request('search') }}"
                        placeholder="Buscar por nome ou email..." 
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                <select 
                    name="status" 
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    <option value="">Todos</option>
                    <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>Ativos</option>
                    <option value="inactive" {{ request('status') === 'inactive' ? 'selected' : '' }}>Pendentes</option>
                </select>
                <button 
                    type="submit"
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Buscar
                </button>
            </form>
            <button 
                onclick="parent.openUserEdit(0, 'Novo Usuário')"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
                <span>+</span> Novo
            </button>
        </div>

        {{-- Table --}}
        <div class="flex-1 overflow-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-100 dark:bg-gray-800 sticky top-0">
                    <tr>
                        <th class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">ID</th>
                        <th class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">Nome</th>
                        <th class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">Email</th>
                        <th class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">Status</th>
                        <th class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">Criado em</th>
                        <th class="px-4 py-3 text-center font-medium text-gray-600 dark:text-gray-300">Ações</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    @forelse($users as $user)
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors" 
                            ondblclick="parent.openUserEdit({{ $user->id }}, '{{ addslashes($user->name) }}')">
                            <td class="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono">{{ $user->id }}</td>
                            <td class="px-4 py-3 text-gray-900 dark:text-white font-medium">{{ $user->name }}</td>
                            <td class="px-4 py-3 text-gray-600 dark:text-gray-300">{{ $user->email }}</td>
                            <td class="px-4 py-3">
                                @if($user->email_verified_at)
                                    <span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                        ✓ Ativo
                                    </span>
                                @else
                                    <span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                                        ⏳ Pendente
                                    </span>
                                @endif
                            </td>
                            <td class="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                                {{ $user->created_at->format('d/m/Y H:i') }}
                            </td>
                            <td class="px-4 py-3 text-center">
                                <button 
                                    onclick="event.stopPropagation(); parent.openUserEdit({{ $user->id }}, '{{ addslashes($user->name) }}')"
                                    class="text-blue-500 hover:text-blue-700 hover:underline text-sm"
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                                <div class="flex flex-col items-center gap-2">
                                    <span class="text-4xl">🔍</span>
                                    <span>Nenhum usuário encontrado</span>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        @if($users->hasPages())
            <div class="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Mostrando {{ $users->firstItem() }} - {{ $users->lastItem() }} de {{ $users->total() }} usuários
                    </div>
                    <div class="flex gap-1">
                        @if($users->onFirstPage())
                            <span class="px-3 py-1 text-gray-400 bg-gray-100 dark:bg-gray-700 rounded cursor-not-allowed">←</span>
                        @else
                            <a href="{{ $users->previousPageUrl() }}" class="px-3 py-1 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">←</a>
                        @endif
                        
                        <span class="px-3 py-1 text-gray-600 dark:text-gray-300">
                            {{ $users->currentPage() }} / {{ $users->lastPage() }}
                        </span>
                        
                        @if($users->hasMorePages())
                            <a href="{{ $users->nextPageUrl() }}" class="px-3 py-1 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">→</a>
                        @else
                            <span class="px-3 py-1 text-gray-400 bg-gray-100 dark:bg-gray-700 rounded cursor-not-allowed">→</span>
                        @endif
                    </div>
                </div>
            </div>
        @else
            <div class="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                Total: {{ $users->total() }} usuários
            </div>
        @endif
    </div>
</body>
</html>
