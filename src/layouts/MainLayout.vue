<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container
            class="main-layout fixed top-0 right-0 bottom-0 left-0 bg-main-screen h-full w-full overflow-hidden"
        >
            <q-page
                class="flex flex-nowrap flex-col h-full w-full relative max-w-[1024px] ml-auto mr-auto"
            >
                <router-view />
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { QLayout, QPage, QPageContainer } from 'quasar';

defineOptions({
    name: 'MainLayout',
});
</script>
