import { defineComponent, reactive, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { u as useAuth } from './useAuth-DxiGeqFG.mjs';
import { a as useI18n } from './server.mjs';
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
import './user-COYhbsDQ.mjs';
import 'pinia';
import 'jwt-decode';
import './useApi-2vD1WDJW.mjs';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _imports_0 = publicAssetsURL("/images/logo_small.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { t: $t } = useI18n();
    useAuth();
    const { t } = useI18n();
    const form = reactive({ username: "", password: "" });
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-300 dark:from-gray-900 dark:to-gray-800" }, _attrs))}><div class="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30"><div class="flex justify-center mb-6"><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="w-16 h-16 rounded-full shadow-md"></div><h2 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">${ssrInterpolate(unref(t)("WELCOME BACK"))}</h2><p class="text-center text-gray-500 dark:text-gray-400 mb-8">${ssrInterpolate(unref(t)("LOGIN TO ACCOUNT"))}</p><div class="form-control mb-5"><label class="label"><span class="label-text text-gray-600 dark:text-gray-300">${ssrInterpolate(unref(t)("USER"))}</span></label><input type="text"${ssrRenderAttr("value", form.username)} class="input input-bordered w-full px-4 py-2.5 text-gray-600"${ssrRenderAttr("placeholder", unref($t)("ENTER USER"))}>`);
      if (!form.username) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(unref(t)("INVALID USER"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-control mb-6"><label class="label"><span class="label-text text-gray-600 dark:text-gray-300">${ssrInterpolate(unref(t)("PASSWORD"))}</span></label><input type="password"${ssrRenderAttr("value", form.password)} class="input input-bordered w-full px-4 py-2.5" placeholder="••••••••">`);
      if (!form.password) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(unref(t)("INVALID PASSWORD"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full py-2.5 rounded-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"> Login </button>`);
      if (error.value) {
        _push(`<p class="text-red-500 text-center mt-3 text-sm">${ssrInterpolate(error.value)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CTfkXIvc.mjs.map
