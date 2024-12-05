<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';
import accountItem from './accountItem.vue';
import SheetModal from '@/components/ui/AppModals/SheetModal.vue';
import { UserAccount } from '@/shared/model';

defineOptions({
    name: 'AccountsPage',
});

const { state } = useUserStore();
const { loadAccounts, state: accountState, addAccount } = useAccountStore();

const showModal = ref(false);
const currencyList = [
    {
        label: 'Лари (GEL)',
        value: 'GEL',
    },
    {
        label: 'Рубли (RUB)',
        value: 'RUB',
    },
    {
        label: 'Доллары (USD)',
        value: 'USD',
    },
    {
        label: 'Евро (EUR)',
        value: 'EUR',
    },
];

onMounted(() => {
    if (state.userId) {
        loadAccounts(state.userId);
    }
});

const formData = ref<UserAccount>({
    name: '',
    currency: '',
    balance: 0,
    active: true,
});

const isValid = computed(() => {
    return (
        formData.value.name && formData.value.currency && formData.value.balance
    );
});

const saveData = async () => {
    if (state.userId && isValid.value) {
        await addAccount(
            state.userId,
            formData.value.name,
            formData.value.balance,
            formData.value.currency
        );
    }
    showModal.value = false;
};
</script>
<template>
    <q-page>
        <div class="q-pa-md">
            <h2>{{ $t('accounts') }}</h2>
            <p>{{ $t('description') }}: {{ $t('addTransaction') }}</p>
        </div>
        <div v-for="account in accountState.accounts" :key="account.uid">
            <account-item :account="account" />
        </div>
        <div class="q-pa-md flex flex-center add-accont-button">
            <q-btn
                label="Add Account"
                color="primary"
                @click="showModal = true"
            />
        </div>

        <SheetModal v-model:show="showModal" position="bottom">
            <template #default>
                <div class="mt-4">
                    <q-card class="q-pa-md">
                        <q-card-section>
                            <div class="text-h6">Дбавить счет</div>
                        </q-card-section>

                        <q-card-section>
                            <q-input
                                v-model="formData.name"
                                label="Название"
                                outlined
                                dense
                                class="q-mb-md"
                            />
                            <q-select
                                v-model="formData.currency"
                                :options="currencyList"
                                outlined
                                dense
                                label="Валюта"
                                class="q-mb-md"
                            />
                            <q-input
                                v-model="formData.balance"
                                label="Остаток"
                                type="number"
                                outlined
                                dense
                                class="q-mb-md"
                            />
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn
                                label="Сохранить"
                                color="primary"
                                class="w-full"
                                :disable="!isValid"
                                @click="saveData"
                            />
                        </q-card-actions>
                    </q-card>
                </div>
            </template>
        </SheetModal>
    </q-page>
</template>

<style scoped>
.add-accont-button {
    position: absolute;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
}
</style>
