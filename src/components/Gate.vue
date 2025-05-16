<script setup>
import {computed, onMounted, ref, watch} from "vue";
    import { store } from "@/store.js";
import Nand from "@/components/gates/Nand.vue";
import And from "@/components/gates/And.vue";

    const props = defineProps({
        id: Number,
    })
    const draggable = ref(false);
    const dragOffsetX = ref(0);
    const dragOffsetY = ref(0);

    const gate = computed({
        get: () => store.gates[props.id],
        set: val => {
            val.nodes.out.state = val.operation(val.nodes.a.state, val.nodes.b.state)
            store.gates[props.id] = val
        },
    })

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
        get: () => store.gates[props.id].operation(gate.value.nodes.a.state, gate.value.nodes.b.state),
        set: val => store.gates[props.id].nodes.out.state = val,
    })

    const aColor = computed(() => {
        return gate.value.nodes.a.state ? '#2c6' : '#063'
    })

    const bColor = computed(() => {
        return gate.value.nodes.b.state ? '#2c6' : '#063'
    })

    const outColor = computed(() => {
        return gate.value.nodes.out.state ? '#2c6' : '#063'
    })

    function handleMouseDown(ev) {
        draggable.value = true;
        dragOffsetX.value = ev.clientX - gate.value.x;
        dragOffsetY.value = ev.clientY - gate.value.y;
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    function handleMouseMove(ev) {
        if (!draggable.value) return
        gate.value.x = ev.clientX - dragOffsetX.value;
        gate.value.y = ev.clientY - dragOffsetY.value;
    }

    function handleMouseUp() {
        draggable.value = false;
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    onMounted(() => {
        gate.value = gate.value;
    })

    watch(store, async () => {
        console.log('State change!')
        gate.value = gate.value
    })

    function getColor(state) {
        return state ? '#2c6' : '#063'
    }
</script>

<template>
    <g fill="#bbb" opacity="0.9" :class="{draggable: draggable}" @mousedown="handleMouseDown">
        <And v-if="gate.name === 'and'" :x="x" :y="y" />
        <Nand v-if="gate.name === 'nand'" :x="x" :y="y" />
    </g>
    <circle
        v-for="(node, key) in gate.nodes"
        :fill="getColor(node.state)" r="6" :cx="gate.x + node.xOffset" :cy="gate.y + node.yOffset"
        @click="gate.nodes[key].state = !gate.nodes[key].state"/>
<!--    <circle :fill="bColor" r="6" :cx="x" :cy="y + 60" @click="gate.nodes.b.state = !gate.nodes.b.state"/>-->
<!--    <circle :fill="outColor" r="6" :cx="x + 100" :cy="y + 40" />-->
</template>

<style scoped>
    g.draggable {
        filter: drop-shadow(4px 4px 2px #0022);
    }
</style>