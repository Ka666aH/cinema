<script setup lang="ts">
import type { Movie } from '@/types/Movie';
import type { MovieRating } from '@/types/MovieRating';
import type { MovieStatus } from '@/types/MovieStatus';
import placeholder from '@/assets/images/posterPlaceholder.png'
import { ref } from 'vue';

const props = defineProps<{
    movie: Movie
}>()
const emit = defineEmits<{
    setRating: [value: MovieRating]
    setStatus: [value: MovieStatus]
}>()

const ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const posterURL = ref(props.movie.posterURL || placeholder)

const onError = () => posterURL.value = placeholder
</script>

<template>
    <article class="card">
        <figure>
            <div class="card__poster-wrap">
                <img class="card__poster" :src="posterURL" :alt="`${movie.title}(${movie.year}) poster`"
                    @error="onError">
            </div>
            <figcaption>
                <span class="card__id">{{ movie.id }}</span>
                <span class="card__title">{{ movie.title }}</span>
                <span class="card__year">{{ movie.year }}</span>
            </figcaption>
        </figure>
        <div class="card__genre">{{ movie.genre }}</div>
        <button class="card__status" :class="{
            'card__status--planned': movie.status === 'planned',
            'card__status--watched': movie.status === 'watched',
        }" @click="emit('setStatus', movie.status === 'planned' ? 'watched' : 'planned')">{{ movie.status }}</button>
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
    min-width: 140px;
    max-width: 280px;
    width: 100%;
    background-color: cadetblue;
    padding: 20px;
    border-radius: 20px;
    gap: 10px;
}

.card__poster-wrap {
    aspect-ratio: 3 / 4;
    width: 100%;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
}

.card__poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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