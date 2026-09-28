<script setup lang="ts">
import { computed, ref } from 'vue';
import MovieCard from './MovieCard.vue';
import type { Movie } from '@/types/Movie.ts';

const emit = defineEmits<{
    addMovie: [movie: Movie]
}>()

const isOpen = defineModel<boolean>({ required: true })

const title = ref<string>('')
const year = ref<string>('')
const genre = ref<string>('')
const posterURL = ref<string>('')

const movie = computed<Movie>(() => ({
    id: 'N',
    posterURL: posterURL.value,
    title: title.value,
    year: Number(year.value),
    genre: genre.value,
    status: 'planned',
    rating: null,
}))

function onSubmit() {
    emit('addMovie', movie.value)
    clear()
}
function clear() {
    title.value = ''
    year.value = ''
    genre.value = ''
    posterURL.value = ''
}
</script>

<template>
    <BaseDialog :open="isOpen" @close="isOpen = false">
        <h2>Movie adding form</h2>
        <div class="window">
            <form class="form" @submit.prevent="onSubmit">
                <div class="form-wrap">
                    <div class="form__fields">
                        <label>Title
                            <BaseInput v-model="title" />
                        </label>
                        <label>Year
                            <BaseInput v-model="year" />
                        </label>
                        <label>Genre
                            <BaseInput v-model="genre" />
                        </label>
                        <label>Poster URL
                            <BaseInput v-model="posterURL" />
                        </label>
                    </div>
                    <div class="preview">
                        <h3 class="preview__header">Movie card preview</h3>
                        <MovieCard class="preview__card" :movie="movie" />
                    </div>
                </div>
                <div class="form__buttons">
                    <BaseButton @click="clear">Clear</BaseButton>
                    <div class="form__confirm-buttons">
                        <BaseButton type="submit">Add</BaseButton>
                        <BaseButton @click="isOpen = false">Cancel</BaseButton>
                    </div>
                </div>
            </form>
        </div>
    </BaseDialog>
</template>

<style scoped>
.window {
    display: flex;
    gap: 20px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-wrap {
    display: flex;
    gap: 20px;
}

.form__fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form__buttons {
    display: flex;
    justify-content: space-between;
}

.form__confirm-buttons {
    display: flex;
    gap: 10px;
}

.preview {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.preview__header {
    margin: 0;
}

.preview__card {
    pointer-events: none;
}
</style>