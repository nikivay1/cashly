<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar class="q-pa-none">
        <div 
          v-for="(item, index) in menuItems" 
          :key="index" 
          class="col" 
          style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          
          <q-btn 
            flat 
            :to="item.path" 
            :icon="item.icon" 
            :class="{'text-primary': isActive(item.path)}" 
            style="min-width: 50px;"/>
          
          <div class="text-center" :class="{'text-primary': isActive(item.path)}">
            {{ $t(item.label) }}
          </div>
          
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

defineOptions({
  name: 'MainLayout'
});
const route = useRoute();

const menuItems = [
  { 
    path: '/', 
    icon: 'account_balance_wallet', 
    label: 'transactions'
  },{ 
    path: '/accounts', 
    icon: 'credit_card', 
    label: 'accounts' 
  },{ 
    path: '/limits', 
    icon: 'tune', 
    label: 'limits' 
  },{ 
    path: '/analytics', 
    icon: 'insert_chart', 
    label: 'analytics' 
  },{ 
    path: '/settings', 
    icon: 'settings', 
    label: 'settings' 
  }
];

const isActive = (path: string) => {
  return route.path === path;
}
</script>
