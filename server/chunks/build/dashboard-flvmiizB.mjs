import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './FormRender-rRLN5gfz.mjs';
import { u as useWidgets } from './useWidgets-Cg_E0AP3.mjs';
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
import './server.mjs';
import 'pinia';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './index-BiiDXADa.mjs';
import '@iconify/utils/lib/css/icon';
import './useToast-CmqKK4ER.mjs';
import './useApi-2vD1WDJW.mjs';
import './user-COYhbsDQ.mjs';
import 'jwt-decode';
import './nuxt-link-BbHPSXWt.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useWidgets();
    const recordWidget = ref(null);
    let res;
    const fetchForm = (rec) => {
      if (res.data.data[rec].widgetform != "") {
        return JSON.parse(res.data.data[rec].widgetform);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(unref(recordWidget), (value, i) => {
        _push(`<div class="p-3 space-y-5">`);
        if (fetchForm(i)) {
          _push(`<div class="p-5 w-full rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300">`);
          _push(ssrRenderComponent(__nuxt_component_0, {
            schema: fetchForm(i),
            formType: "widget"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-flvmiizB.mjs.map
