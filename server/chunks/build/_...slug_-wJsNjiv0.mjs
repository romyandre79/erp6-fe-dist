import { ref, reactive, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { u as useThemeStore } from './theme-CFluwGlR.mjs';
import { b as useRoute } from './server.mjs';
import 'pinia';
import './useApi-2vD1WDJW.mjs';
import './user-COYhbsDQ.mjs';
import 'jwt-decode';
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

const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useThemeStore();
    const route = useRoute();
    const optionBorderStyle = [
      { value: "solid", label: "Solid" },
      { value: "dashed", label: "Dashed" },
      { value: "dotted", label: "Dotted" },
      { value: "double", label: "double" },
      { value: "hidden", label: "hidden" },
      { value: "none", label: "none" }
    ];
    const optionBorder = [
      { label: "Border", value: "border" },
      { label: "None", value: "" }
    ];
    const optionRounded = [
      { label: "Rounded", value: "Rounded" },
      { label: "None", value: "" }
    ];
    const categories = [
      {
        key: "button",
        label: "Button",
        props: [
          {
            key: "button-radius",
            label: "Button Radius",
            type: "text"
          },
          {
            key: "button-border-color",
            label: "Button Border Color",
            type: "color"
          },
          {
            key: "button-padding",
            label: "Button Padding",
            type: "text"
          },
          {
            key: "button-color",
            label: "Common Button Text Color",
            type: "color"
          },
          {
            key: "button-background",
            label: "Common Button Background",
            type: "color"
          },
          {
            key: "button-hover-color",
            label: "Common Button Hover Text Color",
            type: "color"
          },
          {
            key: "button-hover-background",
            label: "Common Button Hover Background",
            type: "color"
          },
          {
            key: "button-primary-color",
            label: "Primary Text Color",
            type: "color"
          },
          {
            key: "button-primary-background",
            label: "Primary Background",
            type: "color"
          },
          {
            key: "button-primary-hover-background",
            label: "Primary Hover Background",
            type: "color"
          },
          {
            key: "button-primary-hover-color",
            label: "Primary Hover Text Color",
            type: "color"
          },
          {
            key: "button-secondary-color",
            label: "Secondary Text Color",
            type: "color"
          },
          {
            key: "button-secondary-background",
            label: "Secondary Background",
            type: "color"
          },
          {
            key: "button-secondary-hover-background",
            label: "Secondary Hover Background",
            type: "color"
          },
          {
            key: "button-secondary-hover-color",
            label: "Secondary Hover Text Color",
            type: "color"
          }
        ]
      },
      {
        key: "common",
        label: "Common",
        props: [
          {
            key: "body-background",
            label: "Body Background Color",
            type: "color"
          },
          {
            key: "body-color",
            label: "Body Text Color",
            type: "color"
          },
          {
            key: "border-color",
            label: "Common Border Color",
            type: "color"
          },
          {
            key: "border-radius",
            label: "Common Border Radius",
            type: "text"
          },
          {
            key: "border",
            label: "Common Border",
            type: "select",
            options: optionBorder
          },
          {
            key: "font-size",
            label: "Common Font Size",
            type: "text"
          },
          {
            key: "font-family",
            label: "Common Font Family",
            type: "text"
          }
        ]
      },
      {
        key: "heading",
        label: "Heading",
        props: [
          {
            key: "h1-color",
            label: "H1 Font Color",
            type: "color"
          },
          {
            key: "h1-font-size",
            label: "H1 Font Size",
            type: "text"
          },
          {
            key: "h1-padding-top",
            label: "H1 Padding Top",
            type: "text"
          },
          {
            key: "h1-padding-bottom",
            label: "H1 Padding Bottom",
            type: "text"
          },
          {
            key: "h2-color",
            label: "H2 Font Color",
            type: "color"
          },
          {
            key: "h2-font-size",
            label: "H2 Font Size",
            type: "text"
          },
          {
            key: "h2-padding-top",
            label: "H2 Padding Top",
            type: "text"
          },
          {
            key: "h2-padding-bottom",
            label: "H2 Padding Bottom",
            type: "text"
          },
          {
            key: "p-color",
            label: "Paragraph Font Color",
            type: "color"
          },
          {
            key: "p-font-size",
            label: "Paragraph Font Size",
            type: "text"
          },
          {
            key: "p-padding-top",
            label: "Paragraph Padding Top",
            type: "text"
          },
          {
            key: "p-padding-bottom",
            label: "Paragraph Padding Bottom",
            type: "text"
          }
        ]
      },
      {
        key: "table",
        label: "Table",
        props: [
          {
            key: "table-color",
            label: "Table Font Color",
            type: "color"
          },
          {
            key: "table-border-size",
            label: "Table Border Size",
            type: "text"
          },
          {
            key: "table-border-style",
            label: "Table Border Style",
            type: "select",
            options: optionBorderStyle
          },
          {
            key: "table-border-color",
            label: "Table Border Color",
            type: "color"
          },
          {
            key: "table-background",
            label: "Table Background Color",
            type: "color"
          },
          {
            key: "table-head-color",
            label: "Table Head Color",
            type: "color"
          },
          {
            key: "table-head-background",
            label: "Table Head Background Color",
            type: "color"
          },
          {
            key: "table-row-even-color",
            label: "Table Row Even Color",
            type: "color"
          },
          {
            key: "table-row-even-background",
            label: "Table Row Even Background Color",
            type: "color"
          },
          {
            key: "table-row-odd-color",
            label: "Table Row Odd Color",
            type: "color"
          },
          {
            key: "table-row-odd-background",
            label: "Table Row odd Background Color",
            type: "color"
          },
          {
            key: "table-footer-color",
            label: "Table Footer Color",
            type: "color"
          },
          {
            key: "table-footer-background",
            label: "Table Footer Background Color",
            type: "color"
          },
          {
            key: "table-pagination-color",
            label: "Table Pagination Color",
            type: "color"
          },
          {
            key: "table-pagination-background",
            label: "Table Pagination Background Color",
            type: "color"
          }
        ]
      },
      {
        key: "input",
        label: "Input",
        props: [
          {
            key: "label-color",
            label: "Label Font Color",
            type: "color"
          },
          {
            key: "label-background",
            label: "Label Background Color",
            type: "color"
          },
          {
            key: "input-color",
            label: "Input Font Color",
            type: "color"
          },
          {
            key: "input-background",
            label: "Input Background Color",
            type: "color"
          },
          {
            key: "input-border-size",
            label: "Input Border Size",
            type: "text"
          },
          {
            key: "input-border-style",
            label: "Input Border Style",
            type: "select",
            options: optionBorderStyle
          },
          {
            key: "input-focus-border-color",
            label: "Input Focus Border Color",
            type: "color"
          },
          {
            key: "input-rounded",
            label: "Input Rounded",
            type: "select",
            options: optionRounded
          }
        ]
      },
      {
        key: "panel",
        label: "Panel",
        props: [
          {
            key: "panel-background",
            label: "Panel Background",
            type: "color"
          },
          {
            key: "panel-color",
            label: "Panel Color",
            type: "color"
          },
          {
            key: "panel-header-background",
            label: "Panel Header Background",
            type: "color"
          },
          {
            key: "panel-header-color",
            label: "Panel Header Color",
            type: "color"
          },
          {
            key: "panel-shadow",
            label: "Panel Shadow",
            type: "color"
          }
        ]
      },
      {
        key: "tab",
        label: "Tab",
        props: [
          {
            key: "tab-color",
            label: "Tab Color",
            type: "color"
          },
          {
            key: "tab-active-background",
            label: "Tab Active Background",
            type: "color"
          },
          {
            key: "tab-active-color",
            label: "Tab Active Header Color",
            type: "color"
          },
          {
            key: "tab-border-color",
            label: "Tab Border Color",
            type: "color"
          }
        ]
      },
      {
        key: "accordion",
        label: "Accordion",
        props: [
          {
            key: "accordion-header-background",
            label: "Accordion Header Background",
            type: "color"
          },
          {
            key: "accordion-header-active-background",
            label: "Accordion Header Active Background",
            type: "color"
          },
          {
            key: "accordion-header-color",
            label: "Accordion Header Color",
            type: "color"
          }
        ]
      },
      {
        key: "slider",
        label: "Slider",
        props: [
          {
            key: "slider-track-background",
            label: "Slider Track Background",
            type: "color"
          },
          {
            key: "slider-thumb-background",
            label: "Slider Thumb Background",
            type: "color"
          },
          {
            key: "slider-thumb-border-color",
            label: "Slider Thumb Border Color",
            type: "color"
          }
        ]
      },
      {
        key: "progress",
        label: "Progress",
        props: [
          {
            key: "progress-background",
            label: "Progress Background",
            type: "color"
          },
          {
            key: "progress-bar-background",
            label: "Progress Bar Background",
            type: "color"
          },
          {
            key: "progress-bar-color",
            label: "Progress Bar Color",
            type: "color"
          }
        ]
      },
      {
        key: "calendar",
        label: "Calendar",
        props: [
          {
            key: "calendar-background",
            label: "Calendar Background",
            type: "color"
          },
          {
            key: "calendar-header-background",
            label: "Calendar Header Background",
            type: "color"
          },
          {
            key: "calendar-header-color",
            label: "Calendar Header Color",
            type: "color"
          },
          {
            key: "calendar-day-color",
            label: "Calendar Day Color",
            type: "color"
          },
          {
            key: "calendar-day-hover-background",
            label: "Calendar Day Hover Background",
            type: "color"
          },
          {
            key: "calendar-today-background",
            label: "Calendar Today Background",
            type: "color"
          },
          {
            key: "calendar-today-color",
            label: "Calendar Today Color",
            type: "color"
          },
          {
            key: "calendar-today-color",
            label: "Calendar Today Color",
            type: "color"
          }
        ]
      },
      {
        key: "dialog",
        label: "Dialog",
        props: [
          {
            key: "dialog-background",
            label: "Dialog Background",
            type: "color"
          },
          {
            key: "dialog-color",
            label: "Dialog Color",
            type: "color"
          },
          {
            key: "dialog-header-background",
            label: "Dialog Header Background",
            type: "color"
          },
          {
            key: "dialog-header-color",
            label: "Dialog Header Color",
            type: "color"
          },
          {
            key: "dialog-border-color",
            label: "Dialog Border Color",
            type: "color"
          },
          {
            key: "dialog-shadow",
            label: "Dialog Shadow",
            type: "color"
          }
        ]
      }
    ];
    ref(null);
    ref("");
    const selectedCategory = ref(null);
    const themeState = reactive({});
    const newKey = ref("");
    const newValue = ref("");
    const currentProps = computed(() => {
      const cat = categories.find((c) => c.key === selectedCategory.value);
      if (!cat) return [];
      return cat.props;
    });
    const cssText = computed(() => {
      let out = `:root {
`;
      for (const [k, v] of Object.entries(themeState))
        out += `  --${k}: ${v};
`;
      out += `}
`;
      return out;
    });
    const jsonText = computed(() => {
      return JSON.stringify(themeState);
    });
    const bodyStyle = computed(() => ({
      color: `var(--body-color, #fff)`,
      background: `var(--body-background, #fff)`,
      fontSize: `var(--font-size, 6)`,
      fontFamily: `var(--font-family, 6)`,
      border: `var(--border, 6)`
    }));
    const h1Style = computed(() => ({
      color: `var(--h1-color, #fff)`,
      fontSize: `var(--h1-font-size, 6)`,
      paddingTop: `var(--h1-padding-top, 6)`,
      paddingBottom: `var(--h1-padding-bottom, 6)`
    }));
    const h2Style = computed(() => ({
      color: `var(--h2-color, #fff)`,
      fontSize: `var(--h2-font-size, 6)`,
      paddingTop: `var(--h2-padding-top, 6)`,
      paddingBottom: `var(--h2-padding-bottom, 6)`
    }));
    const pStyle = computed(() => ({
      color: `var(--p-color, #fff)`,
      fontSize: `var(--p-font-size, 6)`,
      paddingTop: `var(--p-padding-top, 6)`,
      paddingBottom: `var(--p-padding-bottom, 6)`
    }));
    const buttonStyle = computed(() => ({
      background: `var(--button-background, #4f46e5)`,
      color: `var(--button-color, #fff)`,
      borderRadius: `var(--button-radius)`,
      borderColor: `var(--button-border-color)`,
      padding: `var(--button-padding)`,
      border: `var(--border)`,
      hover: {
        background: `var(--button-hover-background, #4f46e5)`,
        color: `var(--button-hover-color, #fff)`
      }
    }));
    const btnPrimaryStyle = computed(() => ({
      background: `var(--button-primary-background, #4f46e5)`,
      color: `var(--button-primary-color, #fff)`,
      borderRadius: `var(--button-radius)`,
      borderColor: `var(--button-border-color)`,
      hover: {
        background: `var(--button-primary-hover-background, #4f46e5)`,
        color: `var(--button-primary-hover-color, #fff)`
      }
    }));
    const btnSecondaryStyle = computed(() => ({
      background: `var(--button-secondary-background, #64748b)`,
      color: `var(--button-secondary-color, #fff)`,
      borderRadius: `var(--button-radius)`
    }));
    const tableStyle = computed(() => ({
      background: `var(--table-background, #64748b)`,
      color: `var(--table-color, #fff)`,
      borderWidth: `var(--table-border-size, 1px)`,
      borderRadius: `var(--border-radius, 1px)`,
      borderStyle: `var(--table-border-style)`,
      borderColor: `var(--table-border-color)`,
      boxShadow: `var(--panel-shadow, 6)`
    }));
    const tableHeadStyle = computed(() => ({
      background: `var(--table-head-background, #64748b)`,
      color: `var(--table-head-color, #fff)`
    }));
    const tableRowStyle = computed(() => ({
      odd: {
        background: `var(--table-row-odd-background, #f9fafb)`,
        color: `var(--table-row-odd-color, #111827)`
      },
      even: {
        background: `var(--table-row-even-background, #ffffff)`,
        color: `var(--table-row-even-color, #111827)`
      }
    }));
    const tableFooterStyle = computed(() => ({
      background: `var(--table-footer-background, #f9fafb)`,
      color: `var(--table-footer-color, #111827)`
    }));
    const tablePaginationStyle = computed(() => ({
      background: `var(--table-pagination-background, #f9fafb)`,
      color: `var(--table-pagination-color, #111827)`
    }));
    const labelStyle = computed(() => ({
      background: `var(--label-background, #f9fafb)`,
      color: `var(--label-color, #111827)`
    }));
    const inputStyle = computed(() => ({
      background: `var(--input-background, #f9fafb)`,
      color: `var(--input-color, #111827)`,
      borderStyle: `var(--input-border-style)`,
      borderSize: `var(--input-border-size)`,
      borderFocusColor: `var(--input-focus-border-color)`,
      borderRadius: `var(--border-radius)`,
      border: `var(--border, 6)`
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full" }, _attrs))}><aside class="w-120 border-r p-4 space-y-4"><h1 class="font-bold text-lg mb-2">Theme Builder - ${ssrInterpolate(unref(route).params.slug[0] || "")}</h1><div class="space-y-2"><div class="flex gap-2 mt-2"><button class="py-2 px-3 bg-primary-600 rounded">Save</button><button class="px-3 py-2 border rounded">Reset</button></div></div><div><h3 class="mt-4 font-semibold">Categories</h3><ul class="mt-2 space-y-1"><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(`<li class="${ssrRenderClass([
          "cursor-pointer px-3 py-2 rounded",
          selectedCategory.value === cat.key ? "bg-primary-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-800"
        ])}">${ssrInterpolate(cat.label)}</li>`);
      });
      _push(`<!--]--></ul></div><div><h3 class="font-semibold mb-3">Properties <span class="text-sm text-gray-500">(edit values below)</span></h3>`);
      if (currentProps.value.length === 0) {
        _push(`<div class="text-sm text-gray-500">Select a category to edit.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(currentProps.value, (prop) => {
        _push(`<div class="border rounded p-3 mb-3 flex items-center justify-between gap-4"><div class="min-w-0"><div class="font-medium truncate">${ssrInterpolate(prop.label)}</div><div class="text-xs text-gray-500 truncate">${ssrInterpolate(prop.key)}</div></div><div class="flex items-center gap-3">`);
        if (prop.type === "color") {
          _push(`<input type="color"${ssrRenderAttr("value", themeState[prop.key])} class="w-10 h-10 p-0 border rounded">`);
        } else if (prop.type === "number") {
          _push(`<input type="number"${ssrRenderAttr("value", themeState[prop.key])} class="border px-2 py-1 rounded w-28">`);
        } else if (prop.type === "select") {
          _push(`<select class="border px-2 py-1 rounded w-44"><!--[-->`);
          ssrRenderList(prop.options, (opt) => {
            _push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(Array.isArray(themeState[prop.key]) ? ssrLooseContain(themeState[prop.key], opt.value) : ssrLooseEqual(themeState[prop.key], opt.value)) ? " selected" : ""}>${ssrInterpolate(opt.label)}</option>`);
          });
          _push(`<!--]--></select>`);
        } else {
          _push(`<input type="text"${ssrRenderAttr("value", themeState[prop.key])} class="border px-2 py-1 rounded w-44">`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--><div class="mt-4 border-t pt-4"><h4 class="font-semibold mb-2">Add custom property</h4><div class="flex gap-2"><input${ssrRenderAttr("value", newKey.value)} placeholder="property-key" class="border px-2 py-1 rounded w-48"><input${ssrRenderAttr("value", newValue.value)} placeholder="value" class="border px-2 py-1 rounded w-32"><button class="px-3 py-1 bg-green-600 text-white rounded">Add</button></div></div></div><div><label class="block text-sm font-medium mb-1">CSS Output</label><textarea readonly class="w-full h-40 font-mono text-xs p-2 border rounded">${ssrInterpolate(cssText.value)}</textarea></div><div><label class="block text-sm font-medium mb-1">JSON</label><textarea readonly class="w-full h-40 font-mono text-xs p-2 border rounded">${ssrInterpolate(jsonText.value)}</textarea></div></aside><section class="flex-1 p-6 overflow-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div style="${ssrRenderStyle(bodyStyle.value)}"><div class="flex items-center justify-between mb-3"><h1 class="font-bold text-lg">Live Preview</h1></div><h1 style="${ssrRenderStyle(h1Style.value)}">Header H1</h1><h2 style="${ssrRenderStyle(h2Style.value)}">Header H2</h2><p style="${ssrRenderStyle(pStyle.value)}">Paragraph</p><div class="mt-4 flex gap-2"><button class="px-3 py-1 rounded" style="${ssrRenderStyle(buttonStyle.value)}">Button</button><button class="px-3 py-1 rounded" style="${ssrRenderStyle(btnPrimaryStyle.value)}">Primary</button><button class="px-3 py-1 rounded" style="${ssrRenderStyle(btnSecondaryStyle.value)}">Secondary</button></div><div class="mt-4 flex gap-2"><table style="${ssrRenderStyle(tableStyle.value)}"><thead style="${ssrRenderStyle(tableHeadStyle.value)}"><tr><th style="${ssrRenderStyle(tableHeadStyle.value)}" class="px-4 py-3">Column 1</th><th style="${ssrRenderStyle(tableHeadStyle.value)}" class="px-4 py-3">Column 2</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(6, (row, index) => {
        _push(`<tr style="${ssrRenderStyle(index % 2 === 0 ? tableRowStyle.value.even : tableRowStyle.value.odd)}"><td class="px-4 py-3">Data Kolom 1</td><td class="px-4 py-3">Data Kolom 2</td></tr>`);
      });
      _push(`<!--]--></tbody><tfoot><tr style="${ssrRenderStyle(tableFooterStyle.value)}"><td class="text-right font-bold">Total</td><td class="text-right">1500</td></tr><tr style="${ssrRenderStyle(tablePaginationStyle.value)}" class="items-center"><td class="text-right font-bold" colspan="2">Page 1 / 1</td></tr></tfoot></table></div><div class="mt-4"><label style="${ssrRenderStyle(labelStyle.value)}">Label</label></div><div class="mt-4 max-w-full"><input type="text" style="${ssrRenderStyle(inputStyle.value)}" class="border" placeholder="place"></div><div class="mt-4"><textarea style="${ssrRenderStyle(inputStyle.value)}" class="border" placeholder="place"></textarea></div><div class="mt-4"><select style="${ssrRenderStyle(inputStyle.value)}" class="border" placeholder="place"><option>Pilihan 1</option><option>Pilihan 2</option></select></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/theme-editor/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-wJsNjiv0.mjs.map
