<template>
    <AppHeader :title="$t('settings')" />
    <AppContent>
        <SettingsPage />
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
import SettingsPage from './settingsPage.vue';

defineOptions({
    name: 'SettingsPage',
});
</script>
