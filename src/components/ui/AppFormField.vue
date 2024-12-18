<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useMounted } from '@vueuse/core';

type Props = {
    isCustomError?: boolean;
    isCustomErrorShown?: boolean;
    teleportTo?: string;
};

const props = withDefaults(defineProps<Props>(), {
    isCustomError: false,
    isCustomErrorShown: false,
    teleportTo: undefined,
});

const slots = useSlots();

const isMounted = useMounted();

const showError = computed(() => {
    if (props.isCustomError) {
        return props.isCustomErrorShown;
    }

    return !!slots['error'] && slots.error()[0]?.children?.length;
});
</script>

<template>
    <div class="flex flex-col">
        <div
            class="flex w-full"
            :class="$slots.action ? 'justify-between' : 'justify-end'"
        >
            <slot name="default" />

            <div v-if="$slots.action" class="ml-2">
                <slot name="action" />
            </div>
        </div>
        <div
            v-if="showError || $slots.footer"
            class="divide-y divide-gray-40"
        />

        <template v-if="$slots.footer">
            <div class="ml-[-1rem] mr-[-1rem] mt-1">
                <span
                    class="relative inline-block text-gray text-body/13 px-4 py-2"
                >
                    <slot name="footer" />
                </span>
            </div>
        </template>

        <div v-if="showError">
            <Teleport
                v-if="isMounted"
                :to="teleportTo"
                :disabled="!teleportTo"
                defer
            >
                <div
                    class="relative text-red text-body/13 bg-red-10 border-l-4 border-red px-4 py-1 w-[calc(100%+2rem)] ml-[-1rem]"
                >
                    <slot name="error" />
                    <span
                        class="absolute w-0 h-0 left-6 top-0 border-l-[5px] border-l-transparent border-b-[5px] border-b-red-10 border-r-[5px] border-r-transparent -translate-y-full"
                    />
                    <div class="w-0 h-0" />
                </div>
            </Teleport>
        </div>
    </div>
</template>
