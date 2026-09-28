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
    transition:
        background-color .25s;
    background-color: var(--color-element-bg-focus);
    /* background-color .25s,
    transform .25s;
    background-color: var(--color-element-bg-focus);
    transform: scale(1.1); */
}
</style>