<script setup>
    defineProps({
        x: Number,
        y: Number,
    })
</script>

<template>
    <rect :x="x" :y="y" width="60" height="80" rx="5" ry="5" />
    <circle r="40" :cx="x + 60" :cy="y + 40" />
</template>