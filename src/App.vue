<script setup>
import Gate from "@/components/Gate.vue";

import { store } from "@/store.js";
import Connection from "@/components/Connection.vue";
</script>

<template>
    <svg class="workspace">
        <g v-for="(connection, id) in store.connections">
            <Connection :id="id" />
        </g>
        <g v-for="(gate, id) in store.gates">
            <Gate :id="id" />
        </g>
    </svg>
    <div class="toolbar">
        <button>NOT</button>
        <button>AND</button>
        <button>OR</button>
        <button>XOR</button>
        <button>NAND</button>
        <button>NOR</button>
    </div>
</template>

<style scoped>
    .workspace {
        background-color: white;
        width: 1800px;
        height: 800px;
    }
</style>
