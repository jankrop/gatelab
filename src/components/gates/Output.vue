<script setup>
defineProps({
    x: Number,
    y: Number,
    state: Boolean
})
</script>

<template>
    <circle :cx="x + 20" :cy="y + 20" r="20" />
    <text :x="x + 13" :y="y + 29" fill="#000">{{ state ? '1' : '0' }}</text>
</template>

<style scoped>
text {
    font-size: 24px;
    font-weight: bold;
    user-select: none;
}
</style>