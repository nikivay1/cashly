<script lang="ts" setup>
import { computed, useSlots } from 'vue';

export type IButtonColorTheme =
    | 'blue'
    | 'orange'
    | 'white'
    | 'sber'
    | 'black'
    | 'red';

type IButtonSize = 'xl' | 'l' | 'm' | 's';

interface IButtonProps {
    theme?: IButtonColorTheme;
    size?: IButtonSize;
    outline?: boolean;
    disabled?: boolean;
    ghost?: boolean;
    full?: boolean;
}

const props = withDefaults(defineProps<IButtonProps>(), {
    theme: 'blue',
    size: 'm',
    outline: false,
    disabled: false,
    ghost: false,
    full: false,
    userActionEvent: undefined,
});
const emit = defineEmits(['click']);
const { theme, size, ghost, outline, full } = props;
const slots = useSlots();

const showPre = computed(() => !!slots['pre']);
const showPost = computed(() => !!slots['post']);

const themeClasses = computed(() => {
    return {
        blue: ghost
            ? 'bg-transparent border-none text-primary'
            : outline
            ? 'bg-transparent border border-primary text-primary'
            : 'bg-primary text-white',
        orange: outline
            ? 'bg-transparent border border-orange text-white'
            : 'bg-orange text-white',
        white: ghost
            ? 'bg-transparent border-none text-white'
            : outline
            ? 'bg-transparent border border-white text-white'
            : 'bg-white text-primary',
        sber: 'bg-green text-white',
        black: 'bg-black text-white',
        red: 'bg-white text-red-100',
    }[theme];
});

const fullClasses = computed(() => {
    return full ? 'w-full' : '';
});

const sizeClasses = computed(() => {
    if (!size) return 'text-lg font-semibold';

    return {
        xl: 'h-13 text-button/18-semibold px-4',
        l: ghost
            ? 'h-9 text-button/18-semibold px-2'
            : 'h-9 text-button/18-semibold px-4',
        m: 'h-8 text-button/15 px-4',
        s: ghost
            ? 'h-6 text-button/15 px-0'
            : 'h-6 text-button/15-semibold px-4',
    }[size];
});

const btnClasses = computed(() => {
    return [
        themeClasses.value,
        sizeClasses.value,
        fullClasses.value,
        {
            'disabled:bg-blue-20': !props.ghost,
        },
    ];
});

function onClick() {
    emit('click');
}
</script>
<template>
    <button
        class="inline-flex items-center justify-center rounded disabled:text-gray-90 disabled:pointer-events-none"
        :class="btnClasses"
        :disabled="props.disabled"
        @click="onClick"
    >
        <span v-if="showPre" class="pr-2">
            <slot name="pre" />
        </span>
        <slot />
        <span v-if="showPost" class="pl-2">
            <slot name="post" />
        </span>
    </button>
</template>
