<script setup lang="ts">
import type { Movie, Rating } from '@/types/Movie';

const props = defineProps<{
    movie: Movie
}>()

const emit = defineEmits<{
    setRating: [value: Rating]
}>()

const ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
    <div class="card__rating" v-if="movie.status === 'watched'">
        <div class="card__stars">
            <button class="card__star" v-for="rating in ratings" :key="rating" type="button"
                :class="{ 'card__star--active': rating <= (movie.rating ?? 0) }" @click="emit('setRating', rating)">
                ★
            </button>
        </div>
        <BaseButton v-if="movie.rating !== null" @click="emit('setRating', null)">Clear</BaseButton>
    </div>
</template>

<style scoped>
.card__rating {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 20px;
}

.card__star {
    border: none;
    padding: 0px;
    background-color: transparent;
    font-size: 150%;
    color: var(--color-card-star);
    cursor: pointer;
}

.card__star:hover {
    transition: transform .25s;
    transform: scale(1.25);
}

.card__star--active {
    color: var(--color-card-star-active);
}
</style>