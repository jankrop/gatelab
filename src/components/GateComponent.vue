<script setup>
    import {computed, onMounted, ref, watch} from "vue";
    import { store } from "@/store.js";
    import Nand from "@/components/gates/Nand.vue";
    import And from "@/components/gates/And.vue";
    import Not from "@/components/gates/Not.vue";
    import Input from "@/components/gates/Input.vue";
    import Output from "@/components/gates/Output.vue";
    import {Connection} from "@/gates.js";

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
        if (props.mode === 'delete') {
            const newConnectionStore = store.connections;
            for (let [i, connection] of store.connections.entries()) {
                console.log(i, connection.nodes[0].gate, connection.nodes[1].gate, props.id)
                if (connection.nodes[0].gate === props.id || connection.nodes[1].gate === props.id) {
                    console.log(store.connections, i)
                    newConnectionStore[i] = 0
                    console.log(store.connections)
                }
            }
            store.connections = newConnectionStore.filter(c => c !== 0)
            store.gates[props.id] = null
        } if (props.mode === 'run' && gate.value.name === 'input') {
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

    const watches = []

    function updateWatches() {
        for (const unwatch of watches) {
            unwatch()
        }
        for (let [i, conn] of store.connections.entries()) {
            if (conn.nodes[0].gate === props.id || conn.nodes[1].gate === props.id) {
                watches.push(
                    watch(store.connections[i], async () => {
                        gate.value = gate.value
                    })
                )
            }
        }
    }

    updateWatches()

    watch(store.connections, updateWatches)

    function getColor(state) {
        return state ? '#2c6' : '#063'
    }

    function isConnectable(node, nodeName) {
        if (props.mode !== 'connect') return false
        const isConnected = store.connections.some(
            conn => conn.nodes.some(
                n => n.gate === props.id && n.dest == nodeName
            )
        )
        const isStarting = store.newConnectionNodes.length === 0
        if (isConnected) {
            return node.isOutput && isStarting
        } else {
            return node.isOutput === isStarting
        }
    }

    function createConnection(node, nodeName) {
        if (props.mode !== 'connect') return false
        console.log('Updated new connection!')
        const nodeInfo = {gate: props.id, dest: nodeName}
        store.newConnectionNodes.push(nodeInfo)
        if (!node.isOutput) {
            console.log('Submitted new connection!')
            store.connections.push(new Connection(store.newConnectionNodes))
            store.newConnectionNodes = []
        }
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
        v-for="(node, key) in gate.nodes" :class="{'node-highlight': isConnectable(node, key)}"
        :fill="getColor(node.state)" r="6" :cx="gate.x + node.xOffset" :cy="gate.y + node.yOffset"
        @click="createConnection(node, key)"
    />
</template>

<style scoped>
    g.draggable {
        filter: drop-shadow(4px 4px 2px #0022);
    }
    .node-highlight:hover {
        border-radius: 100%;
        outline: #8884 solid 4px;
        cursor: pointer;
    }
</style>