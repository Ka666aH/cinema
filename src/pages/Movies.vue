<script setup lang="ts">
import MoviesList from '@/components/MoviesList.vue';
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

function setRating(id: Movie['id'], value: MovieRating) {
    const m = movies.value.find(m => m.id === id)
    if (m) m.rating = value
}
function setStatus(id: Movie['id'], value: MovieStatus) {
    const m = movies.value.find(m => m.id === id)
    if (m) m.status = value
}
</script>

<template>
    <MoviesList :movies="movies"
    @set-rating="(id, value) => setRating(id, value)"
    @set-status="(id, value) => setStatus(id, value)"
    />
</template>

<style scoped></style>