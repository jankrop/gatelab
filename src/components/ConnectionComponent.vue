<script setup>
import {computed, onMounted, watch} from "vue";
import { store } from "@/store.js";

const props = defineProps({
    id: Number,
    mode: String,
})

const connection = computed({
    get: () => store.connections[props.id],
    set: val => {
        val.direction = 1 - val.nodes.findIndex(
            node => store.gates[node.gate].nodes[node.dest].isOutput
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

function handleClick() {
    if (props.mode !== 'delete') return
    store.connections.splice(props.id, 1)
}

onMounted(() => {
    connection.value = connection.value
})

watch(store, async () => {connection.value = connection.value})
</script>

<template>
    <line
        :x1="x1" :y1="y1" :x2="x2" :y2="y2"
        :stroke="color" stroke-width="4"
        @click="handleClick"
    />
</template>