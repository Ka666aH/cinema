<script setup lang="ts">
const emit = defineEmits<{
    removeMovie: []
}>()
</script>

<template>
    <BaseButton class="card__remove-button" @click="emit('removeMovie')">Remove movie</BaseButton>
</template>

<style scoped>
.card__remove-button {
    margin-top: auto;
}
</style>