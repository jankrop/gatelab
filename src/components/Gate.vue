<script setup>
    import {computed, onMounted, ref, watch} from "vue";
    import { store } from "@/store.js";
    import Nand from "@/components/gates/Nand.vue";
    import And from "@/components/gates/And.vue";
    import Not from "@/components/gates/Not.vue";
    import Input from "@/components/gates/Input.vue";
    import Output from "@/components/gates/Output.vue";

    const props = defineProps({
        id: Number,
        mode: String,
    })
    const draggable = ref(false);
    const dragOffsetX = ref(0);
    const dragOffsetY = ref(0);

    const gate = computed({
        get: () => store.gates[props.id],
        set: val => {
            if (val.name === 'input' || val.name === 'output') return;
            val.nodes.out.state = val.name === 'not' ?
                val.operation(val.nodes.a.state) :
                val.operation(val.nodes.a.state, val.nodes.b.state)
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

    function handleMouseDown(ev) {
        if (props.mode === 'run' && gate.value.name === 'input') {
            console.log('Clicked on input')
            gate.value.nodes.out.state = !gate.value.nodes.out.state;
        } else if (props.mode === 'edit') {
            draggable.value = true;
            dragOffsetX.value = ev.clientX - gate.value.x;
            dragOffsetY.value = ev.clientY - gate.value.y;
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }
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
        <Not v-if="gate.name === 'not'" :x="x" :y="y" />
        <Input v-if="gate.name === 'input'" :x="x" :y="y" :state="gate.nodes.out.state" />
        <Output v-if="gate.name === 'output'" :x="x" :y="y" :state="gate.nodes.a.state" />
    </g>
    <circle
        v-for="(node, key) in gate.nodes"
        :fill="getColor(node.state)" r="6" :cx="gate.x + node.xOffset" :cy="gate.y + node.yOffset"
    />
</template>

<style scoped>
    g.draggable {
        filter: drop-shadow(4px 4px 2px #0022);
    }
</style>