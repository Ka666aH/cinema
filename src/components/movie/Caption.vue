<script setup lang="ts">
import type { Movie } from '@/types/Movie';

const props = defineProps<{
    movie: Movie
}>()
</script>

<template>
    <span class="card__id">{{ movie.id }}</span>
    <span class="card__title">{{ movie.title }}</span>
    <span class="card__year">{{ movie.year }}</span>
</template>

<style scoped>
.card__id {
    color: var(--color-card-id);
    margin-right: 10px;
}

.card__id::before {
    content: '#';
}

.card__title {
    font-size: large;
    font-weight: bold;
}

.card__year::before {
    content: '(';
}

.card__year::after {
    content: ')';
}
</style>