<script setup>
defineProps({
    x: Number,
    y: Number,
    state: Boolean
})
</script>

<template>
    <circle :cx="x + 15" :cy="y + 15" r="15" />
    <text :x="x + 8" :y="y + 23" fill="#000">{{ state ? '1' : '0' }}</text>
</template>

<style scoped>
text {
    font-size: 24px;
    font-weight: bold;
    user-select: none;
}
</style>