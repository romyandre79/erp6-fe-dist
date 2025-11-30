import { defineComponent, ref, computed, mergeProps, unref, withCtx, createBlock, createCommentVNode, openBlock, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderVNode, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import draggable from 'vuedraggable';
import { u as useToast } from './useToast-CmqKK4ER.mjs';
import { a as _sfc_main$8 } from './FormRender-rRLN5gfz.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RenderNode",
  __ssrInlineRender: true,
  props: {
    node: { type: Object, required: true },
    preview: { type: Boolean, default: false },
    showJson: { type: Boolean, default: false }
  },
  emits: ["select", "drop-child", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isDragOver = ref(false);
    const containerTypes = [
      "master",
      "detail",
      "widget",
      "components",
      "buttons",
      "form",
      "table",
      "search",
      "modal",
      "tables",
      "columns",
      "modals",
      "tabs",
      "tab",
      "wizard"
    ];
    const isContainer = computed(() => {
      if (!props.node.children) props.node.children = [];
      return containerTypes.includes(props.node.type);
    });
    const toast = useToast();
    const onAdd = (event) => {
      const containerType = props.node.type;
      const newItem = event.added?.element;
      if (!newItem) return;
      const componentType = newItem.type;
      const allowedTypes = {
        master: ["button"],
        detail: [""],
        components: ["text", "button"],
        buttons: ["button"],
        tables: ["text"],
        table: ["text"]
      };
      if (allowedTypes[containerType] && !allowedTypes[containerType].includes(componentType)) {
        toast.add({
          title: "Error",
          description: `❌ '${componentType}' tidak dapat ditambahkan ke '${containerType}' container.`,
          color: "error"
        });
        props.node.children.splice(event.added.newIndex, 1);
        return;
      }
      emit("drop-child", props.node.id, newItem);
    };
    const onChildChange = () => emit("select", props.node);
    const resolveComponent = (type) => {
      switch (type) {
        case "button":
          return _sfc_main$8;
        case "input":
        case "number":
        case "email":
        case "hidden":
        case "bool":
        case "boolean":
        case "password":
        case "date":
        case "time":
        case "datetime":
        case "month":
        case "checkbox":
        case "radio":
        case "file":
        case "image":
        case "range":
        case "reset":
        case "search":
        case "tel":
        case "url":
        case "week":
        case "color":
        case "text":
          return "input";
        case "longtext":
          return "textarea";
        default:
          return "div";
      }
    };
    const getComponentProps = (node) => {
      const base = node.props || {};
      switch (node.type) {
        case "shorttext":
        case "number":
        case "hidden":
        case "password":
        case "email":
        case "text":
          return { ...base, type: "text", disabled: true, placeholder: base.key || "Enter text..." };
        case "longtext":
          return { ...base, rows: 3, placeholder: base.key || "Enter long text..." };
        case "button":
          const { label, ...rest } = base;
          return { ...rest, type: "button" };
        case "title":
          return { ...base };
        case "boolean":
        case "bool":
          return { ...base, type: "checkbox" };
        default:
          return base;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RenderNode = RenderNode;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative group transition-all duration-150", __props.preview ? "" : "hover:border-blue-400 hover:shadow-sm"]
      }, _attrs))}>`);
      if (!__props.preview) {
        _push(`<button class="absolute top-1 right-1 text-xs bg-red-500 cursor-pointer text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition z-10"> ✖ </button>`);
      } else {
        _push(`<!---->`);
      }
      if (isContainer.value) {
        _push(`<div class="${ssrRenderClass([isDragOver.value ? "border-blue-400 bg-blue-50" : "border-gray-300", "flex relative border-2 border-dashed rounded p-3 mb-2 bg-white dark:bg-black dark:text-white transition-colors duration-150"])}">`);
        if (__props.node.label) {
          _push(`<h4 class="text-gray-700 font-semibold text-sm mb-2 select-none dark:text-white">${ssrInterpolate(__props.node.type + ": " + __props.node.label)}</h4>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(unref(draggable), {
          modelValue: __props.node.children,
          "onUpdate:modelValue": ($event) => __props.node.children = $event,
          group: "components",
          "item-key": "id",
          disabled: __props.preview,
          class: "space-y-2",
          "ghost-class": "draggable-ghost",
          "chosen-class": "hover-highlight",
          onChange: onChildChange,
          onAdd
        }, {
          item: withCtx(({ element }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_RenderNode, {
                node: element,
                preview: __props.preview,
                onSelect: ($event) => emit("select", $event),
                onDropChild: ($event) => emit("drop-child", $event),
                onDelete: ($event) => emit("delete", $event)
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_RenderNode, {
                  node: element,
                  preview: __props.preview,
                  onSelect: ($event) => emit("select", $event),
                  onDropChild: ($event) => emit("drop-child", $event),
                  onDelete: ($event) => emit("delete", $event)
                }, null, 8, ["node", "preview", "onSelect", "onDropChild", "onDelete"])
              ];
            }
          }),
          footer: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!__props.node.children || __props.node.children.length === 0) {
                _push2(`<div class="text-xs text-gray-400 text-center italic py-2"${_scopeId}> Drop components here </div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                !__props.node.children || __props.node.children.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-xs text-gray-400 text-center italic py-2"
                }, " Drop components here ")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="p-2 border rounded bg-white cursor-pointer hover:border-blue-400 dark:bg-black" draggable="false">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(resolveComponent(__props.node.type)), mergeProps(getComponentProps(__props.node), { disabled: __props.preview }), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.node.type + ":" + (__props.node.props?.text || __props.node.label))}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.node.type + ":" + (__props.node.props?.text || __props.node.label)), 1)
              ];
            }
          }),
          _: 1
        }), _parent);
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RenderNode.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const RenderNode = Object.assign(_sfc_main$2, { __name: "RenderNode" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TreeView",
  __ssrInlineRender: true,
  props: {
    nodes: { type: Array, required: true },
    selected: { type: Object, default: null }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const expanded = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TreeView = TreeView;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "text-sm select-none" }, _attrs))} data-v-797c751a><!--[-->`);
      ssrRenderList(__props.nodes, (node) => {
        _push(`<li class="mb-1 pl-2 border-l border-gray-200" data-v-797c751a><div class="${ssrRenderClass([{
          "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-500": __props.selected?.id === node.id
        }, "flex items-center gap-1 py-0.5 cursor-pointer rounded hover:bg-gray-50"])}" data-v-797c751a>`);
        if (node.children && node.children.length) {
          _push(`<button class="text-gray-500 hover:text-gray-700 transition w-4 h-4 flex items-center justify-center" data-v-797c751a>`);
          if (expanded.value[node.id]) {
            _push(`<span data-v-797c751a>▾</span>`);
          } else {
            _push(`<span data-v-797c751a>▸</span>`);
          }
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-gray-400 text-xs" data-v-797c751a>${ssrInterpolate(node.children && node.children.length ? "📁" : "🧩")}</span><span class="truncate" data-v-797c751a>${ssrInterpolate(node.label || node.props?.label || node.type)}</span></div>`);
        if (node.children && node.children.length && expanded.value[node.id]) {
          _push(ssrRenderComponent(_component_TreeView, {
            nodes: node.children,
            selected: __props.selected,
            onSelect: ($event) => _ctx.$emit("select", $event),
            class: "ml-4 mt-1"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TreeView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TreeView = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-797c751a"]]), { __name: "TreeView" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PropertyEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Object, required: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PropertyEditor = PropertyEditor;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.modelValue, (value, key) => {
        _push(`<!--[-->`);
        if (isObject(value)) {
          _push(`<div class="border-l pl-3 mt-3"><label class="block text-sm font-semibold mb-1 text-gray-700">${ssrInterpolate(key)}</label>`);
          _push(ssrRenderComponent(_component_PropertyEditor, {
            modelValue: __props.modelValue[key],
            "onUpdate:modelValue": ($event) => __props.modelValue[key] = $event
          }, null, _parent));
          _push(`</div>`);
        } else if (Array.isArray(value)) {
          _push(`<div class="mt-2"><label class="block text-sm font-semibold mb-1 text-gray-700">${ssrInterpolate(key)}</label><div class="space-y-1"><!--[-->`);
          ssrRenderList(value, (item, i) => {
            _push(`<div class="flex items-center space-x-2"><input${ssrRenderAttr("value", __props.modelValue[key][i])} type="text" class="border rounded p-1 text-sm w-full"><button type="button" class="text-xs text-red-500 hover:text-red-700">✕</button></div>`);
          });
          _push(`<!--]--><button type="button" class="text-xs text-blue-600 hover:text-blue-800 mt-1"> + Add Item </button></div></div>`);
        } else if (typeof value === "boolean") {
          _push(`<div class="flex items-center justify-between"><label class="text-sm font-medium text-gray-700">${ssrInterpolate(key)}</label><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(__props.modelValue[key]) ? ssrLooseContain(__props.modelValue[key], null) : __props.modelValue[key]) ? " checked" : ""} class="h-4 w-4"></div>`);
        } else if (typeof value === "number") {
          _push(`<div class="flex items-center justify-between"><label class="text-sm font-medium text-gray-700">${ssrInterpolate(key)}</label><input type="number"${ssrRenderAttr("value", __props.modelValue[key])} class="border rounded p-1 text-sm w-2/3"></div>`);
        } else {
          _push(`<div class="flex items-center justify-between"><label class="text-sm font-medium text-gray-700">${ssrInterpolate(key)}</label><input type="text"${ssrRenderAttr("value", __props.modelValue[key])}${ssrIncludeBooleanAttr(key == "type") ? " disabled" : ""} class="border rounded p-1 text-sm w-2/3"></div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PropertyEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PropertyEditor = Object.assign(_sfc_main, { __name: "PropertyEditor" });
const availableComponents = [
  {
    type: "bool",
    label: "Boolean",
    props: {
      key: "",
      label: "",
      place: "",
      text: "",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "button",
    label: "Button",
    props: {
      text: "Button",
      class: "px-4 py-2 rounded transition",
      icon: "heroicons:plus",
      onClick: ""
    }
  },
  {
    type: "color",
    label: "Color",
    props: {
      key: "",
      text: "Color",
      place: "Enter a color",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "date",
    label: "Date",
    props: {
      key: "",
      text: "Date",
      place: "Enter a date",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "datetime",
    label: "Date Time",
    props: {
      key: "",
      text: "Date Time",
      place: "Enter a date time",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "email",
    label: "Email",
    props: {
      key: "",
      label: "Email",
      place: "example@mail.com",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "file",
    label: "File",
    props: {
      key: "",
      text: "File",
      place: "Enter a file",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "hidden",
    label: "Hidden",
    props: {
      text: "Hidden Text",
      place: "Enter a text",
      key: "",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "image",
    label: "Image",
    props: {
      key: "",
      text: "Image",
      place: "Enter a image",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "longtext",
    label: "Long Text",
    props: {
      key: "",
      label: "Long Text",
      place: "Enter long text",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "month",
    label: "Month",
    props: {
      key: "",
      text: "Month",
      place: "Enter a month",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "number",
    label: "Number",
    props: {
      key: "",
      label: "Number",
      place: "enter a number",
      text: "",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "radio",
    label: "Radio",
    props: {
      key: "",
      text: "Radio",
      place: "Enter a radio",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "range",
    label: "Range",
    props: {
      key: "",
      text: "Range",
      place: "Enter a range",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "reset",
    label: "Reset",
    props: {
      key: "",
      text: "Reset",
      place: "Enter a reset",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "select",
    label: "Select",
    props: {
      key: "",
      text: "",
      source: "",
      label: "",
      place: "Choose a data",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "callother",
    label: "Call Other",
    props: {
      key: "",
      othertype: "",
      otherkey: "",
      class: ""
    }
  },
  {
    type: "tel",
    label: "Tel",
    props: {
      key: "",
      text: "Tel",
      place: "Enter a tel",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "text",
    label: "Text",
    props: {
      key: "",
      text: "Text",
      place: "Enter a text",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "time",
    label: "Time",
    props: {
      key: "",
      text: "Time",
      place: "Enter a time",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "url",
    label: "Url",
    props: {
      key: "",
      text: "Url",
      place: "Enter a url",
      primary: false,
      enabled: true,
      required: false
    }
  },
  {
    type: "title",
    label: "Title",
    props: {
      text: "title",
      class: "tracking-tight mb-4"
    }
  },
  {
    type: "subtitle",
    label: "Sub Title",
    props: {
      text: "Sub Title",
      class: "tracking-tight mb-4"
    }
  },
  {
    type: "action",
    label: "Action",
    props: {
      onNew: "",
      onGet: "",
      onRead: "",
      onGetDetail: [],
      onCreate: "",
      onUpdate: "",
      onUpload: "",
      onPurge: "",
      onPdf: "",
      onXls: ""
    }
  }
];
const layoutContainers = [
  {
    type: "buttons",
    label: "Buttons",
    props: {
      key: "",
      class: "flex flex-wrap gap-2 mb-3"
    },
    children: []
  },
  {
    type: "columns",
    label: "Columns",
    props: {
      key: "",
      class: "flex flex-wrap gap-2 mb-3"
    },
    children: []
  },
  {
    type: "form",
    label: "Form",
    props: {
      class: "w-full",
      key: "form",
      primary: ""
    },
    children: []
  },
  {
    type: "master",
    label: "Master",
    props: {
      class: "w-full",
      layout: "standard",
      key: "master",
      primary: ""
    },
    children: []
  },
  {
    type: "modals",
    label: "Modals",
    props: {
      key: "",
      class: "flex flex-wrap gap-2 mb-3"
    },
    children: []
  },
  {
    type: "modal",
    label: "Modal",
    props: {
      key: "",
      text: "",
      class: "flex flex-wrap gap-2 mb-3"
    },
    children: []
  },
  {
    type: "search",
    label: "Search",
    props: {
      key: "",
      class: ""
    },
    children: []
  },
  {
    type: "tabs",
    label: "Tabs",
    props: {
      key: "tabs",
      class: "w-full mb-4"
    },
    children: []
  },
  {
    type: "tab",
    label: "Tab",
    props: {
      key: "tab",
      class: "w-full mb-4",
      text: ""
    },
    children: []
  },
  {
    type: "table",
    label: "Table",
    props: {
      key: "table0",
      isdetail: false,
      primary: "",
      relationkey: "",
      text: "",
      source: "",
      class: "w-full mb-4",
      isselectall: true,
      enablecheck: true,
      isexpand: false
    },
    children: []
  },
  {
    type: "tables",
    label: "Tables",
    props: {
      key: "",
      class: "flex flex-wrap gap-2 mb-3"
    },
    children: []
  },
  {
    type: "widget",
    label: "Widget",
    props: {
      class: "w-full",
      layout: "standard",
      key: "widget",
      primary: ""
    },
    children: []
  },
  {
    type: "wizard",
    label: "Wizard",
    props: {
      class: "w-full",
      layout: "standard",
      key: "wizard",
      primary: ""
    },
    children: []
  }
];

export { PropertyEditor as P, RenderNode as R, TreeView as T, availableComponents as a, layoutContainers as l };
//# sourceMappingURL=components-C70X2N_8.mjs.map
