<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { useUserStore } from '@/stores/user';
import { computed, ref, watch } from 'vue';
import accountItem from './accountItem.vue';
import SheetModal from '@/components/ui/AppModals/SheetModal.vue';
import { currencyList, UserAccount } from '@/shared/model';

defineOptions({
    name: 'AccountsPage',
});

const { state } = useUserStore();
const { loadAccounts, state: accountState, addAccount } = useAccountStore();

const showModal = ref(false);

watch(
    () => state.userId,
    () => {
        if (state.userId) {
            loadAccounts(state.userId);
        }
    },
    {
        immediate: true,
    }
);

const formData = ref<UserAccount>({
    name: '',
    currency: 'GEL',
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
    <div class="q-pa-md">
        <div v-for="account in accountState.accounts" :key="account.uid">
            <account-item :account="account" />
        </div>
    </div>
    <div class="q-pa-md flex flex-center add-accont-button">
        <q-btn label="Add Account" color="primary" @click="showModal = true" />
    </div>

    <SheetModal v-model:show="showModal" position="bottom">
        <template #default>
            <div>
                <q-card-section class="q-py-none">
                    <div class="text-h6 text-dark">Дбавить счет</div>
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
                        color="grey"
                        dense
                        option-label="label"
                        option-value="value"
                        label="Валюта"
                        class="q-mb-md text-dark"
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
            </div>
        </template>
    </SheetModal>
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
