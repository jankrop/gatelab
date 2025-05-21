<script setup>
defineProps({
    x: Number,
    y: Number,
})
</script>

<template>
    <rect :x="x" :y="y" width="52" height="80" rx="5" ry="5" />
    <circle r="40" :cx="x + 52" :cy="y + 40" />
    <circle r="8" :cx="x + 92" :cy="y + 40" stroke="#bbb" stroke-width="2" fill="#fff" />
</template>