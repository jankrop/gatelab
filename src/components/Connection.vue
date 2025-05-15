<script setup>
import {computed, onMounted, watch} from "vue";
import { store } from "@/store.js";

const props = defineProps({
    id: Number,
})

const state = computed({
    get: () => {
        const states = store.connections[props.id].nodes.map(
            node => node.type === 'gateOut' ? store.gates[node.id].outState : 'undefined'
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
        console.log(val)
        store.connections[props.id].state = val
        val = val === 'undefined' ? 0 : val
        store.connections[props.id].nodes.forEach(node => {
            switch(node.type) {
                case 'gateA':
                    store.gates[node.id].aState = val
                    break
                case 'gateB':
                    store.gates[node.id].bState = val
                    break
                case 'gateOut':
                    break
            }
        })
    }
})

const color = computed(() => {
    return state.value === 'undefined' ? '#446' : (state.value ? '#2c6' : '#f46')
})

onMounted(() => {
    state.value = state.value
})

watch(store, async () => {state.value = state.value})
</script>

<template>

</template>