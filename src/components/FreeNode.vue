<script setup>
import {computed, onMounted, watch} from "vue";
    import {store} from "@/store.js";

    const props = defineProps({
        id: Number,
    })
    const freeNode = computed({
        get: () => store.gates[props.id],
        set: val => {
            val.state = val.nodes.find(node => !node.isOutput).state
            for (let i in val.nodes) {
                if (!val.nodes[i].isOutput) continue
                val.nodes[i].state = val.state
            }
            store.gates[props.id] = val
        }
    })

    onMounted(() => {
        freeNode.value = freeNode.value;
    })

    watch(store, async () => freeNode.value = freeNode.value);

    function getColor() {
        return freeNode.value.state ? '#2c6' : '#063'
    }
</script>

<template>
    <g :fill="getColor()">
        <circle r="6" :cx="freeNode.x" :cy="freeNode.y" />
    </g>
</template>

<style scoped>

</style>