<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { useAccountStore } from '@/stores/account';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { CurrencySymbols, UserAccount } from '@/shared/model';
import { useRouter } from 'vue-router';

import AppSelectField from '@/components/ui/field/AppSelectField.vue';
import AppInputText from '@/components/ui/field/AppInputText.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppContent from '@/components/layouts/AppContent.vue';
import AppHeader from '@/components/layouts/AppHeader.vue';
import AppFooter from '@/components/layouts/AppFooter.vue';

defineOptions({
    name: 'AddNewAccount',
});

const { state } = useUserStore();
const { addAccount } = useAccountStore();
const { t } = useI18n();
const router = useRouter();

const showModal = ref(false);

const form = ref<UserAccount>({
    name: '',
    currency: 'GEL',
    balance: '0',
    active: true,
});

const isValid = computed(
    (): boolean =>
        !!form.value.name && !!form.value.currency && !!form.value.balance
);

const saveData = async () => {
    console.log(form.value);
    if (state.userId && isValid.value) {
        await addAccount(
            state.userId,
            form.value.name,
            form.value.balance,
            form.value.currency
        ).then(() => {
            router.back();
        });
    }
    showModal.value = false;
};
</script>

<template>
    <AppHeader>
        <template #title>
            <div class="flex">
                {{ $t('accaunts_add') }}
            </div>
        </template>
    </AppHeader>
    <AppContent>
        <div class="p-2">
            <div class="card rounded w-full flex flex-col text-dark">
                <AppInputText
                    v-model:model-value="form.name"
                    placeholder="Название"
                    class="q-mb-md"
                >
                    Название
                </AppInputText>
                <AppSelectField
                    v-model="form.currency"
                    :options="Object.keys(CurrencySymbols)"
                    :save-btn-text="t('apply_button')"
                    hide-description
                    :options-list-title="t('currency_title')"
                >
                    <template #title>
                        {{ t('currency_title') }}
                    </template>
                    <template #actionText>
                        {{ form.currency }}
                    </template>
                </AppSelectField>

                <AppInputText
                    v-model="form.balance"
                    placeholder="Остаток"
                    type="numeric"
                    class="q-mb-md"
                >
                    Остаток
                </AppInputText>
            </div>
        </div>
    </AppContent>
    <AppFooter>
        <div class="w-full px-4 py-2 flex flex-col gap-4">
            <AppButton
                color="primary"
                full
                :disable="!isValid"
                @click="saveData"
            >
                {{ t('save_button') }}
            </AppButton>
        </div>
    </AppFooter>
</template>
