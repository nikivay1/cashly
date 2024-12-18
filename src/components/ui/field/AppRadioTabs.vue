<script setup lang="ts" generic="T, K extends keyof T">
import { computed, ref, getCurrentInstance, toRaw, toValue } from 'vue';

export type IRadioTabsProps<T = unknown, K = never> = {
    options?: T[];
    modelValue: T | null;
    itemContainerClasses: string;
    keyType?: K;
    canUnselect?: boolean;
    disabledOptions?: T[];
};

const props = defineProps<IRadioTabsProps<T, K>>();

const emit = defineEmits<{
    'update:modelValue': [value: T | null];
}>();

const model = computed<T | null>({
    get: () => toRaw(props.modelValue),
    set: (value: T | null) => {
        emit('update:modelValue', value);
    },
});

const instance = getCurrentInstance();

const uid = ref(instance?.uid);

const isActive = (option: T | null) => {
    if (typeof toValue(model) === 'object') {
        return (
            JSON.stringify(toValue(option)) === JSON.stringify(toValue(model))
        );
    } else return toValue(option) === toValue(model);
};

const activeIndex = computed(() => {
    return props.options && model.value
        ? props.options.findIndex((option) => isActive(option))
        : -1;
});

const isActiveIndex = (i: number) => i === activeIndex.value;

const onSelect = (event: Event, option: T) => {
    if (toValue(option) === toValue(model) && props.canUnselect) {
        event.preventDefault();
        event.stopImmediatePropagation();
        model.value = null;
    }
};
</script>

<template>
    <div>
        <label
            v-for="(option, index) in options"
            :key="`${uid}-${
                props.keyType ? option[props.keyType] : ''
            }-${index}`"
            :class="[itemContainerClasses]"
            class="group"
            :for="`${uid}-${
                props.keyType ? option[props.keyType] : ''
            }-${index}`"
            @click.self="onSelect($event, option)"
        >
            <input
                :id="`${uid}-${props.keyType ? option[props.keyType as K] : ''}-${index}`"
                v-model="model"
                class="sr-only peer"
                type="radio"
                :value="toRaw(option)"
            />

            <slot
                :option="option"
                :index="index"
                :active="isActiveIndex(index)"
                :disabled="
                    props.disabledOptions &&
                    props.disabledOptions.includes(option)
                "
            />
        </label>
    </div>
</template>
