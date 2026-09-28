<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const dialog = ref<HTMLDialogElement | null>(null)

watch(() => props.open, (isOpen) => {
    if (!dialog.value) return
    if (isOpen) dialog.value.showModal()
    else dialog.value.close()
})

function onBackdropClick(e: MouseEvent) {
    if (e.target === dialog.value) emit('close')
}
</script>

<template>
    <dialog ref="dialog" @close="emit('close')" @click="onBackdropClick">
        <div>
            <slot />
        </div>
    </dialog>
</template>

<style scoped>
dialog {
    border: none;
    border-radius: 12px;
    padding: 0;
    max-width: 500px;
    width: 90%;
}

dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
}

div {
    padding: 20px;
}
</style>