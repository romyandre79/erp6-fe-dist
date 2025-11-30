import { _ as __nuxt_component_0 } from './FormRender-rRLN5gfz.mjs';
import { defineComponent, ref, reactive, computed, watch, unref, withCtx, createVNode, withModifiers, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import draggable from 'vuedraggable';
import { a as availableComponents, l as layoutContainers, R as RenderNode, T as TreeView, P as PropertyEditor } from './components-C70X2N_8.mjs';
import { b as useRoute } from './server.mjs';
import { u as useToast } from './useToast-CmqKK4ER.mjs';
import { u as useWidgets } from './useWidgets-Cg_E0AP3.mjs';
import { u as useApi } from './useApi-2vD1WDJW.mjs';
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
import './nuxt-link-BbHPSXWt.mjs';
import 'pinia';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './user-COYhbsDQ.mjs';
import 'jwt-decode';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useToast();
    const formattedJson = ref("");
    const canvasComponents = ref([]);
    const selected = ref(null);
    const formSchema = ref(null);
    const previewMode = ref(false);
    const showJson = ref(true);
    useWidgets();
    useApi();
    const onDropChild = ([parentId, newComp]) => {
      const findAndInsert = (nodes) => {
        for (const node of nodes) {
          if (node.id === parentId) {
            if (!Array.isArray(node.children)) node.children = [];
            node.children.push(newComp);
            return true;
          }
          if (node.children && findAndInsert(node.children)) return true;
        }
        return false;
      };
      findAndInsert(canvasComponents.value);
    };
    const deleteNode = (target) => {
      if (!confirm(`Are you sure you want to delete "${target.label}"?`)) return;
      const removeFrom = (nodes) => {
        const index = nodes.findIndex((n) => n.id === target.id);
        if (index !== -1) {
          nodes.splice(index, 1);
          return true;
        }
        for (const node of nodes) {
          if (node.children && removeFrom(node.children)) return true;
        }
        return false;
      };
      removeFrom(canvasComponents.value);
      selected.value = null;
    };
    const selectComponent = (node) => {
      selected.value = node;
    };
    const dataMenu = reactive({
      widgetid: Number,
      widgetname: String,
      widgettitle: String,
      widgetversion: String,
      widgetform: String,
      description: String,
      moduleid: Number,
      modulename: String,
      widgetby: String,
      installdate: String,
      recordStatus: Number
    });
    const debugText = computed({
      get() {
        return JSON.stringify(canvasComponents.value, null, 2);
      },
      set(v) {
        try {
          canvasComponents.value = JSON.parse(v);
        } catch {
        }
      }
    });
    watch(
      canvasComponents,
      (newVal) => {
        formattedJson.value = newVal;
        formSchema.value = newVal;
      },
      { deep: true, immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormRender = __nuxt_component_0;
      _push(`<!--[--><div class="flex"><button class="text-black dark:text-white w-full py-1 rounded cursor-pointer"> 💾 Save Schema </button><button class="text-black dark:text-white w-full py-1 rounded cursor-pointer"> Clear Schema </button><button class="text-black dark:text-white w-full py-1 rounded cursor-pointer"> 📂 Load Schema </button><button class="text-black dark:text-white w-full py-1 rounded cursor-pointer"> 📂 Copy From ... </button><button class="text-black dark:text-white w-full py-1 rounded cursor-pointer">${ssrInterpolate(previewMode.value ? "🧱 Edit Mode" : "👁 Preview")}</button><button class="text-black dark:text-white w-full py-1 rounded cursor-pointer">${ssrInterpolate(showJson.value ? "🧱 Debug Off" : "👁 Debug On")}</button></div><div class="flex h-screen overflow-hidden bg-gray-100"><aside class="w-1/5 bg-white border-r p-3 overflow-y-auto dark:bg-black"><h2 class="font-bold text-lg mb-3">Elements</h2><!--[-->`);
      ssrRenderList(unref(availableComponents), (comp, idx) => {
        _push(`<div class="border rounded p-2 mb-2 cursor-move hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black" draggable="true">${ssrInterpolate(comp.label)}</div>`);
      });
      _push(`<!--]--><h3 class="font-bold text-lg mb-3">Containers</h3><!--[-->`);
      ssrRenderList(unref(layoutContainers), (group, idx) => {
        _push(`<div class="border rounded p-2 mb-2 cursor-move hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black" draggable="true">${ssrInterpolate(group.label)}</div>`);
      });
      _push(`<!--]--></aside><main class="flex-1 p-5 overflow-auto w-full bg-white dark:bg-black">`);
      if (previewMode.value) {
        _push(`<div class="flex items-center justify-between sticky top-0 z-50 px-6 py-3 transition-colors duration-300 backdrop-blur-md">`);
        if (formSchema.value) {
          _push(ssrRenderComponent(_component_FormRender, {
            schema: formSchema.value,
            menuName: unref(dataMenu).menuName,
            formType: unref(dataMenu).menuType,
            title: unref(dataMenu).description
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!previewMode.value) {
        _push(`<div class="min-h-[80vh] rounded-xl shadow-inner">`);
        if (!canvasComponents.value?.length) {
          _push(`<div class="text-gray-400 text-center py-20"> Drag components or containers here </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: canvasComponents.value,
          "onUpdate:modelValue": ($event) => canvasComponents.value = $event,
          group: "components",
          "item-key": "id",
          class: "space-y-3"
        }, {
          item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([{ "border-blue-600": selected.value?.id === element.id }, "panel border rounded p-3 cursor-pointer relative group"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(RenderNode, {
                node: element,
                preview: previewMode.value,
                showJson: showJson.value,
                selected: selected.value,
                onSelect: selectComponent,
                onDropChild,
                onDelete: deleteNode
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  class: ["panel border rounded p-3 cursor-pointer relative group", { "border-blue-600": selected.value?.id === element.id }],
                  onClick: withModifiers(($event) => selectComponent(element), ["stop"])
                }, [
                  createVNode(RenderNode, {
                    node: element,
                    preview: previewMode.value,
                    showJson: showJson.value,
                    selected: selected.value,
                    onSelect: selectComponent,
                    onDropChild,
                    onDelete: deleteNode
                  }, null, 8, ["node", "preview", "showJson", "selected"])
                ], 10, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (showJson.value && !previewMode.value) {
          _push(`<div class="panel font-mono text-sm rounded-xl p-4 overflow-auto max-h-[80vh]"><h1>Debug</h1><textarea class="w-full h-120 p-3 border rounded font-mono text-sm">${ssrInterpolate(unref(debugText))}</textarea></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main><aside class="w-1/4 bg-white border-l p-4 overflow-y-auto dark:bg-black"><h3 class="font-semibold mb-3">Form Structure</h3>`);
      _push(ssrRenderComponent(TreeView, {
        nodes: canvasComponents.value,
        selected: selected.value,
        onSelect: selectComponent
      }, null, _parent));
      _push(`<hr class="my-4">`);
      if (selected.value && !previewMode.value) {
        _push(`<div><h3 class="font-semibold mb-3">Properties</h3>`);
        _push(ssrRenderComponent(PropertyEditor, {
          modelValue: selected.value.props,
          "onUpdate:modelValue": ($event) => selected.value.props = $event
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/widget-designer/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-DiED8gpl.mjs.map
