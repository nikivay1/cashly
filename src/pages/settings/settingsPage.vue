<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { Languages } from '@/i18n';
import UIListItem from '@/components/ui/UIListItem.vue';
import UIDivider from '@/components/ui/UIDivider.vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { profileMenuSettingsMainItems } from '@/shared/const/menu';

const { t, locale } = useI18n();
const router = useRouter();

const languages = [
    { label: 'English', value: Languages.EN },
    { label: 'Русский', value: Languages.RU },
];

const selectedLanguage = ref(locale.value);

const changeLanguage = (lang: Languages) => {
    locale.value = lang;
    selectedLanguage.value = lang;
};
export interface MenuItem {
    icon?: string;
    title?: string;
    to?: Partial<RouteRecordRaw>;
    externalLink?: string;
    allowOffline?: boolean;
}
function handleClick(item: MenuItem) {
    if (item.to) {
        router.push(item.to);
    } else {
        window.open(item.externalLink, '_blank');
    }
    return;
}
</script>

<template>
    <div class="relative p-2 pb-8 w-full flex flex-col gap-2">
        <div class="bg-white rounded overflow-hidden">
            <div v-for="(item, idx) in profileMenuSettingsMainItems" :key="idx">
                <UIListItem
                    :title="item.title"
                    :icon="item.icon"
                    @click="handleClick(item)"
                />
                <UIDivider class="pl-4" />
            </div>
        </div>
    </div>
    <div class="q-pa-md">
        <q-card>
            <q-card-section>
                <div class="text-h6">{{ t('language') }}</div>
                <q-select
                    v-model="selectedLanguage"
                    :options="languages"
                    emit-value
                    map-options
                    @update:model-value="changeLanguage"
                    label="Choose Language"
                />
            </q-card-section>
        </q-card>
    </div>
</template>
