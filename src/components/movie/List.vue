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
.list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 330px));
    justify-content: center;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.list-item {
    display: flex;
}

.list-enter-active {
    transition: opacity 1s ease, transform 1s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.list-leave-active {
    transition: opacity .5s ease, transform .5s ease;
}

.list-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.list-move {
    transition: transform 0.8s ease;
}

.card-overlay {
    position: absolute;
    inset: 0;
}
</style>