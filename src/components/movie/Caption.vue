<script setup lang="ts">
import type { Movie } from '@/types/Movie'

const props = defineProps<{
    movie: Movie
}>()
</script>

<template>
    <div class="caption">
        <span class="caption__id">{{ movie.id }}</span>
        <span class="caption__title">{{ movie.title }}</span>
        <span class="caption__year">{{ movie.year }}</span>
    </div>
</template>

<style scoped>
.caption {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
}

.caption__id {
    color: var(--color-card-id);
    margin-right: 10px;
}

.caption__id::before {
    content: '#';
}

.caption__title {
    font-size: 120%;
    font-weight: bold;
}

.caption__year {
    font-size: 110%;
    opacity: .7;
}

.caption__year::before {
    content: '(';
}

.caption__year::after {
    content: ')';
}
</style>