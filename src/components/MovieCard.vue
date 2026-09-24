<script setup lang="ts">
import type { Movie } from '@/types/Movie';
import type { MovieRating } from '@/types/MovieRating';
import type { MovieStatus } from '@/types/MovieStatus';

const props = defineProps<{
    movie: Movie
}>()

const emit = defineEmits<{
    setRating: [newRating: MovieRating]
    setStatus: [newStatus: MovieStatus]
}>()

const ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
    <article class="card">
        <div>
            <span class="card__id">{{ movie.id }}</span>
            <span class="card__title">{{ movie.title }}</span>
            <span class="card__year">{{ movie.year }}</span>
        </div>
        <div class="card__genre">{{ movie.genre }}</div>
        <button class="card__status" :class="{
            'card__status--planned': movie.status === 'planned',
            'card__status--watched': movie.status === 'watched',
        }" @click="emit('setStatus', movie.status === 'planned' ? 'watched' : 'planned')"
        >{{ movie.status }}</button>
        <div class="card__rating" v-if="movie.status === 'watched'">
            <button class="card__star" v-for="rating in ratings" :key="rating" type="button"
                :class="{ 'card__star--active': rating <= (movie.rating ?? 0) }" @click="emit('setRating', rating)">
                ★
            </button>
            <BaseButton class="card__clear-rating" v-if="movie.rating !== null" @click="emit('setRating', null)">
                Clear
            </BaseButton>
        </div>
    </article>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    background-color: cadetblue;
    padding: 20px;
    border-radius: 20px;
    gap: 10px;
}

.card__id {
    color: lightgray;
    margin-right: 10px;
}

.card__id::before {
    content: '#';
}

.card__title {
    font-size: large;
    font-weight: bold;
}

.card__year::before {
    content: '(';
}

.card__year::after {
    content: ')';
}

.card__genre {
    align-self: flex-start;
    background-color: #84dadd;
    padding: 5px;
    border-radius: 10px;
}

.card__status {
    border: solid 1px black;
    cursor: pointer;
    align-self: flex-start;
    padding: 5px;
    border-radius: 10px;
    text-transform: capitalize;
}

.card__status--planned {
    background-color: lightgray;
}

.card__status--watched {
    background-color: green;
}

.card__status:hover {
    transition: background-color .5s;
}

.card__status--planned:hover {
    background-color: green;
}

.card__status--watched:hover {
    background-color: lightgray;
}

.card__rating {
    display: flex;
    flex-direction: row;
}

.card__star {
    border: none;
    padding: 0px;
    background-color: transparent;
    font-size: 150%;
    color: #84dadd;
    transition: none;
    cursor: pointer;
}

.card__star:hover {
    transition: transform .25s;
    transform: scale(1.25);
}

.card__star--active {
    color: gold;
}

.card__clear-rating {
    margin-left: 10px;
}
</style>