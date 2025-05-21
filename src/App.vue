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
const snapping = ref(true);
const version = ref(__APP_VERSION__);

function handleMouseMove(ev) {
    if (snapping.value) {
        cursorX.value = Math.round(ev.clientX / 20) * 20
        cursorY.value = Math.round(ev.clientY / 20) * 20
    } else {
        cursorX.value = ev.clientX
        cursorY.value = ev.clientY
    }
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
            cursorX.value,
            cursorY.value,
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
        <line :x1="i*20" y1="0" :x2="i*20" y2="1080" stroke="#ccc" stroke-width="0.5" v-for="i in Math.ceil(1920/20)" v-if="snapping" />
        <line x1="0" :y1="i*20" x2="1920" :y2="i*20" stroke="#ccc" stroke-width="0.5" v-for="i in Math.ceil(1920/20)" v-if="snapping" />
        <rect x="0" y="0" width="1920" height="1080" fill="#0000" @click="handleClick" />
        <g v-for="(connection, id) in store.connections">
            <ConnectionComponent :id="id" :mode="mode" />
        </g>
        <g v-for="(gate, id) in store.gates">
            <div v-if="gate === null"></div>
            <FreeNodeComponent :id="id" :mode="mode" :snapping="snapping" v-else-if="gate.name === 'freenode'" />
            <GateComponent :id="id" :mode="mode" :snapping="snapping" v-else />
        </g>
        <line v-if="store.newConnectionNodes.length > 0"
            :x1="getNodeCoords(store.newConnectionNodes[0]).x"
            :y1="getNodeCoords(store.newConnectionNodes[0]).y"
            :x2="cursorX"
            :y2="cursorY"
            stroke="#2c6a"
            stroke-width="4"
            class="phantom-connection"
        />
    </svg>
    <div class="logo">
        <h1>gatelab</h1>
        <p>v{{ version }}</p>
    </div>
    <div class="toolbar">
        <button @click="store.gates.push(new Not(20, 20))" :disabled="mode !== 'edit'">NOT</button>
        <button @click="store.gates.push(new And(20, 20))" :disabled="mode !== 'edit'">AND</button>
        <button :disabled="mode !== 'edit'">OR</button>
        <button :disabled="mode !== 'edit'">XOR</button>
        <button @click="store.gates.push(new Nand(20, 20))" :disabled="mode !== 'edit'">NAND</button>
        <button :disabled="mode !== 'edit'">NOR</button>
        <div class="separator"></div>
        <button @click="store.gates.push(new Input(20, 20))"  :disabled="mode !== 'edit'">Input</button>
        <button @click="store.gates.push(new Output(20, 20))" :disabled="mode !== 'edit'">Output</button>
        <div class="separator"></div>
        <button @click="mode = 'run'" :class="{'enabled': mode === 'run'}">run</button>
        <button @click="mode = 'edit'" :class="{'enabled': mode === 'edit'}">edit</button>
        <button @click="mode = 'connect'" :class="{'enabled': mode === 'connect'}">connect</button>
        <button @click="mode = 'delete'" :class="{'enabled': mode === 'delete'}">delete</button>
        <div class="separator"></div>
        <button @click="snapping = !snapping" :class="{'enabled': snapping}">snapping</button>
    </div>
</template>

<style scoped>
    .workspace {
        background-color: white;
        width: 100vw;
        height: 100vh;
    }
    .phantom-connection {
        pointer-events: none;
    }
    .logo {
        position: absolute;
        top: 10px;
        right: 10px;
        user-select: none;
    }
    .logo h1 {
        font-size: 30px;
        font-weight: bold;
        background-image: linear-gradient(-45deg, #dd8800, #00dd88);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        margin: 0;
    }
    .logo p {
        margin: -8px 0 0;
        text-align: right;
        color: #444;
        font-size: 14px;
    }
    button {
        background-color: transparent;
        border: none;
        padding: 5px 10px;
        font-family: inherit;
        font-size: inherit;
        color: black;
    }
    button:first-child {
        border-top-left-radius: 5px;
    }
    button:last-child {
        border-top-right-radius: 5px;
    }
    button:not(:disabled):hover {
        cursor: pointer;
        background-color: #0001;
    }
    button.enabled {
        background-color: #0002;
    }
    button.enabled:hover {
        background-color: #0003;
    }
    .toolbar {
        position: absolute;
        bottom: 0;
        background-color: white;
        border: 1px solid #aaa;
        border-bottom: none;
        border-radius: 5px 5px 0 0;
        display: flex;
        filter: drop-shadow(0 0 4px #0002);
    }
    .toolbar .separator {
        width: 1px;
        background-color: #aaa;
    }
</style>
