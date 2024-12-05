<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer bordered class="bg-grey-8 text-white z-10">
            <q-toolbar class="q-pa-none">
                <div
                    v-for="(item, index) in menuItems"
                    :key="index"
                    class="col"
                    style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    "
                >
                    <q-btn
                        flat
                        :to="item.path"
                        :icon="item.icon"
                        :class="{ 'text-accent': isActive(item.path) }"
                        style="min-width: 50px"
                    >
                        <div
                            class="text-center text-caption"
                            :class="{ 'text-accent': isActive(item.path) }"
                        >
                            {{ $t(item.label) }}
                        </div>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

defineOptions({
    name: 'MainLayout',
});
const route = useRoute();

const menuItems = [
    {
        path: '/',
        icon: 'account_balance_wallet',
        label: 'transactions',
    },
    {
        path: '/accounts',
        icon: 'credit_card',
        label: 'accounts',
    },
    {
        path: '/limits',
        icon: 'tune',
        label: 'limits',
    },
    {
        path: '/analytics',
        icon: 'insert_chart',
        label: 'analytics',
    },
    {
        path: '/settings',
        icon: 'settings',
        label: 'settings',
    },
];

const isActive = (path: string) => {
    return route.path === path;
};
</script>
