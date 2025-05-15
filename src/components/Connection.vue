<script setup>
import {computed, onMounted, watch} from "vue";
import { store } from "@/store.js";

const props = defineProps({
    id: Number,
})

const state = computed({
    get: () => {
        const states = store.connections[props.id].nodes.map(
            node => node.dest === 'out' ? store.gates[node.gate].nodes.out.state : 'undefined'
        )
        if (states[0] === 'undefined' || states[0] === states[1]) {
            return states[1]
        } else if (states[1] === 'undefined') {
            return states[0]
        } else {
            return 'undefined'
        }
    },
    set: val => {
        store.connections[props.id].state = val
        val = val === 'undefined' ? 0 : val
        store.connections[props.id].nodes.forEach(node => {
            if (node.dest === 'out') return
            store.gates[node.gate].nodes[node.dest].state = val
        })
    }
})

const x1 = computed(() => {
    const node = store.connections[props.id].nodes[0]
    return store.gates[node.gate].x + store.gates[node.gate].nodes[node.dest].xOffset
})
const y1 = computed(() => {
    const node = store.connections[props.id].nodes[0]
    return store.gates[node.gate].y + store.gates[node.gate].nodes[node.dest].yOffset
})
const x2 = computed(() => {
    const node = store.connections[props.id].nodes[1]
    return store.gates[node.gate].x + store.gates[node.gate].nodes[node.dest].xOffset
})
const y2 = computed(() => {
    const node = store.connections[props.id].nodes[1]
    return store.gates[node.gate].y + store.gates[node.gate].nodes[node.dest].yOffset
})


const color = computed(() => {
    return state.value === 'undefined' ? '#446' : (state.value ? '#2c6' : '#063')
})

onMounted(() => {
    state.value = state.value
})

watch(store, async () => {state.value = state.value})
</script>

<template>
    <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" :stroke="color" stroke-width="4" />
</template>