import { reactive, ref, computed, toRaw, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = {
  __name: "dbobject",
  __ssrInlineRender: true,
  setup(__props) {
    let idSeq = 1;
    const tables = reactive([]);
    const relations = reactive([]);
    const selectedId = ref(null);
    ref(null);
    ref({ x: 0, y: 0 });
    ref(null);
    const jsonPreview = ref("");
    const linkPreview = reactive({ active: false, from: null, sx: 0, sy: 0, path: "" });
    function makeTable(x = 60, y = 60) {
      return {
        id: idSeq++,
        name: `table_${idSeq - 1}`,
        x,
        y,
        width: 220,
        columns: [
          { name: "id", type: "int" },
          { name: "name", type: "varchar" }
        ]
      };
    }
    function addTableAt(x, y) {
      tables.push(makeTable(x, y));
    }
    const selectedTable = computed(() => tables.find((t) => t.id === selectedId.value) || null);
    const JsonExport = computed(() => JSON.stringify({ tables: toRaw(tables), relations: toRaw(relations) }, null, 2));
    function makePath(x1, y1, x2, y2) {
      const mx = (x1 + x2) / 2;
      return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
    }
    function computeRelationsPaths() {
      relations.forEach((r) => {
        const A = tables.find((t) => t.id === r.from.table);
        const B = tables.find((t) => t.id === r.to.table);
        if (!A || !B) return;
        const y1 = A.y + 36 + r.from.col * 24;
        const x1 = A.x + A.width;
        const y2 = B.y + 36 + r.to.col * 24;
        const x2 = B.x;
        r.path = makePath(x1, y1, x2, y2);
      });
    }
    watch(tables, computeRelationsPaths, { deep: true });
    watch(relations, computeRelationsPaths, { deep: true });
    addTableAt(40, 40);
    addTableAt(320, 120);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex flex-col bg-gray-50" }, _attrs))} data-v-62b826b8><header class="flex items-center justify-between p-4 border-b bg-white" data-v-62b826b8><div class="flex items-center gap-3" data-v-62b826b8><h1 class="text-xl font-semibold" data-v-62b826b8>Database Designer — Nuxt + Tailwind</h1><p class="text-sm text-gray-500" data-v-62b826b8>drag &amp; drop, relasi, import/export JSON, save via API</p></div><div class="flex items-center gap-2" data-v-62b826b8><input type="file" accept="application/json" class="hidden" data-v-62b826b8><button class="px-3 py-1 rounded bg-white border" data-v-62b826b8>Load JSON</button><button class="px-3 py-1 rounded bg-blue-600 text-white" data-v-62b826b8>Download JSON</button><button class="px-3 py-1 rounded bg-green-600 text-white" data-v-62b826b8>Save to Backend</button><button class="px-3 py-1 rounded bg-red-500 text-white" data-v-62b826b8>Reset</button></div></header><div class="flex flex-1 overflow-hidden" data-v-62b826b8><div class="flex-1 relative p-4 bg-gray-100" data-v-62b826b8><svg class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle({ "overflow": "visible" })}" data-v-62b826b8><defs data-v-62b826b8><marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" data-v-62b826b8><path d="M0,0 L10,5 L0,10 z" fill="black" data-v-62b826b8></path></marker></defs><!--[-->`);
      ssrRenderList(relations, (rel) => {
        _push(`<g data-v-62b826b8><path${ssrRenderAttr("d", rel.path)} stroke="black" stroke-width="2" fill="none" marker-end="url(#arrow)" data-v-62b826b8></path></g>`);
      });
      _push(`<!--]-->`);
      if (linkPreview.active) {
        _push(`<path${ssrRenderAttr("d", linkPreview.path)} stroke="gray" stroke-width="2" fill="none" stroke-dasharray="6 4" data-v-62b826b8></path>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</svg><!--[-->`);
      ssrRenderList(tables, (table) => {
        _push(`<div class="absolute shadow-lg rounded border bg-white cursor-move" style="${ssrRenderStyle({ left: table.x + "px", top: table.y + "px", width: table.width + "px" })}" draggable="true"${ssrRenderAttr("data-table-id", table.id)} data-v-62b826b8><div class="flex items-center justify-between p-2 bg-gray-800 text-white rounded-t" data-v-62b826b8><div class="font-medium" data-v-62b826b8>${ssrInterpolate(table.name || "table_" + table.id)}</div><div class="flex gap-1" data-v-62b826b8><button title="Duplicate" class="text-xs px-2" data-v-62b826b8>⧉</button><button title="Delete" class="text-xs px-2" data-v-62b826b8>✕</button></div></div><div class="p-2 text-xs" data-v-62b826b8><!--[-->`);
        ssrRenderList(table.columns, (col, i) => {
          _push(`<div class="flex items-center gap-2"${ssrRenderAttr("data-col-index", i)} data-v-62b826b8><span class="w-6 text-gray-600" data-v-62b826b8>${ssrInterpolate(i + 1)}</span><span class="flex-1 truncate" data-v-62b826b8>${ssrInterpolate(col.name)}</span><span class="text-gray-500 text-[11px]" data-v-62b826b8>${ssrInterpolate(col.type || "")}</span><button class="w-4 h-4 rounded-full bg-blue-500" title="Start relation" data-v-62b826b8></button></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--><div class="absolute left-4 bottom-4" data-v-62b826b8><button class="px-3 py-2 rounded bg-green-600 text-white" data-v-62b826b8>Add Table</button></div></div><aside class="w-96 border-l bg-white p-4 overflow-auto" data-v-62b826b8>`);
      if (selectedTable.value) {
        _push(`<div class="space-y-4" data-v-62b826b8><h2 class="text-lg font-semibold" data-v-62b826b8>Properties — ${ssrInterpolate(selectedTable.value.name || "Untitled")}</h2><div data-v-62b826b8><label class="text-sm text-gray-600" data-v-62b826b8>Table Name</label><input${ssrRenderAttr("value", selectedTable.value.name)} class="w-full mt-1 p-2 border rounded" data-v-62b826b8></div><div data-v-62b826b8><label class="text-sm text-gray-600" data-v-62b826b8>Position</label><div class="flex gap-2 mt-1" data-v-62b826b8><input type="number"${ssrRenderAttr("value", selectedTable.value.x)} class="w-1/3 p-2 border rounded" data-v-62b826b8><input type="number"${ssrRenderAttr("value", selectedTable.value.y)} class="w-1/3 p-2 border rounded" data-v-62b826b8><input type="number"${ssrRenderAttr("value", selectedTable.value.width)} class="w-1/3 p-2 border rounded" data-v-62b826b8></div></div><div data-v-62b826b8><label class="text-sm text-gray-600" data-v-62b826b8>Columns</label><div class="mt-2 space-y-2" data-v-62b826b8><!--[-->`);
        ssrRenderList(selectedTable.value.columns, (col, idx) => {
          _push(`<div class="flex items-center gap-2" data-v-62b826b8><input${ssrRenderAttr("value", col.name)} placeholder="name" class="flex-1 p-2 border rounded" data-v-62b826b8><input${ssrRenderAttr("value", col.type)} placeholder="type" class="w-36 p-2 border rounded" data-v-62b826b8><button class="px-2 py-1 bg-red-500 text-white rounded" data-v-62b826b8>-</button></div>`);
        });
        _push(`<!--]--><div class="flex gap-2" data-v-62b826b8><button class="px-3 py-1 bg-blue-600 text-white rounded" data-v-62b826b8>Add Column</button><button class="px-3 py-1 bg-gray-200 rounded" data-v-62b826b8>Auto Types</button></div></div></div><div data-v-62b826b8><label class="text-sm text-gray-600" data-v-62b826b8>Raw JSON</label><textarea rows="6" class="w-full p-2 border rounded mt-1 text-xs font-mono" data-v-62b826b8>${ssrInterpolate(jsonPreview.value)}</textarea><div class="flex gap-2 mt-2" data-v-62b826b8><button class="px-3 py-1 bg-green-600 text-white rounded" data-v-62b826b8>Apply</button><button class="px-3 py-1 bg-indigo-600 text-white rounded" data-v-62b826b8>Copy</button></div></div></div>`);
      } else {
        _push(`<div class="text-gray-500" data-v-62b826b8><p data-v-62b826b8>Pilih tabel di kanvas (double-click) untuk mengedit properties.</p><p class="mt-2 text-sm" data-v-62b826b8>Atau gunakan tombol Add Table untuk membuat baru.</p></div>`);
      }
      _push(`<hr class="my-4" data-v-62b826b8><div data-v-62b826b8><h3 class="font-semibold" data-v-62b826b8>Export / Import</h3><pre class="mt-2 text-xs bg-gray-50 p-2 border rounded max-h-44 overflow-auto font-mono" data-v-62b826b8>${ssrInterpolate(JsonExport.value)}</pre></div><div class="mt-4" data-v-62b826b8><h3 class="font-semibold" data-v-62b826b8>Relations</h3>`);
      if (relations.length) {
        _push(`<div data-v-62b826b8><!--[-->`);
        ssrRenderList(relations, (r) => {
          _push(`<div class="flex items-center justify-between mt-2" data-v-62b826b8><div class="text-sm" data-v-62b826b8>${ssrInterpolate(r.from.table)}.${ssrInterpolate(r.from.col)} ➜ ${ssrInterpolate(r.to.table)}.${ssrInterpolate(r.to.col ?? "-")}</div><div class="flex gap-2" data-v-62b826b8><button class="px-2 py-1 bg-gray-200 rounded" data-v-62b826b8>Edit</button><button class="px-2 py-1 bg-red-500 text-white rounded" data-v-62b826b8>Delete</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-gray-400 text-sm" data-v-62b826b8>No relations</div>`);
      }
      _push(`</div></aside></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dbobject.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dbobject = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62b826b8"]]);

export { dbobject as default };
//# sourceMappingURL=dbobject-BHOxJk8D.mjs.map
