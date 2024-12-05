<script setup lang="ts" generic="T extends unknown">
import { ref, toRaw, toValue, watch, computed } from 'vue';
import AppModalOverlay from './AppModalOverlay.vue';

interface Props {
    transparent?: boolean;
    hideHook?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    transparent: false,
    hideHook: false,
});

const show = defineModel<boolean>('show');

const modalData = defineModel<T>('modalData');

const localData = ref<T>();

watch(
    () => modalData,
    (newVal) => {
        if (toValue(newVal)) {
            localData.value = Object.assign({}, toRaw(toValue(newVal)));
        }
    },
    { deep: true, immediate: true }
);

const onSave = () => {
    if (localData.value && modalData.value) {
        Object.assign(modalData.value, toRaw(toValue(localData)));
    }

    show.value = false;
};

const onClose = () => {
    localData.value = Object.assign({}, toRaw(toValue(modalData)));
    show.value = false;
    top.value = 0;
};

const onShow = () => {
    show.value = true;
};

const onClear = (defaultValue: T) => {
    if (modalData.value) {
        Object.assign(modalData.value, toRaw(toValue(defaultValue)));
        localData.value = Object.assign({}, toRaw(toValue(modalData.value)));
    }
};

const container = ref<HTMLElement | null>(null);
const containerHeight = computed(() => container.value?.offsetHeight);
const top = ref(0);

const computedTransitionStyles = computed(() => {
    return {
        transform: `translate3d(0px, ${top.value}px, 0px)`,
    };
});

const handleSwipe = (tuch: any) => {
    console.log(tuch);

    if (tuch.direction === 'down' && tuch.offset.y) {
        const length = Math.abs(tuch.offset.y);
        top.value = length;
    }

    if (tuch.isFinal && containerHeight.value) {
        if (Math.abs(tuch.offset.y) / containerHeight.value >= 0.3) {
            top.value = containerHeight.value || 0;
            onClose();
        } else {
            top.value = 0;
        }
    }
};
</script>

<template>
    <AppModalOverlay
        :show="show || false"
        position="bottom"
        @click-overlay="show = false"
    >
        <div
            ref="container"
            class="card rounded-b-none w-full pt-2 pb-[1.3125rem] max-w-[1024px]"
            :class="{ 'bg-transparent': props.transparent }"
            :style="computedTransitionStyles"
        >
            <div
                v-touch-pan="handleSwipe"
                class="flex relative justify-between text-dark px-4 py-3"
            >
                <div
                    v-if="!hideHook"
                    class="absolute top-0 right-2/4 translate-x-1/2 h-1 w-9 bg-blue-20 rounded"
                />

                <slot
                    name="header"
                    v-bind="{ onSave, onClose, localData, onShow, onClear }"
                />
            </div>
            <slot
                name="default"
                v-bind="{ onSave, onClose, localData, onShow }"
            />
        </div>
    </AppModalOverlay>
</template>
