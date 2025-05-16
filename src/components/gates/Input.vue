<script setup>
defineProps({
    x: Number,
    y: Number,
})
</script>

<template>
    <rect :x="x" :y="y" width="30" height="30" rx="5" ry="5" />
</template>

<style scoped>

</style>