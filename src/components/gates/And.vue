<script setup>
import {computed, onMounted, ref, watch} from "vue";
    import { store } from "@/store.js";

    const props = defineProps({
        id: Number,
    })
    const draggable = ref(false);

    const x = computed({
        get: () => store.gates[props.id].x,
        set: val => store.gates[props.id].x = val,
    })
    const y = computed({
        get: () => store.gates[props.id].y,
        set: val => store.gates[props.id].y = val,
    })
    const aState = computed({
        get: () => store.gates[props.id].aState,
        set: val => store.gates[props.id].aState = val,
    })
    const bState = computed({
        get: () => store.gates[props.id].bState,
        set: val => store.gates[props.id].bState = val,
    })
    const outState = computed({
        get: () => aState.value && bState.value,
        set: val => store.gates[props.id].outState = val,
    })

    const aColor = computed(() => {
        return aState.value ? '#2c6' : '#f46'
    })

    const bColor = computed(() => {
        return bState.value ? '#2c6' : '#f46'
    })

    const outColor = computed(() => {
        return outState.value ? '#2c6' : '#f46'
    })

    onMounted(() => {
        outState.value = outState.value;
    })

watch(store, async () => {outState.value = outState.value})
</script>

<template>
    <g fill="#ccc" :class="{draggable: draggable}" @mousedown="draggable = true" @mouseup="draggable = false">
        <rect :x="x" :y="y" width="60" height="80" rx="5" ry="5" />
        <circle r="40" :cx="x + 60" :cy="y + 40" />
    </g>
    <circle :fill="aColor" stroke="#ccc" stroke-width="2" r="6" :cx="x" :cy="y + 20" @click="aState = !aState"/>
    <circle :fill="bColor" stroke="#ccc" stroke-width="2" r="6" :cx="x" :cy="y + 60" @click="bState = !bState"/>
    <circle :fill="outColor" stroke="#ccc" stroke-width="2" r="6" :cx="x + 100" :cy="y + 40" />
</template>

<style scoped>
    g.draggable {
        filter: drop-shadow(4px 4px 2px #0022);
    }
</style>