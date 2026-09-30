<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { movies, removeMovie } from '@/store/movies';
import MovieCard from '@/components/MovieCard.vue';

const route = useRoute()
const router = useRouter()

const movie = computed(() =>
    movies.value.find(m => m.id === route.params.id)
)

function onRemove() {
    if (!movie.value) return
    removeMovie(movie.value.id)
    router.push('/movies')
}
</script>

<template>
    <div v-if="!movie" class="not-found">
        <p>Movie is not found</p>
        <RouterLink to="/movies">← Back to list</RouterLink>
    </div>
</template>

<style scoped></style>