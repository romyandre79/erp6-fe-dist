import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './FormRender-rRLN5gfz.mjs';
import { a as useI18n, b as useRoute } from './server.mjs';
import { u as useAuth } from './useAuth-DxiGeqFG.mjs';
import 'reka-ui';
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
import 'tailwind-variants';
import './index-BiiDXADa.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './useToast-CmqKK4ER.mjs';
import './useApi-2vD1WDJW.mjs';
import './user-COYhbsDQ.mjs';
import 'pinia';
import 'jwt-decode';
import './nuxt-link-BbHPSXWt.mjs';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useRoute();
    useAuth();
    const formSchema = ref(null);
    const formType = ref(String);
    const formTitle = ref(String);
    const menuName = ref(String);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between sticky top-0 z-50 px-6 py-3 transition-colors duration-300 backdrop-blur-md" }, _attrs))}>`);
      if (unref(formSchema)) {
        _push(ssrRenderComponent(__nuxt_component_0, {
          schema: unref(formSchema),
          menuName: unref(menuName),
          formType: unref(formType),
          title: unref(formTitle)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-xI9dJF1n.mjs.map
