<script setup lang="ts">
import type { Option } from '@/types/Option';

const model = defineModel<string>()
const props = defineProps<{
    options: Option[]
}>()
</script>

<template>
    <select v-model="model">
        <option v-for="option in options" :key="option.key" :value="option.key">
            {{ option.value }}
        </option>
    </select>
</template>

<style scoped>
select {
    color: inherit;
    font: inherit;
    background: inherit;
    border: none;
    appearance: none;
}

select,
::picker(select) {
    appearance: base-select;
}

option {
    background-color: #467;
    color: black;
    padding: 8px 12px;
}

option:hover {
    background-color: #355;
}
</style>