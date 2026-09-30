<script setup lang="ts">
import type { Movie, Status } from '@/types/Movie';

const props = defineProps<{
    movie: Movie
}>()
const emit = defineEmits<{
    setStatus: [value: Status]
}>()
</script>

<template>
    <button class="card__status" :class="{
        'card__status--planned': movie.status === 'planned',
        'card__status--watched': movie.status === 'watched',
    }" @click="emit('setStatus', movie.status === 'planned' ? 'watched' : 'planned')">{{ movie.status }}</button>
</template>

<style scoped>
.card__status {
    border: solid 1px black;
    cursor: pointer;
    align-self: flex-start;
    padding: 5px;
    border-radius: 10px;
    text-transform: capitalize;
}

.card__status--planned {
    background-color: var(--color-card-status-planned);
}

.card__status--watched {
    background-color: var(--color-card-status-watched);
}

.card__status:hover {
    transition: background-color .5s;
}

.card__status--planned:hover {
    background-color: var(--color-card-status-watched);
}

.card__status--watched:hover {
    background-color: var(--color-card-status-planned);
}
</style>