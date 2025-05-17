<script setup>
import Gate from "@/components/Gate.vue";

import { store } from "@/store.js";
import Connection from "@/components/Connection.vue";
import FreeNode from "@/components/FreeNode.vue";
import {And, Not, Nand, Input, Output} from "@/gates.js";
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
    <svg class="workspace" ref="workspace" @mousemove="handleMouseMove" @click="handleClick">
        <g v-for="(connection, id) in store.connections">
            <Connection :id="id" />
        </g>
        <g v-for="(gate, id) in store.gates">
            <FreeNode :id="id" :mode="mode" v-if="gate.name === 'freenode'" />
            <Gate :id="id" :mode="mode" v-else />
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
