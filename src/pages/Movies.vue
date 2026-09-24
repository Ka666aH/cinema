<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import type { Movie } from '@/types/Movie';
import type { MovieRating } from '@/types/MovieRating';
import type { MovieStatus } from '@/types/MovieStatus';
import { ref } from 'vue';

const movies = ref<Movie[]>(
    [
        {
            id: '1',
            title: 'Stay',
            year: 2005,
            genre: 'Mistery',
            status: 'watched',
            rating: 9
        },
        {
            id: '2',
            title: 'Fight Club',
            year: 2000,
            genre: 'Action',
            status: 'planned',
            rating: null
        }
    ]
)

const setRating = (movie: Movie, newRating: MovieRating) => movie.rating = newRating;
const setStatus = (movie: Movie, newStatus: MovieStatus) => movie.status = newStatus;
</script>

<template>
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie"
        @set-rating="(newRating) => setRating(movie, newRating)"
        @set-status="(newStatus) => setStatus(movie, newStatus)" />
</template>

<style scoped></style>