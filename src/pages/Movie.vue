<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/store/movies'
import Poster from '@/components/movie/Poster.vue'
import Caption from '@/components/movie/Caption.vue'
import Genre from '@/components/movie/Genre.vue'
import Status from '@/components/movie/Status.vue'
import Rating from '@/components/movie/Rating.vue'
import RemoveButton from '@/components/movie/RemoveButton.vue'
import type { Rating as RatingType, Status as StatusType } from '@/types/Movie'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const movie = computed(() => movieStore.getMovie(route.params.id as string))

function onSetStatus(value: StatusType) {
    if (!movie.value) return
    movieStore.setStatus(movie.value.id, value)
}
function onSetRating(value: RatingType) {
    if (!movie.value) return
    movieStore.setRating(movie.value.id, value)
}
function onRemove() {
    if (!movie.value) return
    movieStore.removeMovie(movie.value.id)
    router.push('/movies')
}
</script>

<template>
    <div class="page">
        <RouterLink to="/movies" class="page__back">← Back to list</RouterLink>

        <div v-if="!movie" class="not-found">
            <h2>Movie is not found</h2>
        </div>

        <article v-else class="movie">
            <div class="movie__poster">
                <Poster :title="movie.title" :year="movie.year" :poster-u-r-l="movie.posterURL" />
            </div>

            <div class="movie__info">
                <Caption :id="movie.id" :title="movie.title" :year="movie.year" />
                <Genre :genre="movie.genre" />

                <div class="movie__actions">
                    <Status :status="movie.status" @set-status="onSetStatus" />
                    <Rating :status="movie.status" :rating="movie.rating" @set-rating="onSetRating" />
                </div>

                <RemoveButton class="movie__remove" @remove-movie="onRemove" />
            </div>
        </article>
    </div>
</template>

<style scoped>
.page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
}

.page__back {
    display: inline-block;
    margin-bottom: 20px;
    color: inherit;
    text-decoration: none;
    opacity: .7;
}

.page__back:hover {
    opacity: 1;
}

.movie {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 40px;
    padding: 30px;
    background-color: var(--color-card-bg);
    border-radius: 20px;
}

.movie__poster {
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: 16px;
}

.movie__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-size: 2rem;
}

.movie__actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
}

.movie__remove {
    margin-top: auto;
}

@media (max-width: 720px) {
    .movie {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
    }

    .movie__poster {
        max-width: 280px;
        margin: 0 auto;
    }

    .movie__info {
        align-items: center;
    }

    .movie__actions {
        align-items: center;
    }
}
</style>