<script setup>
defineProps({
    x: Number,
    y: Number,
})
</script>

<template>
    <polygon :points="(x+5) + ',' + (y+5) + ' ' + (x+47) + ',' + (y+20) + ' ' + (x+5) + ',' + (y+35)"
             stroke="#bbb" stroke-linejoin="round" stroke-width="10" />
    <circle r="8" :cx="x + 52" :cy="y + 20" stroke="#bbb" stroke-width="2" fill="#fff" />
</template>