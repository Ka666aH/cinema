<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{ search: [query: string] }>()

const query = ref('')
let timer: ReturnType<typeof setTimeout> | null = null

watch(query, (q) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => emit('search', q), 400)
})
</script>

<template>
    <section class="search-controls">
        <label class="search-wrap">
            Search
            <BaseInput v-model="query" />
        </label>
    </section>
</template>