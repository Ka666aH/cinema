<script setup lang="ts">
import type { MovieDraft } from '@/types/Movie'
import SearchCard from './SearchCard.vue'

defineProps<{
    drafts: MovieDraft[]
}>()

const emit = defineEmits<{
    add: [draft: MovieDraft]
}>()
</script>

<template>
    <TransitionGroup tag="ul" name="list" class="list">
        <li v-for="(draft, i) in drafts" :key="i" class="list-item">
            <SearchCard :draft="draft" @add="emit('add', draft)" />
        </li>
    </TransitionGroup>
</template>

<style scoped>
@import '@/assets/styles/list.css';
</style>