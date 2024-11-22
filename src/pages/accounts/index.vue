<template>
  <q-page>
    <div class="q-pa-md">
      <h2>{{ $t('accounts') }}</h2>
      <p>{{ $t('description') }}: {{ $t('addTransaction') }}</p>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'AccountsPage'
});
</script>
