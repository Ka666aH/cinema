<script setup lang="ts">
import type { Movie } from '@/types/Movie';
import MovieCard from '@/components/MovieCard.vue';
import type { MovieRating } from '@/types/MovieRating';
import type { MovieStatus } from '@/types/MovieStatus';

const props = defineProps<{
    movies: Movie[]
}>()

const emit = defineEmits<{
    setRating: [id: Movie['id'], value: MovieRating]
    setStatus: [id: Movie['id'], value: MovieStatus]
}>()

</script>

<template>
    <TransitionGroup tag="ul" name="list" class="list">
        <li v-for="movie in movies" :key="movie.id" class="list-item">
            <MovieCard :movie="movie" @set-rating="(value) => emit('setRating', movie.id, value)"
                @set-status="(value) => emit('setStatus', movie.id, value)" />
        </li>
    </TransitionGroup>
</template>

<style scoped>
.list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
    perspective: 10px;
}

.list-item {
    display: flex;
}

.list-enter-active {
    transition: opacity 1s ease, transform 1s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateZ(-1px);
}

.list-move {
    transition: transform 0.8s ease;
}
</style>