<template>
  <q-page>
    <div class="q-pa-md">
      <h2>{{ $t('analytics') }}</h2>
      <p>{{ $t('description') }}: {{ $t('addTransaction') }}</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AnalyticsPage'
});
</script>
