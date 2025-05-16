import { reactive } from "vue";
import {And, Nand, Or, Not, Connection, FreeNode, Node} from "@/gates.js";

export const store = reactive({
    gates: [
        new And(100, 100),
        new Nand(300, 100),
        new FreeNode(250, 150, [
            new Node(0, 0, false),
            new Node(0, 0, true),
            new Node(0, 0, true),
        ])
    ],
    connections: [
        new Connection([
            {gate: 0, dest: 'out'},
            {gate: 2, dest: 0},
        ]),
        new Connection([
            {gate: 2, dest: 1},
            {gate: 1, dest: 'a'},
        ]),
        new Connection([
            {gate: 2, dest: 2},
            {gate: 1, dest: 'b'},
        ]),
    ]
})