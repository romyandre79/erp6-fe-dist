import { _ as __nuxt_component_0 } from './nuxt-link-BbHPSXWt.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useArticle } from './useArticle-LffJVAPV.mjs';
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
import 'pinia';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './useApi-2vD1WDJW.mjs';
import './user-COYhbsDQ.mjs';
import 'jwt-decode';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getAllArticle, loading, error } = useArticle();
    const res = ([__temp, __restore] = withAsyncContext(() => getAllArticle()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-10" }, _attrs))}><h1 class="text-4xl font-bold text-center mb-8">${ssrInterpolate(_ctx.$t("ARTICLE"))}</h1>`);
      if (unref(loading)) {
        _push(`<div class="text-center">${ssrInterpolate(_ctx.$t("LOADING"))}</div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center text-red-500">${ssrInterpolate(unref(error).value)}</div>`);
      } else {
        _push(`<div class="grid md:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(unref(res)?.data, (article) => {
          _push(`<div class="card bg-base-100 shadow-xl"><figure>`);
          if (article.postpic) {
            _push(`<img${ssrRenderAttr("src", article.postpic)}${ssrRenderAttr("alt", article.title)} class="w-full h-48 w-48 object-cover">`);
          } else {
            _push(`<!---->`);
          }
          _push(`</figure><div class="card-body"><h2${ssrRenderAttr("v-html", article.title)} class="card-title">${ssrInterpolate(article.title)}</h2><p class="text-sm text-gray-500">By ${ssrInterpolate(article.author?.realname)} | ${ssrInterpolate(article.category)}</p><div class="card-actions justify-end">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/articles/${article.slug}`,
            class: "btn btn-primary btn-sm"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("READ MORE"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("READ MORE")), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-v_krmMRq.mjs.map
