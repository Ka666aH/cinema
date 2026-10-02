<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMovieStore } from '@/store/movies.ts';
import type { Movie } from '@/types/Movie.ts';
import Card from './Card.vue';

const movieStore = useMovieStore()

const isOpen = defineModel<boolean>({ required: true })
const title = ref<string>('')
const year = ref<string>('')
const genre = ref<string>('')
const posterURL = ref<string>('')

const movie = computed<Movie>(() => ({
    id: movieStore.nextId.toString(),
    posterURL: posterURL.value,
    title: title.value,
    year: Number(year.value),
    genre: genre.value,
    status: 'planned',
    rating: null,
}))

function onSubmit() {
    movieStore.addMovie(movie.value)
    clear()
}
function clear() {
    title.value = ''
    year.value = ''
    genre.value = ''
    posterURL.value = ''
}

const validationErrors = computed(() => {
    const e: Record<string, string> = {}
    const y: number = Number(year.value)

    if (!title.value.trim()) e.title = 'Title required'
    if (!year.value.trim()) e.year = 'Year required'
    else if (isNaN(y)) e.year = 'Year must be a number'
    else if (y < 1895 || y > 2030) e.year = 'Year must be in a range between 1895 and 2030'
    if (!genre.value.trim()) e.genre = 'Genre required'

    return e
})

const isValid = computed(() => Object.keys(validationErrors.value).length === 0)
</script>

<template>
    <BaseDialog class="dialog" :open="isOpen" @close="isOpen = false">
        <h2 class="header">Movie adding form</h2>
        <form class="form" @submit.prevent="onSubmit">
            <div class="form__wrap">
                <div class="form__data">
                    <div class="form__fields">
                        <label for="titleInput">Title</label>
                        <BaseInput id="titleInput" v-model="title" />
                        <label for="yearInput">Year</label>
                        <BaseInput id="yearInput" v-model="year" />
                        <label for="genreInput">Genre</label>
                        <BaseInput id="genreInput" v-model="genre" />
                        <label for="posterURLInput">Poster URL</label>
                        <BaseInput id="posterURLInput" v-model="posterURL" />
                    </div>
                    <ul class="form__errors" v-if="!isValid">
                        <li class="form__error" v-for="(msg, field) in validationErrors" :key="field">{{ msg }}</li>
                    </ul>
                </div>
                <Card class="form__preview" :movie="movie" inert />
            </div>
            <div class="form__buttons">
                <BaseButton @click="clear">Clear</BaseButton>
                <div class="form__confirm-buttons">
                    <BaseButton type="submit" class="form__add-button" :disabled="!isValid">Add</BaseButton>
                    <BaseButton @click="isOpen = false">Cancel</BaseButton>
                </div>
            </div>
        </form>
    </BaseDialog>
</template>

<style scoped>
.dialog {
    background-color: var(--color-bg);
}

.header {
    margin-top: 0;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
}

.form__wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form__data {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form__fields {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px 12px;
    align-items: center;
}

.form__errors {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.form__error {
    color: var(--color-error);
    font-weight: bold;
}

.form__preview {
    flex: 0 0 auto;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
}

.form__buttons {
    display: flex;
    justify-content: space-between;
}

.form__confirm-buttons {
    display: flex;
    gap: 10px;
}

@media (orientation: landscape) and (min-width: 700px) {
    .form__wrap {
        flex-direction: row;
        align-items: flex-start;
    }

    .preview {
        margin: 0;
    }
}
</style>