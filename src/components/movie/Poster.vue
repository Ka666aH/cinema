<script setup lang="ts">
import type { Movie } from '@/types/Movie';
import { computed, ref, watch } from 'vue'
import placeholder from '@/assets/images/posterPlaceholder.png'

const props = defineProps<{
    movie: Movie
}>()

const isError = ref(false)
const onError = () => { isError.value = true }
const posterURL = computed(() => isError.value || !props.movie.posterURL ? placeholder : props.movie.posterURL)
watch(() => props.movie.posterURL, () => isError.value = false)
</script>

<template>
    <img class="poster" :src="posterURL" :alt="`${movie.title}(${movie.year}) poster`" @error="onError">
</template>

<style scoped>
.poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
</style>