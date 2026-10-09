<script setup lang="ts">
import type { Movie, Rating, Status } from '@/types/Movie';
import Card from './Card.vue';

const props = defineProps<{
    movies: Movie[]
}>()

</script>

<template>
    <TransitionGroup tag="ul" name="list" class="list">
        <li v-for="movie in movies" :key="movie.id" class="list-item">
            <Card :movie="movie">
                <template #overlay>
                    <RouterLink class=" card-overlay" :to="`/movies/${movie.id}`" :aria-label="`Open ${movie.title}`" />
                </template>
            </Card>
        </li>
    </TransitionGroup>
</template>

<style scoped>
@import '@/assets/styles/list.css';

.card-overlay {
    position: absolute;
    inset: 0;
}
</style>