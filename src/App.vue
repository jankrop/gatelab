<script setup>
import GateComponent from "@/components/GateComponent.vue";

import { store } from "@/store.js";
import ConnectionComponent from "@/components/ConnectionComponent.vue";
import FreeNodeComponent from "@/components/FreeNodeComponent.vue";
import {And, Not, Nand, Input, Output, FreeNode, Connection, Node} from "@/gates.js";
import {onMounted, ref, useTemplateRef} from "vue";

const mode = ref('edit');
const cursorX = ref(0);
const cursorY = ref(0);
const workspace = useTemplateRef('workspace');
const workspaceX = ref(0);
const workspaceY = ref(0);

function handleMouseMove(ev) {
    cursorX.value = ev.clientX
    cursorY.value = ev.clientY
}

function getNodeCoords(nodeInfo) {
    return {
        x: store.gates[nodeInfo.gate].x + store.gates[nodeInfo.gate].nodes[nodeInfo.dest].xOffset,
        y: store.gates[nodeInfo.gate].y + store.gates[nodeInfo.gate].nodes[nodeInfo.dest].yOffset,
    }
}

function handleClick(ev) {
    if (mode.value !== 'connect' || store.newConnectionNodes.length === 0) return

    store.gates.push(
        new FreeNode(
            ev.clientX - workspaceX.value,
            ev.clientY - workspaceY.value,
            [
                new Node(0, 0, false),
                new Node(0, 0, true),
            ]
        ));

    store.newConnectionNodes.push({gate: store.gates.length - 1, dest: 0})
    store.connections.push(new Connection(store.newConnectionNodes))
    store.newConnectionNodes = [{gate: store.gates.length - 1, dest: 1}]
}

onMounted(() => {
    document.onclick = _ => {
        const box = workspace.value.getBoundingClientRect()
        workspaceX.value = box.left
        workspaceY.value = box.top
    }

    document.body.onkeyup = ev => {
        if (ev.key !== 'Escape') return
        store.newConnectionNodes = []
    }
})
</script>

<template>
    <svg class="workspace" ref="workspace" @mousemove="handleMouseMove">
        <rect x="0" y="0" width="1800" height="800" fill="white" @click="handleClick" />
        <g v-for="(connection, id) in store.connections">
            <ConnectionComponent :id="id" :mode="mode" />
        </g>
        <g v-for="(gate, id) in store.gates">
            <div v-if="gate === null"></div>
            <FreeNodeComponent :id="id" :mode="mode" v-else-if="gate.name === 'freenode'" />
            <GateComponent :id="id" :mode="mode" v-else />
        </g>
        <line v-if="store.newConnectionNodes.length > 0"
            :x1="getNodeCoords(store.newConnectionNodes[0]).x"
            :y1="getNodeCoords(store.newConnectionNodes[0]).y"
            :x2="cursorX - workspaceX"
            :y2="cursorY - workspaceY"
            stroke="#2c6a"
            stroke-width="4"
            class="phantom-connection"
        />
    </svg>
    <div class="toolbar">
        <button @click="store.gates.push(new Not(20, 20))">NOT</button>
        <button @click="store.gates.push(new And(20, 20))">AND</button>
        <button>OR</button>
        <button>XOR</button>
        <button @click="store.gates.push(new Nand(20, 20))">NAND</button>
        <button>NOR</button>
        &ensp;
        <button @click="store.gates.push(new Input(20, 20))">Input</button>
        <button @click="store.gates.push(new Output(20, 20))">Output</button>
        &emsp;
        <button @click="mode = 'run'">Run mode</button>
        <button @click="mode = 'edit'">Edit mode</button>
        <button @click="mode = 'connect'">Connect mode</button>
        <button @click="mode = 'delete'">Delete mode</button>
        &nbsp;
        <span>Current mode: <b>{{ mode }}</b></span>
    </div>
</template>

<style scoped>
    .workspace {
        background-color: white;
        width: 1800px;
        height: 800px;
    }
    .phantom-connection {
        pointer-events: none;
    }
</style>
