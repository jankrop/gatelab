<script setup>
import {computed, onMounted, ref, watch} from "vue";
    import { store } from "@/store.js";

    const props = defineProps({
        id: Number,
    })
    const draggable = ref(false);
    const dragOffsetX = ref(0);
    const dragOffsetY = ref(0);

    const x = computed({
        get: () => store.gates[props.id].x,
        set: val => store.gates[props.id].x = val,
    })
    const y = computed({
        get: () => store.gates[props.id].y,
        set: val => store.gates[props.id].y = val,
    })
    const aState = computed({
        get: () => store.gates[props.id].nodes.a.state,
        set: val => store.gates[props.id].nodes.a.state = val,
    })
    const bState = computed({
        get: () => store.gates[props.id].nodes.b.state,
        set: val => store.gates[props.id].nodes.b.state = val,
    })
    const outState = computed({
        get: () => aState.value && bState.value,
        set: val => store.gates[props.id].nodes.out.state = val,
    })

    const aColor = computed(() => {
        return aState.value ? '#2c6' : '#063'
    })

    const bColor = computed(() => {
        return bState.value ? '#2c6' : '#063'
    })

    const outColor = computed(() => {
        return outState.value ? '#2c6' : '#063'
    })

    function handleMouseDown(ev) {
        draggable.value = true;
        dragOffsetX.value = ev.clientX - x.value;
        dragOffsetY.value = ev.clientY - y.value;
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    function handleMouseMove(ev) {
        if (!draggable.value) return
        x.value = ev.clientX - dragOffsetX.value;
        y.value = ev.clientY - dragOffsetY.value;
    }

    function handleMouseUp() {
        draggable.value = false;
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    onMounted(() => {
        outState.value = outState.value;
    })

    watch(store, async () => {outState.value = outState.value})
</script>

<template>
    <g fill="#bbb" opacity="0.9" :class="{draggable: draggable}" @mousedown="handleMouseDown">
        <rect :x="x" :y="y" width="60" height="80" rx="5" ry="5" />
        <circle r="40" :cx="x + 60" :cy="y + 40" />
    </g>
    <circle :fill="aColor" r="6" :cx="x" :cy="y + 20" @click="aState = !aState"/>
    <circle :fill="bColor" r="6" :cx="x" :cy="y + 60" @click="bState = !bState"/>
    <circle :fill="outColor" r="6" :cx="x + 100" :cy="y + 40" />
</template>

<style scoped>
    g.draggable {
        filter: drop-shadow(4px 4px 2px #0022);
    }
</style>