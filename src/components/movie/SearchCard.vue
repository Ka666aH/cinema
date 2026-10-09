<script setup lang="ts">
import type { MovieDraft } from '@/types/Movie'
import Poster from './Poster.vue'
import Caption from './Caption.vue'
import Genre from './Genre.vue'

defineProps<{ draft: MovieDraft }>()
const emit = defineEmits<{ add: [] }>()
</script>

<template>
    <article class="card">
        <figure class="card__title-poster-wrap">
            <div class="card__poster-wrap">
                <Poster :title="draft.title" :year="draft.year" :poster-u-r-l="draft.posterURL" />
            </div>
            <figcaption>
                <Caption :title="draft.title" :year="draft.year" />
            </figcaption>
        </figure>
        <Genre :genre="draft.genre" />
        <BaseButton @click="emit('add')">Add to list</BaseButton>
    </article>
</template>

<style scoped>
@import '@/assets/styles/card.css';
</style>