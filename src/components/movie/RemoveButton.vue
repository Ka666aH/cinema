<script setup lang="ts">
const emit = defineEmits<{
    removeMovie: []
}>()
</script>

<template>
    <BaseButton class="remove-button" @click="emit('removeMovie')">Remove movie</BaseButton>
</template>

<style scoped>
.remove-button {
    margin-top: auto;
}
</style>