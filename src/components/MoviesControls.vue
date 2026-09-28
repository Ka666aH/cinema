<script setup lang="ts">
import type { RatingFilter, StatusFilter } from '@/types/Filters';
import type { Option } from '@/types/Option.ts';
import type { SortOrder } from '@/types/SortOrder';
import MovieForm from './MovieForm.vue';
import { ref } from 'vue';
import type { Movie } from '@/types/Movie.ts';

const emit = defineEmits<{
    addMovie: [movie: Movie]
}>()

const sortKey = defineModel<string>('sortKey', { required: true })
const sortOrder = defineModel<SortOrder>('sortOrder', { required: true })
const statusFilter = defineModel<StatusFilter>('statusFilter', { required: true })
const ratingFilter = defineModel<RatingFilter>('ratingFilter', { required: true })
const search = defineModel<string>('search', { required: true })

const sortOptions = [
    { key: 'number', value: 'Number' },
    { key: 'title', value: 'Title' },
    { key: 'date', value: 'Release date' },
    { key: 'rating', value: 'Rating' },
]

const statusOptions: Option[] = [
    { key: 'all', value: 'All' },
    { key: 'planned', value: 'Planned' },
    { key: 'watched', value: 'Watched' },
]

const ratingOptions: Option[] = [
    { key: 'all', value: 'All' },
    { key: 'rated', value: 'Rated' },
    { key: 'unrated', value: 'Unrated' },
]

const toggleSortOrder = () => sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'

const isFormOpen = ref(false)
</script>

<template>
    <section class="controls">
        <BaseButton @click="isFormOpen = true">
            <h2>Add movie</h2>
        </BaseButton>
        <MovieForm v-model="isFormOpen" @add-movie="(movie) => emit('addMovie', movie)" />
        <div class="display-controls-wrap">
            <label class="search-wrap">
                Search
                <BaseInput class="search" v-model="search" />
            </label>
            <div class="filter-sort">
                <div class="filters">
                    <BaseRadio v-model="statusFilter" name="status" :options="statusOptions" :direction="'column'" />
                    <BaseRadio v-model="ratingFilter" name="rating" :options="ratingOptions" :direction="'column'" />
                </div>
                <label>
                    Sort
                    <div class="sort-wrap">
                        <BaseButton @click="toggleSortOrder">{{ sortOrder === 'asc' ? '↑' : '↓' }}</BaseButton>
                        <BaseSelect v-model="sortKey" name="sortOptions" :options="sortOptions" />
                    </div>
                </label>
            </div>
        </div>
    </section>
</template>

<style scoped>
.controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.display-controls-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: space-between;
    gap: 20px;
}

.search-wrap {
    flex: 1 1 300px;
    min-width: 300px;
}

.search {
    width: 100%;
}

.filters {
    display: flex;
}

.filter-sort {
    display: flex;
    gap: 20px;
    flex: 0 0 auto;
}

label {
    display: flex;
    flex-direction: column;
}

.sort-wrap {
    display: flex;
}
</style>