<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMovieStore } from '@/store/movies';
import type { Movie, Rating, Status, SortOrder, RatingFilter, StatusFilter } from '@/types/Movie';
import Controls from '@/components/movie/Controls.vue';
import Stats from '@/components/movie/Stats.vue';
import List from '@/components/movie/List.vue';

const movieStore = useMovieStore()

const sortKey = ref('id')
const sortOrder = ref<SortOrder>('asc')
const sorted = computed(() => {
    const dir = sortOrder.value === 'asc' ? 1 : -1

    return [...movieStore.movies].sort((a, b) => {
        switch (sortKey.value) {
            case 'id': return a.id.localeCompare(b.id) * dir
            case 'title': return a.title.localeCompare(b.title) * dir
            case 'date': return (a.year - b.year) * dir
            case 'rating': {
                if (a.rating === null && b.rating === null) return 0
                if (a.rating === null) return 1
                if (b.rating === null) return -1
                return (a.rating - b.rating) * dir
            }
            default: { return 0 }
        }
    })
})

const statusFilter = ref<StatusFilter>('all')
const ratingFilter = ref<RatingFilter>('all')
const filtered = computed(() =>
    sorted.value.filter(m => {
        if (statusFilter.value !== 'all' && statusFilter.value !== m.status) return false
        if (ratingFilter.value === 'rated' && m.rating === null) return false
        if (ratingFilter.value === 'unrated' && m.rating !== null) return false
        return true
    })
)

const search = ref('')
const searched = computed(() => filtered.value.filter(m => m.title.toLowerCase().includes(search.value.trim().toLowerCase())))
</script>

<template>
    <div class="movie-wrap">
        <div class="controls-stats-wrap">
            <Controls class="controls" v-model:sortKey="sortKey" v-model:sortOrder="sortOrder"
                v-model:statusFilter="statusFilter" v-model:ratingFilter="ratingFilter" v-model:search="search"
                @add-movie="movieStore.addMovie" />
            <Stats class="stats" />
        </div>
        <List :movies="searched" />
    </div>
</template>

<style scoped>
.movie-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.controls-stats-wrap {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: "controls stats";
    gap: 20px;
}

.controls {
    grid-area: controls;
}

.stats {
    grid-area: stats;
}

@media (max-width: 900px) {
    .controls-stats-wrap {
        grid-template-columns: 1fr;
        grid-template-areas:
            "stats"
            "controls";
    }
}
</style>