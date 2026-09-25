<script setup lang="ts">

</script>

<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    border: solid 1px black;
    border-radius: 10px;
    background-color: #467;
    cursor: pointer;
    color: white;
}

button:hover {
    transition: 
    background-color .25s,
    transform .25s;
    background-color: #355;
    transform: scale(1.1);
}
</style>