<script setup lang="ts">
defineProps({
    bgClass: {
        type: String,
        default: 'bg-gray-40',
    },
});
</script>

<template>
    <div class="ui-divider h-[1px] w-full" :class="[bgClass]" />
</template>

<style scoped></style>
