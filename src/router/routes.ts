import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/transactions/index.vue')
      },
      { 
        path: 'settings',
        component: () => import('pages/settings/index.vue')
      },
      { 
        path: 'limits',
        component: () => import('pages/limits/index.vue')
      },
      { 
        path: 'analytics',
        component: () => import('pages/analytics/index.vue')
      },
      { 
        path: 'accounts',
        component: () => import('pages/accounts/index.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
