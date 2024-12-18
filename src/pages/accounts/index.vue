<script lang="ts" setup>
import AppContent from '@/components/layouts/AppContent.vue';
import accountsPage from './accountsPage.vue';
import AppHeader from '@/components/layouts/AppHeader.vue';
import AppFooter from '@/components/layouts/AppFooter.vue';
import AppMenu from '@/components/layouts/AppMenu.vue';

defineOptions({
    name: 'AccountsPage',
});
</script>

<template>
    <AppHeader>
        <template #title>
            <div class="flex">
                {{ $t('accounts') }}
            </div>
        </template>
    </AppHeader>
    <AppContent>
        <accounts-page />
    </AppContent>
    <AppFooter>
        <AppMenu />
    </AppFooter>
</template>
