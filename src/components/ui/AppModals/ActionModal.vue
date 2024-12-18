<script setup lang="ts" generic="T extends unknown">
import { ref, toRaw, toValue, watch } from 'vue';
import AppModalOverlay from './AppModalOverlay.vue';

const show = defineModel<boolean>('show');

const modalData = defineModel<T>('modalData');

const localData = ref<T>();

watch(
    modalData,
    (val) => {
        localData.value = Object.assign({}, toRaw(toValue(val)));
    },
    { immediate: true }
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
};
</script>
<template>
    <AppModalOverlay
        :show="show || false"
        position="bottom"
        @click-overlay="show = false"
    >
        <div
            class="relative w-full h-svh px-2 pt-[6.75rem] pb-[1.3125rem] flex flex-col gap-2 justify-end max-w-[1024px]"
        >
            <div
                class="flex flex-col bg-white rounded overflow-x-hidden overflow-y-scroll"
            >
                <slot name="default" :local-data="localData" />
            </div>
            <footer class="flex justify-between gap-4 pb-2">
                <slot name="controls" :on-close="onClose" :on-save="onSave" />
            </footer>
        </div>
    </AppModalOverlay>
</template>
