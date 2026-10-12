<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMovieSearch } from '@/composables/useMovieSearch'
import { useMovieStore } from '@/store/movies'
import Controls from '@/components/movie/search/Controls.vue'
import List from '@/components/movie/search/List.vue'
import type { MovieDraft } from '@/types/Movie'

const { loading, error, data, search } = useMovieSearch()
const movieStore = useMovieStore()

const inList = (draft: MovieDraft) => movieStore.movies.some(m => m.title.toLowerCase() === draft.title.toLowerCase() && m.year === draft.year)
const filtered = computed(() => data.value.filter(m => !inList(m)))

const isQueryEmpty = ref(true)
function onSearch(query: string) {

    isQueryEmpty.value = !query.trim()
    search(query)
}

function onAdd(draft: MovieDraft) {
    movieStore.addMovie(draft)
}
</script>

<template>
    <div class="search-page">
        <Controls @search="onSearch" />
        <p v-if="error" class="state state--error">Network error: {{ error }}</p>
        <p v-else-if="isQueryEmpty" class="state">Start searching</p>
        <p v-else-if="loading" class="state">Loading…</p>
        <p v-else-if="filtered.length === 0" class="state">Nothing found</p>
        <List v-else :drafts="filtered" @add="onAdd" />
    </div>
</template>

<style scoped>
.search-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}

.state {
    text-align: center;
    opacity: .7;
}

.state--error {
    color: var(--color-error);
    opacity: 1;
}
</style>