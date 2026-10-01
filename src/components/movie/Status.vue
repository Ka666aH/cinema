<script setup lang="ts">
import type { Status } from '@/types/Movie';

const props = defineProps<{
    status: Status
}>()
const emit = defineEmits<{
    setStatus: [value: Status]
}>()
</script>

<template>
    <button class="status" :class="{
        'status--planned': status === 'planned',
        'status--watched': status === 'watched',
    }" @click="emit('setStatus', status === 'planned' ? 'watched' : 'planned')">{{ status }}</button>
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