<script setup lang="ts">
import type { Option } from '@/types/Option';

const key = defineModel<string>({ required: true })

defineProps<{
    name: string,
    options: Option[],
    direction?: 'row' | 'column'
}>()
</script>

<template>
    <div class="radio-wrap" :class="{ 'radio-wrap--column': direction === 'column' }">
        <label class="legend">{{ name }}</label>
        <label v-for="option in options" :key="option.key">
            <input type="radio" :name="name" :value="option.key" v-model="key">
            <span>{{ option.value }}</span>
        </label>
    </div>
</template>

<style scoped>
.radio-wrap {
    display: flex;
}

.radio-wrap--column {
    flex-direction: column;
}

.legend {
    text-transform: capitalize;
}
</style>