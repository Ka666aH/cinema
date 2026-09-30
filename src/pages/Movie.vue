<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { movies, removeMovie, setStatus, setRating } from '@/store/movies';
import type { Rating, Status } from '@/types/Movie';
import Card from '@/components/movie/Card.vue';

const route = useRoute()
const router = useRouter()

const movie = computed(() =>
    movies.value.find(m => m.id === route.params.id)
)

function onSetStatus(value: Status) {
    if (!movie.value) return
    setStatus(movie.value.id, value)
}

function onSetRating(value: Rating) {
    if (!movie.value) return
    setRating(movie.value.id, value)
}
function onRemove() {
    if (!movie.value) return
    removeMovie(movie.value.id)
    router.push('/movies')
}
</script>

<template>
    <RouterLink to="/movies">← Back to list</RouterLink>
    <div v-if="!movie" class="not-found">
        <h2>Movie is not found</h2>
    </div>
    <Card v-else :movie="movie" @set-status="onSetStatus" @set-rating="onSetRating" @remove-movie="onRemove" />
</template>

<style scoped></style>