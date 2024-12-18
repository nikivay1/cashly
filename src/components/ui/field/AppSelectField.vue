<script setup lang="ts" generic="T">
import isEqual from 'lodash/isEqual';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CardField from '../CardField.vue';
import ActionModal from '../AppModals/ActionModal.vue';
import AppRadioTabs from './AppRadioTabs.vue';
import AppButton from '../AppButton.vue';

export type AppSelectFieldOptionsGroup<T> = {
    options: T[];
    title: string | null;
};

export type AppSelectFieldProps<T = unknown> = {
    options: T[] | AppSelectFieldOptionsGroup<T>[];
    saveBtnText?: string;
    disabledOptions?: T[] | undefined;
    closeBtnText?: string;
    hideDescription?: boolean;
    hidePlaceholder?: boolean;
    disabled?: boolean;
    optionsListTitle?: string;
    overflow?: boolean;
    isLoading?: boolean;
    isCompact?: boolean;
    hasGroups?: boolean;
};

const { t } = useI18n();

const props = withDefaults(defineProps<AppSelectFieldProps<T>>(), {
    saveBtnText: undefined,
    closeBtnText: undefined,
    optionsListTitle: undefined,
    overflow: false,
    isLoading: false,
    isCompact: false,
    hasGroups: false,
    hidePlaceholder: true,
    disabledOptions: undefined,
});
const model = defineModel<T>('modelValue');
const emits = defineEmits<{ (e: 'blur'): void }>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const innerSelected = ref<any>(model.value);
const showModal = ref(false);

const isChooseButtonDisabled = computed(() => {
    return (
        model.value &&
        props.disabledOptions?.some((option) =>
            isEqual(option, innerSelected.value)
        )
    );
});

const optionsGrouped = computed<AppSelectFieldOptionsGroup<T>[]>(() => {
    return (
        props.hasGroups
            ? props.options
            : [
                  {
                      options: props.options,
                      title: null,
                  },
              ]
    ) as AppSelectFieldOptionsGroup<T>[];
});

const openModal = () => {
    if (!props.disabled) {
        showModal.value = true;
    }
};

const closeModal = () => {
    innerSelected.value = model.value;
    showModal.value = false;
    emits('blur');
};

const saveModalData = () => {
    model.value = innerSelected.value;
    showModal.value = false;
};
</script>
<template>
    <CardField :is-paddings-disabled="isCompact">
        <template #title>
            <slot name="title" v-bind="{ model }" />
        </template>
        <template v-if="!hidePlaceholder" #description>
            <slot name="placeholder" />
        </template>
        <template #right>
            <div class="text-primary text-body/15-medium" @click="openModal">
                <slot name="actionText" v-bind="{ model, openModal }">{{
                    t('choose_button')
                }}</slot>
            </div>
        </template>
    </CardField>
    <ActionModal :show="showModal">
        <slot name="optionsTitle">
            <div class="card-title">
                {{ optionsListTitle || t('common_choose_variant_button') }}
            </div>
        </slot>
        <div class="flex flex-col">
            <div
                v-for="(optionsGroup, index) in optionsGrouped"
                :key="index"
                class="flex flex-col"
            >
                <div
                    v-if="optionsGroup.title"
                    class="rounded-t px-4 py-3 justify-between card-title"
                >
                    {{ optionsGroup.title }}
                </div>

                <AppRadioTabs
                    v-model="innerSelected"
                    :options="optionsGroup.options"
                    :disabled-options="disabledOptions"
                    item-container-classes="flex-1 flex items-center justify-between gap-4 border-b border-gray-40 last:border-none w-full"
                    :class="['flex flex-col', { 'overflow-hidden': !overflow }]"
                >
                    <template
                        #default="{ option, active, disabled: isDisabled }"
                    >
                        <div class="flex flex-col">
                            <div
                                class="flex flex-1 px-4 m-0 min-h-11 items-center gap-2 justify-start text-dark"
                                :class="{ 'text-gray-40': isDisabled }"
                            >
                                <AppRadioButton
                                    :model-value="active"
                                    :disabled="isDisabled"
                                />
                                <slot
                                    name="option"
                                    :option="option"
                                    :disabled="isDisabled"
                                    :active
                                >
                                    <div class="whitespace-break-spaces">
                                        {{ option }}
                                    </div>
                                </slot>
                            </div>
                            <slot
                                name="warning"
                                :disabled="isDisabled"
                                :active="active"
                            />
                        </div>
                    </template>
                </AppRadioTabs>
            </div>
        </div>

        <template #controls>
            <AppButton size="xl" theme="white" full @click="closeModal">
                {{ closeBtnText || t('close_button') }}
            </AppButton>
            <AppButton
                size="xl"
                theme="blue"
                full
                :disabled="isChooseButtonDisabled"
                @click="saveModalData"
            >
                {{ saveBtnText || t('choose_button') }}
            </AppButton>
        </template>
    </ActionModal>
</template>
