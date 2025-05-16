<script setup>
import {computed, onMounted, ref, watch} from "vue";
    import {store} from "@/store.js";

    const props = defineProps({
        id: Number,
    })
    const draggable = ref(false);
    const dragOffsetX = ref(0);
    const dragOffsetY = ref(0);

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

    function handleMouseDown(ev) {
        draggable.value = true;
        dragOffsetX.value = ev.clientX - freeNode.value.x;
        dragOffsetY.value = ev.clientY - freeNode.value.y;
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    function handleMouseMove(ev) {
        if (!draggable.value) return
        freeNode.value.x = ev.clientX - dragOffsetX.value;
        freeNode.value.y = ev.clientY - dragOffsetY.value;
    }

    function handleMouseUp() {
        draggable.value = false;
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    onMounted(() => {
        freeNode.value = freeNode.value;
    })

    watch(store, async () => freeNode.value = freeNode.value);

    function getColor() {
        return freeNode.value.state ? '#2c6' : '#063'
    }
</script>

<template>
    <g>
        <circle
            :fill="getColor()"
            :r="freeNode.nodes.length > 0 && freeNode.nodes.length < 3 ? 2 : 6"
            :cx="freeNode.x" :cy="freeNode.y"
        />
        <circle class="drag-circle"
                :class="{filled: freeNode.nodes.length > 0 && freeNode.nodes.length < 3}"
                r="10" :cx="freeNode.x" :cy="freeNode.y" @mousedown="handleMouseDown"
        />
    </g>
</template>

<style scoped>
    .drag-circle {
        cursor: move;
        fill: #0000;
        border-radius: 100%;
    }
    .drag-circle:hover {
        outline: #8884 solid 4px;
        outline-offset: -4px;
    }
    .drag-circle.filled:hover {
        outline: none;
        fill: #8884
    }
</style>