<script setup lang="ts">
import type { RatingFilter, StatusFilter } from '@/types/Filters';
import type { Option } from '@/types/Option.ts';
import type { SortOrder } from '@/types/SortOrder';

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
</script>

<template>
    <section class="controls">
        <div>
            <label>
                Search
                <BaseInput v-model="search" />
            </label>
            <label>
                Show
                <BaseRadio v-model="statusFilter" name="status" :options="statusOptions" />
                <BaseRadio v-model="ratingFilter" name="rating" :options="ratingOptions" />
            </label>
            <label>
                Sort by
                <BaseSelect v-model="sortKey" :options="sortOptions" />
                <BaseButton @click="toggleSortOrder">{{ sortOrder === 'asc' ? '↑' : '↓' }}</BaseButton>
            </label>
        </div>
    </section>
</template>

<style scoped></style>