<script setup>
defineProps({
    x: Number,
    y: Number,
    state: Boolean
})
</script>

<template>
    <rect :x="x" :y="y" width="40" height="40" rx="5" ry="5" />
    <text :x="x + 13" :y="y + 29" fill="#000">{{ state ? '1' : '0' }}</text>
</template>

<style scoped>
    text {
        font-size: 24px;
        font-weight: bold;
        user-select: none;
    }
</style>