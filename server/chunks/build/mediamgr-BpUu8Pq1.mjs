import { defineComponent, mergeProps, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useApi } from './useApi-2vD1WDJW.mjs';
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

function useMediaManager() {
  const files = ref([]);
  const currentPath = ref("");
  const loading = ref(false);
  const Api = useApi();
  const baseUrl = "/media";
  async function loadMedia(path = "") {
    loading.value = true;
    try {
      const res = await Api.get(`${baseUrl}?path=${encodeURIComponent(path)}`);
      files.value = Array.isArray(res) ? res : [];
      currentPath.value = path;
    } catch (err) {
      console.error("Failed to load media", err);
    } finally {
      loading.value = false;
    }
  }
  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", currentPath.value);
    await Api.post(`${baseUrl}/upload`, formData);
    await loadMedia(currentPath.value);
  }
  async function deleteFile(item) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await Api.del(`${baseUrl}/delete?path=${encodeURIComponent(item.path)}`);
    await loadMedia(currentPath.value);
  }
  async function renameFile(oldPath, newName) {
    await Api.post(`${baseUrl}/rename`, JSON.stringify({ oldPath, newName }));
    await loadMedia(currentPath.value);
  }
  async function createFolder(folderName) {
    await Api.post(`${baseUrl}/folder`, { path: currentPath.value, folder: folderName });
    await loadMedia(currentPath.value);
  }
  return {
    files,
    currentPath,
    loading,
    loadMedia,
    uploadFile,
    deleteFile,
    renameFile,
    createFolder
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MediaManager",
  __ssrInlineRender: true,
  setup(__props) {
    const { files, currentPath, loading } = useMediaManager();
    ref(null);
    const preview = ref(null);
    useApi();
    function isImage(ext) {
      return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 shadow-md" }, _attrs))}><div class="flex items-center justify-between mb-3"><div class="flex items-center space-x-2 cursor-pointer"><button class="px-2 py-1 bg-gray-200">⬆</button><span class="text-sm italic">Path: ${ssrInterpolate(unref(currentPath) || "/")}</span></div><div class="space-x-2"><input type="file" class="hidden"><button class="btn">📤 Upload</button><button class="btn">📁 New Folder</button><button class="btn">🔄 Refresh</button></div></div>`);
      if (unref(loading)) {
        _push(`<div class="text-gray-500">Loading...</div>`);
      } else {
        _push(`<div class="grid grid-cols-6 gap-4"><!--[-->`);
        ssrRenderList(unref(files), (item) => {
          _push(`<div class="flex flex-col items-center p-2 hover:bg-gray-100 cursor-pointer"><div class="text-5xl">`);
          if (item.type == "folder") {
            _push(`<span>📁</span>`);
          } else if (item.type?.startsWith("image")) {
            _push(`<span>🖼️</span>`);
          } else {
            _push(`<span>📄</span>`);
          }
          _push(`</div><span class="text-xs text-center truncate w-full mt-1">${ssrInterpolate(item.name)}</span><div class="flex space-x-1 mt-1 text-xs text-gray-500"><button>✏️</button><button>🗑️</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (preview.value) {
        _push(`<div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"><div class="p-4 rounded-lg w-3/4 h-3/4 overflow-auto relative"><button class="absolute top-2 right-2 text-xl">✖</button><h3 class="font-semibold mb-2">${ssrInterpolate(preview.value.name)}</h3>`);
        if (isImage(preview.value.ext)) {
          _push(`<div><img${ssrRenderAttr("src", preview.value.content)} class="max-w-full max-h-[70vh] mx-auto"></div>`);
        } else {
          _push(`<pre class="text-sm whitespace-pre-wrap">${ssrInterpolate(preview.value.content)}</pre>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MediaManager.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MediaManager = Object.assign(_sfc_main$1, { __name: "MediaManager" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mediamgr",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-black p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(MediaManager, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/mediamgr.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=mediamgr-BpUu8Pq1.mjs.map
