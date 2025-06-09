<script setup>
    defineProps({
        x: Number,
        y: Number,
    })
</script>

<template>
    <g :transform="'translate(' + x + ',' + y + ')'">
        <path
            style="fill:#bbbbbb;stroke:#bbbbbb;stroke-width:10;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none"
            d="m 10,5 c 8.333333,11.666667 16.6665,23.3331 16.6665,35 0,11.6669 -8.333167,23.333333 -16.6665,35 16.666667,0 33.333334,0 47.500117,-5.83345 C 71.6669,63.3331 83.333333,51.666667 95,40 83.333333,28.333333 71.666667,16.666667 57.499833,10.833334 43.333,5 26.666667,5 10,5 Z"
            id="path15"
            transform="translate(5)" />
        <path
            style="fill:none;stroke:#bbbbbb;stroke-width:10;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none"
            d="M -20,5 C -9.9999998,16.666667 -2e-4,28.3331 -2e-4,40 -2e-4,51.6669 -9.9999998,63.333333 -20,75"
            id="path18"
            transform="translate(15.0002)" />
    </g>
</template>