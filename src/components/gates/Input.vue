<script setup>
defineProps({
    x: Number,
    y: Number,
    state: Boolean
})
</script>

<template>
    <rect :x="x" :y="y" width="30" height="30" rx="5" ry="5" />
    <text :x="x + 8" :y="y + 23" fill="#000">{{ state ? '1' : '0' }}</text>
</template>

<style scoped>
    text {
        font-size: 24px;
        font-weight: bold;
        user-select: none;
    }
</style>