<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { Languages } from '@/i18n';

const { t, locale } = useI18n();

const languages = [
    { label: 'English', value: Languages.EN },
    { label: 'Русский', value: Languages.RU },
];

const selectedLanguage = ref(locale.value);

const changeLanguage = (lang: Languages) => {
    locale.value = lang;
    selectedLanguage.value = lang;
};
</script>

<template>
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
