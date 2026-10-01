<script setup lang="ts">
import type { Rating, Status } from '@/types/Movie';

const props = defineProps<{
    status: Status
    rating: Rating
}>()

const emit = defineEmits<{
    setRating: [value: Rating]
}>()

const ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
    <div class="rating" v-if="status === 'watched'">
        <div>
            <button class="star" v-for="r in ratings" :key="r" type="button"
                :class="{ 'star--active': r <= (rating ?? 0) }" @click="emit('setRating', r)">
                ★
            </button>
        </div>
        <BaseButton v-if="rating !== null" @click="emit('setRating', null)">Clear</BaseButton>
    </div>
</template>

<style scoped>
.rating {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 20px;
}

.star {
    border: none;
    padding: 0px;
    background-color: transparent;
    font-size: 150%;
    color: var(--color-card-star);
    cursor: pointer;
}

.star:hover {
    transition: transform .25s;
    transform: scale(1.25);
}

.star--active {
    color: var(--color-card-star-active);
}
</style>