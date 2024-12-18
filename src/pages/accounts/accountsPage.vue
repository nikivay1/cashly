<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

import AccountItem from './accountItem.vue';
import AppButton from '@/components/ui/AppButton.vue';

defineOptions({
    name: 'AccountsPage',
});

const { state } = useUserStore();
const { state: accountState, loadAccounts } = useAccountStore();
const { t } = useI18n();
const router = useRouter();

onMounted(() => {
    if (state.userId) {
        loadAccounts(state.userId);
    }
});
</script>
<template>
    <div class="mx-4 card bg-gray-50">
        <template v-for="account in accountState.accounts" :key="account.uid">
            <AccountItem :account="account" />
        </template>
    </div>
    <div class="q-pa-md flex flex-center add-accont-button">
        <AppButton color="primary" @click="router.push('/accounts/add')">
            {{ t('accaunts_add') }}
        </AppButton>
    </div>
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
