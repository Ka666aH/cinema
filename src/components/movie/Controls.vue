<script setup lang="ts">
import { ref } from 'vue';
import type { Option } from '@/types/Option.ts';
import type { Movie, SortOrder, RatingFilter, StatusFilter } from '@/types/Movie.ts';
import Form from './Form.vue';

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
    <Form v-model="isFormOpen" @add-movie="(movie) => emit('addMovie', movie)" />
    <section class="controls">
        <BaseButton class="add-button" @click="isFormOpen = true">
            Add movie
        </BaseButton>
        <label class="search-wrap">
            Search
            <BaseInput v-model="search" />
        </label>
        <div class="filter-sort">
            <BaseRadio v-model="statusFilter" name="status" :options="statusOptions" direction="column" />
            <BaseRadio v-model="ratingFilter" name="rating" :options="ratingOptions" direction="column" />
            <label>
                Sort
                <div>
                    <BaseButton @click="toggleSortOrder">{{ sortOrder === 'asc' ? '↑' : '↓' }}</BaseButton>
                    <BaseSelect v-model="sortKey" name="sortOptions" :options="sortOptions" />
                </div>
            </label>
        </div>
    </section>
</template>

<style scoped>
.controls {
    display: grid;
    grid-template-columns: 1fr minmax(300px, auto);
    gap: 20px;
}

.add-button {
    grid-column: 1 / -1;
    font-size: 200%;
}

.search-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.filter-sort {
    display: flex;
    gap: 20px;
}

@media (max-width: 900px) {
    .controls {
        grid-template-columns: 1fr;
    }
}
</style>