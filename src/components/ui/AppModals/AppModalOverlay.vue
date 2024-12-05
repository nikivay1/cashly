<script setup lang="ts">
import { computed, toRefs } from 'vue';

type IModalOverlayPositionProp = 'center' | 'bottom';

interface IModalOverlayProps {
    show: boolean;
    position?: IModalOverlayPositionProp;
}

const props = withDefaults(defineProps<IModalOverlayProps>(), {
    show: false,
    position: 'center',
});

const { show, position } = toRefs(props);

defineEmits<{
    (e: 'click-overlay'): void;
}>();

const positionClass = computed(() => {
    return {
        center: 'items-center',
        bottom: 'items-end',
    }[position.value];
});
</script>
<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="flex fixed justify-center z-50 left-0 top-0 w-full h-full bg-black-60"
            :class="positionClass"
            @click.self.stop="$emit('click-overlay')"
        >
            <slot />
        </div>
    </Teleport>
</template>
