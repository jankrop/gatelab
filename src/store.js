import { reactive } from "vue";

export const store = reactive({
    gates: [
        {
            type: 'and',
            x: 100,
            y: 100,
            aState: false,
            bState: false,
            outState: false,
        },
        {
            type: 'and',
            x: 300,
            y: 100,
            aState: false,
            bState: false,
            outState: false,
        }
    ],
    connections: [
        {
            nodes: [{type: 'gateOut', id: 0}, {type: 'gateA', id: 1}],
            state: false,
        }
    ]
})