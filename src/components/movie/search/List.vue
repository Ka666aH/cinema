<script setup lang="ts">
import type { MovieDraft } from '@/types/Movie'
import Card from './Card.vue'

defineProps<{
    drafts: MovieDraft[]
}>()

const emit = defineEmits<{
    add: [draft: MovieDraft]
}>()
</script>

<template>
    <TransitionGroup tag="ul" name="list" class="list">
        <li v-for="draft in drafts" :key="`${draft.title}-${draft.year}`" class="list-item">
            <Card :draft="draft" @add="emit('add', draft)" />
        </li>
    </TransitionGroup>
</template>

<style scoped>
@import '@/assets/styles/list.css';
</style>