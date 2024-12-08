<template>
    <AppHeader :title="$t('analytics')" />
    <AppContent>
        <AnalyticsPage />
    </AppContent>
    <AppFooter>
        <AppMenu />
    </AppFooter>
</template>

<script setup lang="ts">
import AppContent from '@/components/layouts/AppContent.vue';
import AppHeader from '@/components/layouts/AppHeader.vue';
import AppFooter from '@/components/layouts/AppFooter.vue';
import AppMenu from '@/components/layouts/AppMenu.vue';
import AnalyticsPage from './AnalyticsPage.vue';

defineOptions({
    name: 'AnalyticsPage',
});
</script>
