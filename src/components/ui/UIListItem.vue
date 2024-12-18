<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue';

defineProps<{
    icon?: string;
    title?: string;
}>();

const emit = defineEmits<{ (e: 'click-append'): void; (e: 'click'): void }>();
</script>

<template>
    <div
        class="w-full bg-white flex flex-row gap-4 px-4 py-2 items-center"
        @click="emit('click')"
    >
        <div class="shrink-0">
            <slot name="prepend">
                <AppIcon v-if="icon" :name="icon" class="text-blue" />
            </slot>
        </div>
        <slot name="default">
            <div class="w-full text-gray text-body/15-medium">
                <slot name="title">{{ title }}</slot>
            </div>
        </slot>
        <div class="shrink-0">
            <slot name="append">
                <div @click.stop="emit('click-append')">
                    <AppIcon name="arrow-right" />
                </div>
            </slot>
        </div>
    </div>
</template>

<style scoped></style>
