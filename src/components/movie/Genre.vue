<script setup lang="ts">
import type { Movie } from '@/types/Movie';

const props = defineProps<{
    movie: Movie
}>()
</script>

<template>
    <div class="card__genre">{{ movie.genre }}</div>
</template>

<style scoped>
.card__genre {
    align-self: flex-start;
    background-color: var(--color-card-bg-genre);
    padding: 5px;
    border-radius: 10px;
}
</style>