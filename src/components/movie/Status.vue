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
    <button class="status" :class="{
        'status--planned': movie.status === 'planned',
        'status--watched': movie.status === 'watched',
    }" @click="emit('setStatus', movie.status === 'planned' ? 'watched' : 'planned')">{{ movie.status }}</button>
</template>

<style scoped>
.status {
    border: solid 1px black;
    cursor: pointer;
    align-self: flex-start;
    padding: 5px;
    border-radius: 10px;
    text-transform: capitalize;
}

.status--planned {
    background-color: var(--color-card-status-planned);
}

.status--watched {
    background-color: var(--color-card-status-watched);
}

.status:hover {
    transition: background-color .5s;
}

.status--planned:hover {
    background-color: var(--color-card-status-watched);
}

.status--watched:hover {
    background-color: var(--color-card-status-planned);
}
</style>