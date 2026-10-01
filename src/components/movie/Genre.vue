<script setup lang="ts">
const props = defineProps<{
    genre: string
}>()
</script>

<template>
    <div class="genre">{{ genre }}</div>
</template>

<style scoped>
.genre {
    align-self: flex-start;
    background-color: var(--color-card-bg-genre);
    padding: 5px;
    border-radius: 10px;
}
</style>