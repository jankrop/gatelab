<script setup>
import {computed, onMounted, watch} from "vue";
import { store } from "@/store.js";

const props = defineProps({
    id: Number,
})

const connection = computed({
    get: () => store.connections[props.id],
    set: val => {
        // const states = val.nodes.map(
        //     node => node.dest === 'out' ? store.gates[node.gate].nodes.out.state : 'undefined'
        // )
        // let state;
        // if (states[0] === 'undefined' || states[0] === states[1]) {
        //     state = states[1]
        // } else if (states[1] === 'undefined') {
        //     state = states[0]
        // } else {
        //     state = 'undefined'
        // }
        // val.state = state
        // state = state === 'undefined' ? 0 : state
        // val.nodes.forEach(node => {
        //     if (node.dest === 'out') return
        //     store.gates[node.gate].nodes[node.dest].state = state
        // })

        val.direction = 1 -val.nodes.findIndex(
            node => node.dest === 'out'
        )
        if (val.direction === -1) {
            val.state = 0
            return;
        }
        const source = val.nodes[1 - val.direction]
        const destination = val.nodes[val.direction]
        val.state = store.gates[source.gate].nodes[source.dest].state
        store.gates[destination.gate].nodes[destination.dest].state = val.state
        store.connections[props.id] = val
    }
})

const x1 = computed(() => {
    const node = connection.value.nodes[0]
    return store.gates[node.gate].x + store.gates[node.gate].nodes[node.dest].xOffset
})
const y1 = computed(() => {
    const node = connection.value.nodes[0]
    return store.gates[node.gate].y + store.gates[node.gate].nodes[node.dest].yOffset
})
const x2 = computed(() => {
    const node = connection.value.nodes[1]
    return store.gates[node.gate].x + store.gates[node.gate].nodes[node.dest].xOffset
})
const y2 = computed(() => {
    const node = connection.value.nodes[1]
    return store.gates[node.gate].y + store.gates[node.gate].nodes[node.dest].yOffset
})


const color = computed(() => {
    return connection.value.state === 'undefined' ? '#446' : (connection.value.state ? '#2c6' : '#063')
})

onMounted(() => {
    connection.value = connection.value
})

watch(store, async () => {connection.value = connection.value})
</script>

<template>
    <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" :stroke="color" stroke-width="4" />
</template>