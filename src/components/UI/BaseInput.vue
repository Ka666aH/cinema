<script setup lang="ts">
const text = defineModel<string>({ required: true })
</script>

<template>
    <input type="text" v-model="text">
</template>

<style scoped></style>