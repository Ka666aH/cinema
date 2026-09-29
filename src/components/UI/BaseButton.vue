<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit' | 'reset' }>(), {
    type: 'button',
})
</script>

<template>
    <button :type="type">
        <slot />
    </button>
</template>

<style scoped>
button {
    border: solid 1px var(--color-button-border);
    padding: 10px;
    border-radius: 10px;
    background-color: var(--color-element-bg);
    cursor: pointer;
    color: var(--color-element-text);
}

button:hover {
    transition: background-color .25s;
    background-color: var(--color-element-bg-focus);
}

button:disabled {
    background-color: var(--color-element-bg-disabled);
    cursor: not-allowed;
}
</style>