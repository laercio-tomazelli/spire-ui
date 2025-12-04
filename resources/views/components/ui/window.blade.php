@props([
    'id' => null,
    'title' => 'Janela',
    'icon' => '📋',
    'width' => '500px',
    'height' => '400px',
    'minWidth' => 200,
    'minHeight' => 150,
    'x' => null,
    'y' => null,
])

@php
    $windowId = $id ?? 'window-' . uniqid();
@endphp

<div 
    data-v="window"
    id="{{ $windowId }}"
    data-window-id="{{ $windowId }}"
    data-title="{{ $title }}"
    data-icon="{{ $icon }}"
    data-width="{{ $width }}"
    data-height="{{ $height }}"
    data-min-width="{{ $minWidth }}"
    data-min-height="{{ $minHeight }}"
    @if($x !== null) style="left: {{ $x }}px; top: {{ $y ?? 100 }}px;" @endif
    {{ $attributes }}
>
    {{ $slot }}
</div>
