<script setup lang="ts" generic="T">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
    name: 'SelectComponent',
});
withDefaults(
    defineProps<{
        options?: T[];
        disabledOptions?: T[];
        selectedTitle?: string;
        title: string;
        modalTitle?: string;
        disabled?: boolean;
        withOptionsDivider?: boolean;
        optionsItemClasses?: string;
    }>(),
    {
        selectedTitle: '',
        modalTitle: '',
        disabled: false,
        disabledOptions: () => [],
        options: () => [],
        optionHeight: 44,
        optionsItemClasses: '',
    }
);

const { t } = useI18n();
const emits = defineEmits(['update:model-value', 'blur']);
const model = defineModel<T>();
const selected = ref<T>();

const isActionModalVisible = ref(false);

const handleShow = () => {
    isActionModalVisible.value = true;
};

const handleCancel = () => {
    selected.value = model.value;
    emits('blur');
    isActionModalVisible.value = false;
};

const handleSubmit = () => {
    emits('update:model-value', selected.value);
    isActionModalVisible.value = false;
};
</script>

<template>
    <div class="pr-4 field-row" @click="!disabled && handleShow()">
        <slot name="title">
            <div>
                {{ title }}
            </div>
        </slot>
        <div
            :class="[
                disabled ? 'text-buttons/blue-bg-disable' : 'text-primary',
            ]"
        >
            <div>
                {{ selectedTitle || t('common_indicate_button') }}
            </div>
        </div>

        <ActionModal :show="isActionModalVisible">
            <div class="card">
                <div class="card-title h-11 px-4">
                    {{ modalTitle || title }}
                </div>
                <AppRadioTabs
                    v-model="selected"
                    :options="options"
                    :disabled-options="disabledOptions"
                    item-container-classes="flex-1 field-row gap-4"
                    class="flex flex-col overflow-y-scroll overflow-x-hidden max-h-96"
                >
                    <template #default="{ option, active }">
                        <div
                            class="flex flex-1 ml-4 pr-4 m-0 h-11 items-center gap-2 justify-start text-dark whitespace-nowrap"
                            :class="{
                                'border-b border-b-[#E0E0E0]':
                                    withOptionsDivider,
                                [optionsItemClasses]: !!optionsItemClasses,
                            }"
                        >
                            <AppRadioButton
                                v-if="disabledOptions.includes(option)"
                                :model-value="true"
                                disabled
                            />
                            <AppRadioButton v-else :model-value="active" />
                            <slot name="option" :option="option">
                                <div>
                                    {{ option }}
                                </div>
                            </slot>
                        </div>
                    </template>
                </AppRadioTabs>
            </div>
            <template #controls>
                <AppButton
                    class="flex-1"
                    theme="white"
                    size="xl"
                    @click="handleCancel"
                >
                    {{ t('common_close_button') }}
                </AppButton>
                <AppButton
                    class="flex-1"
                    theme="blue"
                    size="xl"
                    :disabled="!selected"
                    @click="handleSubmit"
                >
                    {{ t('common_apply_button') }}
                </AppButton>
            </template>
        </ActionModal>
    </div>
</template>
