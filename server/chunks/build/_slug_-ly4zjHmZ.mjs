import { _ as __nuxt_component_0 } from './nuxt-link-BbHPSXWt.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useArticle } from './useArticle-LffJVAPV.mjs';
import { a as useI18n } from './server.mjs';
import './useApi-2vD1WDJW.mjs';
import './user-COYhbsDQ.mjs';
import 'pinia';
import 'jwt-decode';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@intlify/utils';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, locale } = useI18n();
    const { getArticle } = useArticle();
    const route = useRoute();
    const slug = route.params.slug;
    const article = ([__temp, __restore] = withAsyncContext(() => getArticle(slug)), __temp = await __temp, __restore(), __temp);
    const description = ref(article.description);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-10" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn btn-outline mb-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("BACK"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("BACK")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-4xl font-bold mb-4">${ssrInterpolate(unref(article)?.title)}</h1>`);
      if (unref(article)?.postpic) {
        _push(`<img${ssrRenderAttr("src", unref(article).postpic)}${ssrRenderAttr("alt", unref(article).title)} class="w-full h-96 object-cover mb-6">`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-sm text-gray-500 mb-6">By ${ssrInterpolate(unref(article)?.author?.realname)} | ${ssrInterpolate(unref(article)?.category)}</p><div>${description.value ?? ""}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-ly4zjHmZ.mjs.map
