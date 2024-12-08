<script setup lang="ts">
import AppContent from '@/components/layouts/AppContent.vue';
import AppHeader from '@/components/layouts/AppHeader.vue';
import AppFooter from '@/components/layouts/AppFooter.vue';
import AppMenu from '@/components/layouts/AppMenu.vue';
import TransactionsPage from './transactionsPage.vue';

defineOptions({
    name: 'TransactionPage',
});
</script>

<template>
    <AppHeader title="Cashly" />
    <AppContent>
        <TransactionsPage />
    </AppContent>
    <AppFooter>
        <AppMenu />
    </AppFooter>
</template>
<style scoped></style>
