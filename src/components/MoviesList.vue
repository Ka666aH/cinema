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
    <section class="list">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie"
            @set-rating="(value) => emit('setRating', movie.id, value)"
            @set-status="(value) => emit('setStatus', movie.id, value)" />
    </section>
</template>

<style scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;

}
</style>