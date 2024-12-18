<script setup lang="ts">
import { computed, useSlots } from 'vue';

const slots = useSlots();
const showLabel = computed(() => !!slots.default);

export interface IPropsInputNum {
    modelValue: number | string;
    disabled?: boolean;
    min?: number;
    max?: number;
    placeholder?: string;
    hidden?: boolean;
    light?: boolean;
}

const props = withDefaults(defineProps<IPropsInputNum>(), {
    disabled: false,
    min: 0,
    max: 9999,
    placeholder: '',
    hidden: false,
    light: false,
});

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
    get: () => props.modelValue?.toString(),
    set: (value) =>
        emit(
            'update:modelValue',
            isNaN(parseInt(value)) ? '' : parseInt(value)
        ),
});

const inputStyle = computed(() => {
    return {
        '-webkit-text-security': props.hidden ? 'disc' : 'none',
    };
});

function onInput(event: Event) {
    const element = event.target as HTMLInputElement;

    const val = `${element.value}`.slice(0, `${props.max}`.length);

    inputValue.value = val;
    element.value = val;
}
</script>

<template>
    <div class="flex h-11 text-body/15 text-dark">
        <div class="flex w-full items-center py-3 gap-2">
            <label v-if="showLabel" for="label">
                <slot />
            </label>

            <input
                type="number"
                class="app-input-num flex-1 text-body/15-medium text-dark outline-none bg-white placeholder:text-gray-60 placeholder:body/15-medium"
                :class="{ 'app-input-num--light': props.light }"
                :style="inputStyle"
                :min="props.min"
                :max="props.max"
                :placeholder="props.placeholder"
                :value="inputValue"
                :disabled="props.disabled"
                @input.prevent="onInput"
            />
        </div>
    </div>
</template>

<style scoped>
.app-input-num::-webkit-outer-spin-button,
.app-input-num::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.app-input-num--light::placeholder {
    font-weight: 400;
    color: #bdccde;
}
</style>
