<script setup lang="ts">
import { computed, useSlots, ref, type Ref, watch } from 'vue';
import { type MaskInputOptions } from 'maska';

export type AppInputTextProps = {
    modelValue?: string;
    placeholder?: string;
    label?: string;
    maxLength?: number;
    disabled?: boolean;
    mask?: string;
    maskExtraOptions?: MaskInputOptions | null;
    readonly?: boolean;
    hidden?: boolean;
    upper?: boolean;
    labelClasses?: string;
    inputClasses?: string;
    inputMode?:
        | 'text'
        | 'email'
        | 'search'
        | 'tel'
        | 'url'
        | 'none'
        | 'numeric'
        | 'decimal';
    autocomplete?: string;
};

const props = withDefaults(defineProps<AppInputTextProps>(), {
    disabled: false,
    hidden: false,
    label: '',
    mask: '',
    maskExtraOptions: null,
    modelValue: '',
    placeholder: '',
    readonly: false,
    upper: false,
    labelClasses: 'w-32',
    inputMode: 'text',
    inputClasses: '',
    maxLength: undefined,
    autocomplete: 'on',
});

const onMaska = () => {
    emit('update:modelValue', inputValue.value);
    emit('update:maskValue', inputValue.value);
};
const emit = defineEmits(['update:modelValue', 'update:maskValue', 'blur']);

const slots = useSlots();
const showLabel = computed(() => !!slots.default);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const input: Ref<any> = ref(null);

const inputValue = ref(props.modelValue);

const type = computed(() => {
    return props.hidden ? 'password' : 'text';
});

watch(
    () => props.modelValue,
    () => {
        if (!props.mask && props.modelValue !== inputValue.value) {
            inputValue.value = props.modelValue;
        }
    }
);
</script>

<template>
    <div class="flex h-11 text-body/15 text-dark">
        <div class="flex w-full items-center py-3 gap-2">
            <label v-if="showLabel" :class="labelClasses" for="label">
                <slot>
                    {{ label }}
                </slot>
            </label>
            <input
                ref="input"
                v-model="inputValue"
                :type="type"
                :autocapitalize="upper ? 'characters' : 'off'"
                :style="{
                    'text-transform': props.upper ? 'uppercase' : 'none',
                }"
                class="flex-1 outline-none bg-white placeholder:text-gray-60 placeholder:body/15-medium overflow-hidden overflow-ellipsis whitespace-nowrap"
                :class="inputClasses"
                :placeholder="placeholder"
                :disabled="disabled"
                :autocomplete="autocomplete"
                :inputmode="inputMode"
                :readonly="readonly"
                :maxlength="maxLength"
                @input="onMaska"
                @blur="emit('blur')"
            />
            <slot name="control" />
        </div>
    </div>
</template>
