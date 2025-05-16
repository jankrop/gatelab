import { reactive } from "vue";
import {And, Nand, Or, Not, Connection} from "@/gates.js";

export const store = reactive({
    gates: [
        new And(100, 100),
        new Nand(300, 100),
        new Not(500, 500),
    ],
    connections: [
        new Connection([
            {gate: 0, dest: 'out'},
            {gate: 1, dest: 'a'},
        ]),
    ]
})