<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Sistema ERP - Desktop</title>
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/spire/global.ts'])
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 h-screen">
    {{-- Desktop Container --}}
    <div id="desktop" class="relative w-full h-full overflow-hidden">
        {{-- Desktop Icons --}}
        <div class="p-6 grid grid-cols-1 gap-4 w-24">
            <button 
                id="icon-users" 
                class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/20 transition-colors group"
            >
                <span class="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform">👥</span>
                <span class="text-xs text-white font-medium text-center drop-shadow">Usuários</span>
            </button>
            
            <button 
                id="icon-new-user" 
                class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/20 transition-colors group"
            >
                <span class="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform">➕</span>
                <span class="text-xs text-white font-medium text-center drop-shadow">Novo Usuário</span>
            </button>
        </div>

        {{-- Taskbar --}}
        <x-ui.window-taskbar id="main-taskbar" />
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            SpireUI.init();
            
            const getTaskbar = () => SpireUI.get(document.getElementById('main-taskbar'));
            
            // Double-click on desktop icon to open Users module
            document.getElementById('icon-users')?.addEventListener('dblclick', () => {
                openUsersWindow();
            });
            
            // Single click also works
            document.getElementById('icon-users')?.addEventListener('click', () => {
                openUsersWindow();
            });
            
            function openUsersWindow() {
                const taskbar = getTaskbar();
                if (taskbar) {
                    taskbar.openWindow({
                        title: 'Cadastro de Usuários',
                        icon: '👥',
                        url: '{{ route("desktop.users.index") }}',
                        width: '800px',
                        height: '550px'
                    });
                }
            }
            
            // Open blank user form
            document.getElementById('icon-new-user')?.addEventListener('click', () => {
                const taskbar = getTaskbar();
                if (taskbar) {
                    taskbar.openWindow({
                        title: 'Novo Usuário',
                        icon: '➕',
                        url: '{{ route("desktop.users.edit", ["user" => 0]) }}',
                        width: '500px',
                        height: '400px'
                    });
                }
            });
            
            // Global function to open edit window (called from iframe)
            window.openUserEdit = function(userId, userName) {
                const taskbar = getTaskbar();
                if (taskbar) {
                    taskbar.openWindow({
                        title: 'Editar: ' + userName,
                        icon: '✏️',
                        url: '/desktop/users/' + userId + '/edit',
                        width: '500px',
                        height: '450px'
                    });
                }
            };
            
            // Global function to refresh users list (called from edit iframe after save)
            window.refreshUsersList = function() {
                const iframes = document.querySelectorAll('iframe[src*="/desktop/users"]');
                iframes.forEach(iframe => {
                    if (!iframe.src.includes('/edit')) {
                        iframe.contentWindow.location.reload();
                    }
                });
            };
            
            console.log('🖥️ Desktop ERP carregado!');
            console.log('Clique nos ícones para abrir módulos');
            console.log('Clique direito no desktop para menu de contexto');
        });
    </script>
</body>
</html>
