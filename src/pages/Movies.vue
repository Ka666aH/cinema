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
            posterURL: 'https://m.media-amazon.com/images/M/MV5BZTk3ZThjZjgtYjhlMi00YjFlLWFkMjQtOGM0MTQxMGNmMzhjXkEyXkFqcGc@._V1_.jpg',
            title: 'Stay',
            year: 2005,
            genre: 'Mistery',
            status: 'watched',
            rating: 9
        },
        {
            id: '2',
            posterURL: 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
            title: 'Fight Club',
            year: 1999,
            genre: 'Action',
            status: 'planned',
            rating: null
        },
        {
            id: '3',
            posterURL: 'https://m.media-amazon.com/images/M/MV5BM2Y0YmM5MWYtZTYzNi00ZjU5LTlmOGYtZDQ4ODQyMjAzNjQ2XkEyXkFqcGc@._V1_.jpg',
            title: 'The Prestige',
            year: 2006,
            genre: 'Nolan',
            status: 'watched',
            rating: 8
        },
        {
            id: '4',
            posterURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHSoSnuHdECIHnajW_x_xfUadR_fI4lZDe8d8WRgZUA&s',
            title: 'Schindler\'s List',
            year: 1993,
            genre: 'Drama',
            status: 'planned',
            rating: 9
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
    <MoviesList :movies="movies" @set-rating="(id, value) => setRating(id, value)"
        @set-status="(id, value) => setStatus(id, value)" />
</template>

<style scoped></style>