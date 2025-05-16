<script setup>
import Gate from "@/components/Gate.vue";

import { store } from "@/store.js";
import Connection from "@/components/Connection.vue";
import FreeNode from "@/components/FreeNode.vue";
import {And, Not, Nand} from "@/gates.js";
import {ref} from "vue";

const mode = ref('edit');
</script>

<template>
    <svg class="workspace">
        <g v-for="(connection, id) in store.connections">
            <Connection :id="id" />
        </g>
        <g v-for="(gate, id) in store.gates">
            <FreeNode :id="id" :mode="mode" v-if="gate.name === 'freenode'" />
            <Gate :id="id" :mode="mode" v-else />
        </g>
    </svg>
    <div class="toolbar">
        <button @click="store.gates.push(new Not(100, 100))">NOT</button>
        <button @click="store.gates.push(new And(100, 100))">AND</button>
        <button>OR</button>
        <button>XOR</button>
        <button @click="store.gates.push(new Nand(100, 100))">NAND</button>
        <button>NOR</button>
        &emsp;
        <button @click="mode = 'run'">Run mode</button>
        <button @click="mode = 'edit'">Edit mode</button>
        &nbsp;
        <span>Current mode: {{ mode }}</span>
    </div>
</template>

<style scoped>
    .workspace {
        background-color: white;
        width: 1800px;
        height: 800px;
    }
</style>
