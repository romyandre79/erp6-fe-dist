import { a as useI18n, z as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, computed, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useUserStore } from './user-COYhbsDQ.mjs';
import { u as useThemeStore } from './theme-CFluwGlR.mjs';
import { u as useAuth } from './useAuth-DxiGeqFG.mjs';
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
import 'pinia';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'jwt-decode';
import './useApi-2vD1WDJW.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    useThemeStore();
    const { t } = useI18n();
    useUserStore();
    useAuth();
    ref(false);
    ref({});
    const menus = ref([]);
    const allMenus = computed(
      () => Array.isArray(menus.value) ? [...menus.value].sort((a, b) => (a.sortorder ?? 0) - (b.sortorder ?? 0)) : []
    );
    computed(() => allMenus.value.filter((m) => !m.parentid || m.parentid === 0));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-CbseSO5F.mjs.map
