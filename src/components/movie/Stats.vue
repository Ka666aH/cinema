<script setup lang="ts">
import type { Movie } from '@/types/Movie';
import { useMovieStore } from '@/store/movies';
import { computed } from 'vue';

const movieStore = useMovieStore()

const stats = computed(() => {
    const all = movieStore.movies.length

    let planned: number = 0;
    let watched: number = 0;
    let rated: number = 0;
    let unrated: number = 0;
    let totalRating: number = 0;

    for (const m of movieStore.movies) {
        if (m.status === 'planned') planned++
        else watched++
        if (m.rating === null) unrated++
        else {
            rated++
            totalRating += m.rating
        }
    }
    const avgRating = rated === 0 ? 0 : totalRating / rated
    return { all, planned, watched, rated, unrated, avgRating }
})

</script>

<template>
    <fieldset class="stats">
        <legend>Statistics</legend>
        <div>All: {{ stats.all }}</div>
        <div>Planned: {{ stats.planned }}</div>
        <div>Watched: {{ stats.watched }}</div>
        <div>Rated: {{ stats.rated }}</div>
        <div>Unrated: {{ stats.unrated }}</div>
        <div>Average rating: {{ stats.avgRating > 0 ? stats.avgRating.toFixed(2) : '—' }}</div>
    </fieldset>
</template>

<style scoped>
.stats {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
    gap: 4px 16px;
    border-color: var(--color-element-bg-focus);
    border-radius: 10px;
}
</style>