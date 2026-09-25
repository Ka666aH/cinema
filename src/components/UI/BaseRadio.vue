<script setup lang="ts">
import type { Option } from '@/types/Option';

const model = defineModel<string>()

defineProps<{ name: string, options: Option[] }>()
</script>

<template>
    <label v-for="option in options" :key="option.key">
        <input type="radio" :name="name" :value="option.key" v-model="model">
        <span>{{ option.value }}</span>
    </label>
</template>

<style scoped></style>