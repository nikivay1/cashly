<script setup lang="ts">
import { computed, useSlots } from 'vue';

type Props = {
    isPaddingsDisabled?: boolean;
};

withDefaults(defineProps<Props>(), {
    isPaddingsDisabled: false,
});

const showDescription = computed(() => !!slots['description']);

const columnClasses = computed(() => {
    return {
        'field-col': showDescription.value,
    };
});

const slots = useSlots();
</script>
<template>
    <div class="field-row gap-4" :class="isPaddingsDisabled ? '' : 'py-2 px-4'">
        <div :class="columnClasses">
            <div class="text-dark text-body/15-medium">
                <slot name="title" />
            </div>
            <div
                v-if="showDescription && $slots.description"
                class="text-gray-dark text-body/13"
            >
                <slot name="description" />
            </div>
        </div>
        <slot name="right" />
    </div>
</template>
