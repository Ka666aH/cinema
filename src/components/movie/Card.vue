<script setup lang="ts">
import { useMovieStore } from '@/store/movies.ts';
import type { Movie, Status as StatusType, Rating as RatingType } from '@/types/Movie';
import Poster from './Poster.vue';
import Caption from './Caption.vue';
import Genre from './Genre.vue';
import Status from './Status.vue';
import Rating from './Rating.vue';
import RemoveButton from './RemoveButton.vue';

const props = defineProps<{
    movie: Movie
}>()

const movieStore = useMovieStore()
</script>

<template>
    <article class="card">
        <slot name="overlay" />
        <figure class="card__title-poster-wrap">
            <div class="card__poster-wrap">
                <Poster :title="movie.title" :year="movie.year" :poster-u-r-l="movie.posterURL" />
            </div>
            <figcaption>
                <Caption :id="movie.id" :title="movie.title" :year="movie.year" />
            </figcaption>
        </figure>
        <Genre :genre="movie.genre" />
        <Status class="card__status" :status="movie.status"
            @set-status="(value) => movieStore.setStatus(movie.id, value)" />
        <Rating class="card__rating" :status="movie.status" :rating="movie.rating"
            @set-rating="(value) => movieStore.setRating(movie.id, value)" />
        <RemoveButton class="card__remove" @remove-movie="movieStore.removeMovie(movie.id)" />
    </article>
</template>

<style scoped>
@import '@/assets/styles/card.css';

.card__status,
.card__rating,
.card__remove {
    position: relative;
}
</style>