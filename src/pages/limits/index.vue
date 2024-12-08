<script setup lang="ts">
import AppContent from '@/components/layouts/AppContent.vue';
import AppHeader from '@/components/layouts/AppHeader.vue';
import AppFooter from '@/components/layouts/AppFooter.vue';
import AppMenu from '@/components/layouts/AppMenu.vue';
import LimitsPage from './limitsPage.vue';
defineOptions({
    name: 'LimitsPage',
});
</script>

<template>
    <AppHeader :title="$t('limits')" />
    <AppContent>
        <LimitsPage />
    </AppContent>
    <AppFooter>
        <AppMenu />
    </AppFooter>
</template>
