import { reactive } from "vue";

export const store = reactive({
    gates: [
        {
            type: 'and',
            x: 100,
            y: 100,
            nodes: {
                a: {
                    state: false,
                    xOffset: 0,
                    yOffset: 20,
                },
                b: {
                    state: false,
                    xOffset: 0,
                    yOffset: 60,
                },
                out: {
                    state: false,
                    xOffset: 100,
                    yOffset: 40,
                },
            }
        },
        {
            type: 'and',
            x: 300,
            y: 100,
            nodes: {
                a: {
                    state: false,
                    xOffset: 0,
                    yOffset: 20,
                },
                b: {
                    state: false,
                    xOffset: 0,
                    yOffset: 60,
                },
                out: {
                    state: false,
                    xOffset: 100,
                    yOffset: 40,
                },
            }
        }
    ],
    connections: [
        {
            nodes: [{gate: 0, dest: 'out'}, {gate: 1, dest: 'a'}],
            state: false,
        }
    ]
})