<script setup lang="ts">
import { useSlots } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
    title?: string;
    customBackAction?: () => void;
    isIconVisible?: boolean;
}

const slots = useSlots();
const router = useRouter();

const props = withDefaults(defineProps<Props>(), {
    title: '',
    customBackAction: undefined,
    isIconVisible: true,
});

const backAction = () => {
    router.back();
};
</script>

<template>
    <header
        class="flex flex-col px-2 pt-2 pb-4 gap-2 w-full z-30 touch-manipulation"
    >
        <div class="flex flex-row gap-2 justify-between items-center">
            <div v-if="isIconVisible" class="grow-0 basis-0 py-2 px-2">
                <slot name="button">
                    <button
                        class="flex items-center"
                        @click="
                            props.customBackAction
                                ? props.customBackAction()
                                : backAction()
                        "
                    >
                        <AppIcon class="" name="arrow-back" />
                    </button>
                </slot>
            </div>

            <div class="flex-1">
                <h1
                    class="text-white text-h1/semibold"
                    :class="{ 'pl-2': !isIconVisible }"
                >
                    <slot name="title">
                        {{ props.title || '' }}
                    </slot>
                </h1>
            </div>

            <div
                v-if="$slots.icon"
                class="flex items-center grow-0 basis-0 py-2"
            >
                <slot name="icon" />
            </div>
        </div>

        <div v-if="!!slots.description" class="text-white text-body/15-medium">
            <slot name="description" />
        </div>
    </header>
</template>
