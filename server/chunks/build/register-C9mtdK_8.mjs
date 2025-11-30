import { defineComponent, reactive, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-DxiGeqFG.mjs';
import './user-COYhbsDQ.mjs';
import 'pinia';
import 'jwt-decode';
import './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './useApi-2vD1WDJW.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const form = reactive({ username: "", email: "", password: "" });
    const error = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50" }, _attrs))}><div class="bg-white p-6 rounded shadow-md w-96"><h1 class="text-2xl font-bold mb-4">Register</h1><form><input${ssrRenderAttr("value", unref(form).username)} placeholder="Username" class="border w-full mb-3 p-2 rounded"><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="Email" class="border w-full mb-3 p-2 rounded"><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="Password" class="border w-full mb-3 p-2 rounded"><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="bg-blue-600 text-white w-full py-2 rounded">${ssrInterpolate(unref(loading) ? "Loading..." : "Register")}</button></form>`);
      if (unref(error)) {
        _push(`<p class="text-red-500 mt-2">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-C9mtdK_8.mjs.map
