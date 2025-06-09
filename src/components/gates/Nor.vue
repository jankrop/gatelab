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
            d="M -10,5 C -1.6666667,16.666667 6.6666665,28.333333 6.6665833,40.000117 6.6665,51.6669 -1.6666667,63.333333 -10,75 10.666667,75 31.33292,75 47.49991,69.16655 63.6669,63.3331 75.333333,51.666667 87,40 75.333333,28.333333 63.6669,16.6669 47.49991,10.83345 31.33292,5 10.666667,5 -10,5 Z"
            id="path15"
            transform="translate(5)" />
    </g>
    <circle r="8" :cx="x + 92" :cy="y + 40" stroke="#bbb" stroke-width="2" fill="#fff" />
</template>