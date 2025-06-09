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
            d="M -10,5 C -1.6666667,16.666667 6.6666665,28.333333 6.6665833,40.000117 6.6665,51.6669 -1.6666667,63.333333 -10,75 13.333333,75 36.666667,75 54.166783,69.16655 71.6669,63.3331 83.333333,51.666667 95,40 83.333333,28.333333 71.666667,16.666667 54.166434,10.833334 36.6662,5 13.333333,5 -10,5 Z"
            id="path15"
            transform="translate(5)" />
    </g>
</template>