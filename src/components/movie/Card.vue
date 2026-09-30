<script setup lang="ts">
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
const emit = defineEmits<{
    setStatus: [value: StatusType]
    setRating: [value: RatingType]
    removeMovie: []
}>()

</script>

<template>
    <article class="card">
        <figure class="card__title-poster-wrap">
            <div class="card__poster-wrap">
                <Poster :movie="movie" />
            </div>
            <figcaption>
                <Caption :movie="movie" />
            </figcaption>
        </figure>
        <Genre :movie="movie" />
        <Status :movie="movie" @set-status="(value) => emit('setStatus', value)" />
        <Rating :movie="movie" @set-rating="(value) => emit('setRating', value)" />
        <RemoveButton @remove-movie="emit('removeMovie')" />
    </article>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--color-card-bg);
    padding: 20px;
    border-radius: 20px;
    gap: 10px;
}

.card__title-poster-wrap {
    margin: 0;
}

.card__poster-wrap {
    aspect-ratio: 3 / 4;
    width: 100%;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
}
</style>