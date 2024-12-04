<script lang="ts" setup>
import { useAccountStore } from '@/stores/account';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import accountItem from './accountItem.vue';

defineOptions({
    name: 'AccountsPage',
});

const { state } = useUserStore();
const { loadAccounts, state: accountState } = useAccountStore();

const openModal = ref(false);

onMounted(() => {
    if (state.userId) {
        loadAccounts(state.userId);
    }
});
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
                @click="openModal = true"
            />
        </div>
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
