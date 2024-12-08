<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type AppMenuButton = {
    path: string;
    icon: string;
    label: string;
    disabled?: boolean;
};
const menuItems = reactive<AppMenuButton[]>([
    {
        path: '/',
        icon: 'account_balance_wallet',
        label: t('transactions'),
    },
    {
        path: '/accounts',
        icon: 'credit_card',
        label: t('accounts'),
    },
    {
        path: '/limits',
        icon: 'tune',
        label: t('limits'),
    },
    {
        path: '/analytics',
        icon: 'insert_chart',
        label: t('analytics'),
    },
    {
        path: '/settings',
        icon: 'settings',
        label: t('settings'),
    },
]);
</script>

<template>
    <div class="flex justify-between items-center mt-2 mb-6 flex-nowrap">
        <RouterLink
            v-for="item in menuItems"
            :key="item.label"
            :to="item.path"
            class="w-full flex flex-col items-center"
        >
            <div class="flex justify-center items-center">
                <q-icon :name="item.icon" size="sm" />
            </div>

            <div class="text-body/11 text-white text-nowrap">
                {{ item.label }}
            </div>
        </RouterLink>
    </div>
</template>
