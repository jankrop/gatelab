<script setup>
import {computed, onMounted, ref, watch} from "vue";
    import {store} from "@/store.js";
    import {Node} from "@/gates.js";

    const props = defineProps({
        id: Number,
        mode: String,
    })
    const draggable = ref(false);
    const dragOffsetX = ref(0);
    const dragOffsetY = ref(0);

    const freeNode = computed({
        get: () => store.gates[props.id],
        set: val => {
            if (!store.connections.some(conn => conn.nodes.some(n => n.gate === props.id))) {
                store.gates[props.id] = null
                return
            }
            val.state = val.nodes.find(node => !node.isOutput).state
            for (let i in val.nodes) {
                if (!val.nodes[i].isOutput) continue
                val.nodes[i].state = val.state
            }
            store.gates[props.id] = val
        }
    })

    function handleMouseDown(ev) {
        console.log('Clicked on free node')
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
        } else if (isConnectable()) {
            console.log('Updated new connection!');
            freeNode.value.nodes.push(
                new Node(0, 0, true)
            )
            store.newConnectionNodes.push({
                gate: props.id,
                dest: freeNode.value.nodes.length - 1
            })
        } else if (props.mode !== 'edit') {
            draggable.value = true;
            dragOffsetX.value = ev.clientX - freeNode.value.x;
            dragOffsetY.value = ev.clientY - freeNode.value.y;
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }
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

    // const watches = []
    //
    // function updateWatches() {
    //     for (const unwatch of watches) {
    //         unwatch()
    //     }
    //     for (let [i, conn] of store.connections.entries()) {
    //         if (conn.nodes[0].gate === props.id || conn.nodes[1].gate === props.id) {
    //             watches.push(
    //                 watch(store.connections[i], async () => {
    //                     freeNode.value = freeNode.value
    //                 })
    //             )
    //         }
    //     }
    // }
    //
    // updateWatches()
    //
    // watch(store.connections, updateWatches)

    watch(store.connections, async () => {
        freeNode.value = freeNode.value;
    })

    function getColor() {
        return freeNode.value.state ? '#2c6' : '#063'
    }

    function isConnectable() {
        if (props.mode !== 'connect') return false
        return store.newConnectionNodes.length === 0
    }
</script>

<template>
    <g>
        <circle
            :fill="getColor()"
            :r="freeNode.nodes.length < 3 ? 2 : 6"
            :cx="freeNode.x" :cy="freeNode.y"
        />
        <circle class="drag-circle" v-if="mode === 'edit' || mode === 'delete' || isConnectable()"
                :class="{filled: freeNode.nodes.length < 3}"
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