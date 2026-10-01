<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import placeholder from '@/assets/images/posterPlaceholder.png'

const props = defineProps<{
    title: string
    year: number
    posterURL: string
}>()

const isError = ref(false)
const onError = () => { isError.value = true }
const posterURL = computed(() => isError.value || !props.posterURL ? placeholder : props.posterURL)
watch(() => props.posterURL, () => isError.value = false)
</script>

<template>
    <img class="poster" :src="posterURL" :alt="`${title}(${year}) poster`" @error="onError">
</template>

<style scoped>
.poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
</style>