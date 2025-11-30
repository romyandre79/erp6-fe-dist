import { u as useUserStore } from './user-COYhbsDQ.mjs';
import { v as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import 'pinia';
import 'jwt-decode';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@intlify/utils';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

s;
const auth = defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  userStore.loadAuth();
  if (!userStore.token && to.path !== "/login") {
    return navigateTo("/");
  }
  if (userStore.token && to.path === "/login") {
    return navigateTo("/");
  }
});

export { auth as default };
//# sourceMappingURL=auth-D81DcmJ6.mjs.map
