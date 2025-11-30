import { defineComponent, mergeProps, ref, watch, unref, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { u as useApi } from './useApi-2vD1WDJW.mjs';
import { a as useI18n, b as useRoute$1, _ as _export_sfc } from './server.mjs';
import { u as useToast } from './useToast-CmqKK4ER.mjs';
import './user-COYhbsDQ.mjs';
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

const useWorkflowStore = defineStore("workflow", () => {
  const workflow = ref(null);
  const categories = ref([]);
  const components = ref([]);
  const componentDetails = ref([]);
  const componentDefaultDetails = ref([]);
  const componentProperties = ref([]);
  const selectedNode = ref(null);
  const parameters = ref([]);
  const loading = ref(false);
  const api = useApi();
  async function loadWorkflow(id) {
    loading.value = true;
    try {
      const dataForm = new FormData();
      dataForm.append("flowname", "getworkflow");
      dataForm.append("menu", "admin");
      dataForm.append("search", "true");
      dataForm.append("workflowid", id);
      dataForm.append("wfname", id);
      const res = await api.post("/admin/execute-flow", dataForm);
      const wfObj = res?.data?.data ?? {};
      const flowString = wfObj?.flow;
      if (flowString && typeof flowString === "string") {
        try {
          wfObj.flow = JSON.parse(flowString);
        } catch (e) {
          console.error("Failed parsing flow string", e);
          wfObj.flow = null;
        }
      }
      workflow.value = wfObj;
      const f2 = new FormData();
      f2.append("flowname", "searchcombocomponentcategory");
      f2.append("menu", "admin");
      f2.append("search", "true");
      const r2 = await api.post("/admin/execute-flow", f2);
      categories.value = r2.data?.data ?? [];
      const f3 = new FormData();
      f3.append("flowname", "searchcombocomponent");
      f3.append("menu", "admin");
      f3.append("search", "true");
      const r3 = await api.post("/admin/execute-flow", f3);
      components.value = r3.data?.data ?? [];
      const f4 = new FormData();
      f4.append("flowname", "searchwfparameter");
      f4.append("menu", "admin");
      f4.append("search", "true");
      f4.append("wfname", id);
      const r4 = await api.post("/admin/execute-flow", f4);
      parameters.value = r4.data?.data ?? [];
      const f5 = new FormData();
      f5.append("flowname", "searchcomponentdetails");
      f5.append("menu", "admin");
      f5.append("search", "true");
      const r5 = await api.post("/admin/execute-flow", f5);
      componentDefaultDetails.value = r5.data?.data ?? [];
      const f6 = new FormData();
      f6.append("flowname", "searchwfdetailbywfname");
      f6.append("menu", "admin");
      f6.append("search", "true");
      f6.append("wfname", id);
      const r6 = await api.post("/admin/execute-flow", f6);
      componentDetails.value = r6.data?.data ?? [];
    } finally {
      loading.value = false;
    }
  }
  function findComponentByName(name) {
    return components.value.find((c) => c.code === name || c.componentname === name || c.name === name);
  }
  async function loadComponentProperties(name, nodeId) {
    const defaults = componentDefaultDetails.value.filter((x) => x.componentname === name);
    const saved = componentDetails.value.filter((x) => x.componentname === name && Number(x.nodeid) === Number(nodeId));
    const savedMap = /* @__PURE__ */ new Map();
    saved.forEach((x) => {
      savedMap.set(x.componentdetailid || x.inputname, x);
    });
    const merged = defaults.map((d) => {
      const key = d.componentdetailid || d.inputname;
      const savedItem = savedMap.get(key);
      return {
        ...d,
        workflowdetailid: savedItem?.workflowdetailid ?? 0,
        workflowid: savedItem?.workflowid ?? 0,
        componentvalue: savedItem?.componentvalue ?? ""
        // merge value
      };
    });
    componentProperties.value = merged;
    return merged;
  }
  function findDetailMeta(componentName, key) {
    return componentDefaultDetails.value.find((x) => x.componentname === componentName && x.inputname === key) || null;
  }
  function findSavedDetailId(componentName, key, nodeId) {
    return componentDetails.value.find(
      (x) => x.componentid === componentName && x.componentdetailid === key && Number(x.nodeid) === Number(nodeId)
    )?.workflowdetailid ?? "";
  }
  async function saveFlowDetails(flow) {
    const home = flow?.drawflow?.Home?.data ?? {};
    for (const node of Object.values(home)) {
      const componentName = node?.name;
      const props = node?.data ?? {};
      for (const key of Object.keys(props)) {
        const meta = findDetailMeta(componentName, key);
        if (!meta) {
          console.warn("Meta not found:", componentName, key);
          continue;
        }
        const oldDetailId = findSavedDetailId(meta.componentid, meta.componentdetailid, node.id);
        const df = new FormData();
        df.append("flowname", "modifworkflowdetail");
        df.append("menu", "admin");
        df.append("search", "false");
        df.append("workflowid", workflow.value?.workflowid ?? "");
        df.append("componentid", meta.componentid);
        df.append("componentdetailid", meta.componentdetailid);
        df.append("workflowdetailid", oldDetailId || "");
        df.append("componentvalue", props[key]);
        df.append("nodeid", node.id);
        await api.post("/admin/execute-flow", df);
      }
    }
  }
  async function saveFlowParameter() {
    for (let index = 0; index < parameters.value.length; index++) {
      const element = parameters.value[index];
      const df = new FormData();
      df.append("flowname", "modifwfparameter");
      df.append("menu", "admin");
      df.append("search", "false");
      df.append("workflowid", workflow.value?.workflowid ?? "");
      df.append("wfparameterid", element.wfparameterid ?? "");
      df.append("parametername", element.parametername ?? "");
      df.append("parametervalue", element.parametervalue ?? "");
      df.append("parametertype", element.parametertype ?? "");
      await api.post("/admin/execute-flow", df);
    }
  }
  async function saveFlow(flow) {
    loading.value = true;
    try {
      const df = new FormData();
      df.append("flowname", "saveflow");
      df.append("menu", "admin");
      df.append("search", "false");
      df.append("workflowid", workflow.value?.workflowid ?? "");
      df.append("flow", JSON.stringify(flow));
      const res = await api.post("/admin/execute-flow", df);
      await saveFlowDetails(flow);
      await saveFlowParameter();
      await loadWorkflow(workflow.value?.wfname);
      return res;
    } finally {
      loading.value = false;
    }
  }
  function setSelectedNode(node) {
    selectedNode.value = node;
  }
  function updateSelectedNodeData(data) {
    if (!selectedNode.value) return;
    const editor = (void 0).editor;
    if (!editor) return;
    const home = editor.drawflow?.drawflow?.Home?.data;
    if (!home) return;
    const nodeKey = Object.keys(home).find((k) => Number(home[k].id) === Number(selectedNode.value.id));
    if (!nodeKey) return;
    home[nodeKey].data = { ...home[nodeKey].data || {}, ...data };
    editor.drawflow.drawflow.Home.data = home;
    saveFlow(editor.export());
  }
  return {
    workflow,
    categories,
    components,
    componentProperties,
    selectedNode,
    parameters,
    loading,
    loadWorkflow,
    findComponentByName,
    loadComponentProperties,
    saveFlow,
    setSelectedNode,
    updateSelectedNodeData
  };
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Designer",
  __ssrInlineRender: true,
  setup(__props) {
    const { t: $t } = useI18n();
    const store = useWorkflowStore();
    useToast();
    const testResult = ref("");
    watch(
      () => store.workflow,
      (wf) => {
        if (!wf || !wf.flow || true) return;
      },
      { immediate: true }
    );
    useRoute$1();
    useApi();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-full" }, _attrs))}>`);
      if (unref(testResult)) {
        _push(`<div id="test-result-overlay" class="absolute top-6 left-6 p-4 bg-white shadow-xl rounded border z-50 max-w-md"><h3 class="font-bold text-lg">Test Result</h3><pre class="text-sm whitespace-pre-wrap">${ssrInterpolate(unref(testResult))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="drawflow" class="absolute inset-0"></div><div class="absolute right-6 top-6 flex flex-row gap-2 z-50"><button class="p-2 rounded shadow bg-white text-black">-</button><button class="p-2 rounded shadow bg-white text-black">Reset</button><button class="p-2 rounded shadow bg-white text-black">+</button><button class="p-2 rounded shadow bg-white text-black">Save</button><button class="p-2 rounded shadow bg-white text-black">Export PNG</button><button class="p-2 rounded shadow bg-white text-black">Test Flow</button></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/workflow/Designer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Designer = Object.assign(_sfc_main$4, { __name: "Designer" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FlowParameter",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useWorkflowStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="font-semibold mb-3">Flow Parameters</h3><button class="px-3 py-1 bg-blue-500 text-white rounded mb-3">Add Parameter</button><!--[-->`);
      ssrRenderList(unref(store).parameters, (p, idx) => {
        _push(`<div class="flex items-center gap-2 mb-2"><input${ssrRenderAttr("value", p.parametername)} placeholder="param name (e.g. search)" class="border p-2 rounded flex-1"><input${ssrRenderAttr("value", p.parametervalue)} placeholder="value" class="border p-2 rounded flex-1"><select class="border p-2 rounded w-32"><option value="string"${ssrIncludeBooleanAttr(Array.isArray(p.parametertype) ? ssrLooseContain(p.parametertype, "string") : ssrLooseEqual(p.parametertype, "string")) ? " selected" : ""}>string</option><option value="number"${ssrIncludeBooleanAttr(Array.isArray(p.parametertype) ? ssrLooseContain(p.parametertype, "number") : ssrLooseEqual(p.parametertype, "number")) ? " selected" : ""}>number</option><option value="boolean"${ssrIncludeBooleanAttr(Array.isArray(p.parametertype) ? ssrLooseContain(p.parametertype, "boolean") : ssrLooseEqual(p.parametertype, "boolean")) ? " selected" : ""}>boolean</option><option value="json"${ssrIncludeBooleanAttr(Array.isArray(p.parametertype) ? ssrLooseContain(p.parametertype, "json") : ssrLooseEqual(p.parametertype, "json")) ? " selected" : ""}>json</option></select><button class="text-red-500 font-bold hover:text-red-700">✕</button></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/workflow/FlowParameter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const FlowParameter = Object.assign(_sfc_main$3, { __name: "FlowParameter" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PropertyForm",
  __ssrInlineRender: true,
  props: {
    componentName: { type: String, required: false },
    nodeId: { type: [String, Number], required: false }
  },
  setup(__props) {
    const props = __props;
    const store = useWorkflowStore();
    const form = reactive({});
    const fields = ref([]);
    function isTextbox(f) {
      return (f.inputtype ?? "").toLowerCase() === "textbox";
    }
    function isTextarea(f) {
      return (f.inputtype ?? "").toLowerCase() === "textarea";
    }
    function isCombo(f) {
      return (f.inputtype ?? "").toLowerCase() === "combobox" || (f.inputtype ?? "").toLowerCase() === "select";
    }
    function hasOptions(f) {
      const ds = f.datasource;
      return !!(ds && ds.length);
    }
    function getOptions(f) {
      if (!f) return [];
      if (f.datasourcetype && f.datasourcetype.toLowerCase() === "list" && f.datasource) {
        return f.datasource.split(",").map((s) => s.trim());
      }
      if (Array.isArray(f.datasource)) return f.datasource;
      return [];
    }
    function initFormFromFields() {
      fields.value.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      let nodeData = {};
      const editor = (void 0).editor;
      if (editor) {
        const home = editor.drawflow?.drawflow?.Home?.data;
        const node = store.selectedNode;
        if (home && node) {
          const nodeKey = Object.keys(home).find((k) => Number(home[k].id) === Number(node.id));
          if (nodeKey && home[nodeKey]?.data) {
            nodeData = home[nodeKey].data;
          }
        }
      }
      fields.value.forEach((f) => {
        const key = f.inputname;
        if (nodeData && Object.prototype.hasOwnProperty.call(nodeData, key)) {
          form[key] = nodeData[key];
        } else {
          form[key] = f.componentvalue ?? "";
        }
      });
    }
    watch(
      [() => props.componentName, () => props.nodeId],
      async ([name, nodeId]) => {
        if (!name) {
          fields.value = [];
          Object.keys(form).forEach((k) => delete form[k]);
          return;
        }
        const merged = await store.loadComponentProperties(name, nodeId);
        fields.value = merged;
        initFormFromFields();
      },
      { immediate: true }
    );
    watch(
      () => store.selectedNode,
      (node) => {
        if (!node) return;
        initFormFromFields();
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))} data-v-96829b67><div class="flex items-center justify-between" data-v-96829b67><h3 class="text-lg font-semibold" data-v-96829b67>${ssrInterpolate(__props.componentName ?? "Properties")}</h3></div>`);
      if (fields.value.length === 0) {
        _push(`<div class="text-sm text-gray-500" data-v-96829b67>No properties available for this component.</div>`);
      } else {
        _push(`<form class="space-y-3" data-v-96829b67><!--[-->`);
        ssrRenderList(fields.value, (field) => {
          _push(`<div class="space-y-1" data-v-96829b67><label class="block text-sm font-medium text-gray-700" data-v-96829b67>${ssrInterpolate(field.lable ?? field.inputname)}</label>`);
          if (isTextbox(field)) {
            _push(`<input${ssrRenderAttr("value", form[field.inputname])}${ssrRenderAttr("placeholder", field.inputdesc || "")} class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" data-v-96829b67>`);
          } else if (isTextarea(field)) {
            _push(`<textarea${ssrRenderAttr("placeholder", field.inputdesc || "")} rows="4" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" data-v-96829b67>${ssrInterpolate(form[field.inputname])}</textarea>`);
          } else if (isCombo(field)) {
            _push(`<select class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" data-v-96829b67>`);
            if (!hasOptions(field)) {
              _push(`<option${ssrRenderAttr("value", "")} data-v-96829b67${ssrIncludeBooleanAttr(Array.isArray(form[field.inputname]) ? ssrLooseContain(form[field.inputname], "") : ssrLooseEqual(form[field.inputname], "")) ? " selected" : ""}>-- select --</option>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--[-->`);
            ssrRenderList(getOptions(field), (opt) => {
              _push(`<option${ssrRenderAttr("value", opt)} data-v-96829b67${ssrIncludeBooleanAttr(Array.isArray(form[field.inputname]) ? ssrLooseContain(form[field.inputname], opt) : ssrLooseEqual(form[field.inputname], opt)) ? " selected" : ""}>${ssrInterpolate(opt)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<input${ssrRenderAttr("value", form[field.inputname])} class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" data-v-96829b67>`);
          }
          if (field.inputdesc) {
            _push(`<p class="text-xs text-gray-400" data-v-96829b67>${ssrInterpolate(field.inputdesc)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></form>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/workflow/PropertyForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PropertyForm = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-96829b67"]]), { __name: "PropertyForm" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const tab = ref("toolbox");
    const store = useWorkflowStore();
    function compsByCategory(cat) {
      return store.components.filter((c) => {
        if (!c) return false;
        return c.categoryname === cat.categoryname;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col bg-white text-gray-900 shadow-sm border-l" }, _attrs))}><div class="flex border-b"><button class="${ssrRenderClass([tab.value === "toolbox" ? "bg-blue-500 text-white" : "", "px-4 py-2"])}"> Toolbox </button><button class="${ssrRenderClass([tab.value === "parameter" ? "bg-blue-500 text-white" : "", "px-4 py-2"])}"> Flow Parameter </button><button class="${ssrRenderClass([tab.value === "property" ? "bg-blue-500 text-white" : "", "px-4 py-2"])}"> Property </button></div><div class="flex-1 overflow-auto p-3">`);
      if (tab.value === "toolbox") {
        _push(`<div><!--[-->`);
        ssrRenderList(unref(store).categories, (cat) => {
          _push(`<div class="mb-4"><div class="font-semibold text-sm text-gray-700 mb-2">${ssrInterpolate(cat.categoryname ?? cat.label ?? cat.name)}</div><div><!--[-->`);
          ssrRenderList(compsByCategory(cat), (cmp) => {
            _push(`<div draggable="true" class="p-2 border rounded mb-2 cursor-grab flex items-center gap-2"><i class="${ssrRenderClass(cmp.componentclass ?? cmp.icon)}"></i><span class="text-sm">${ssrInterpolate(cmp.componenttitle ?? cmp.label ?? cmp.name)}</span></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (tab.value === "parameter") {
        _push(`<div>`);
        _push(ssrRenderComponent(FlowParameter, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (tab.value === "property") {
        _push(`<div>`);
        if (unref(store).selectedNode) {
          _push(ssrRenderComponent(PropertyForm, {
            componentName: unref(store).selectedNode.name,
            nodeId: unref(store).selectedNode.nodeid ?? unref(store).selectedNode.id ?? unref(store).selectedNode.data?.nodeid
          }, null, _parent));
        } else {
          _push(`<div class="text-gray-500">Select a node to edit properties</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/workflow/Sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Sidebar = Object.assign(_sfc_main$1, { __name: "Sidebar" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useWorkflowStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex overflow-hidden" }, _attrs))}><div class="flex-1 relative bg-gray-100">`);
      _push(ssrRenderComponent(Designer, null, null, _parent));
      _push(`</div><div class="w-80 bg-white border-l">`);
      _push(ssrRenderComponent(Sidebar, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/workflow-designer/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-Drj973pP.mjs.map
