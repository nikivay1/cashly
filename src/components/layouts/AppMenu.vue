<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type AppMenuButton = {
    path: string;
    icon: string;
    label: string;
    disabled?: boolean;
    color?: string;
};
const menuItems = reactive<AppMenuButton[]>([
    {
        path: '/',
        icon: 'account_balance_wallet',
        label: t('transactions'),
        color: '#e3fe64',
    },
    {
        path: '/accounts',
        icon: 'credit_card',
        label: t('accounts'),
        color: '#e3b262',
    },
    {
        path: '/limits',
        icon: 'tune',
        label: t('limits'),
        color: '#9477c4',
    },
    {
        path: '/analytics',
        icon: 'insert_chart',
        label: t('analytics'),
        color: '#f0a1e3',
    },
    {
        path: '/settings',
        icon: 'settings',
        label: t('settings'),
        color: '#a1e3f0',
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
                <q-icon
                    :name="item.icon"
                    size="sm"
                    :style="{
                        color: $route.path === item.path ? item.color : 'white',
                    }"
                />
            </div>

            <div
                class="text-body/11 text-nowrap"
                :style="{
                    color: $route.path === item.path ? item.color : 'white',
                }"
            >
                {{ item.label }}
            </div>
        </RouterLink>
    </div>
</template>
