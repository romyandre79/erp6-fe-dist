import { u as useUserStore } from './user-COYhbsDQ.mjs';
import { c as useRuntimeConfig } from './server.mjs';

const useApi = () => {
  const config = useRuntimeConfig();
  const userStore = useUserStore();
  userStore.loadAuth();
  const token = userStore.token;
  const getHeaders = (body) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  };
  const get = async (url) => await $fetch(url, { baseURL: config.public.apiBase, headers: getHeaders() });
  const post = async (url, body) => await $fetch(url, {
    method: "POST",
    baseURL: config.public.apiBase,
    headers: getHeaders(body),
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
  const donlotFile = async (urlFile, body, fileName) => {
    try {
      const response = await fetch(`${config.public.apiBase}${urlFile}`, {
        method: "POST",
        headers: getHeaders(body),
        body: body instanceof FormData ? body : JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      const contentDisposition = response.headers.get("Content-Disposition");
      const suggestedName = contentDisposition?.split("filename=")[1]?.replace(/["']/g, "") || fileName;
      const a = (void 0).createElement("a");
      a.href = url;
      a.download = suggestedName;
      (void 0).body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error saat download file:", err);
    }
  };
  const put = async (url, body) => await $fetch(url, {
    method: "PUT",
    baseURL: config.public.apiBase,
    headers: getHeaders(body),
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
  const del = async (url) => await $fetch(url, { method: "DELETE", baseURL: config.public.apiBase, headers: getHeaders() });
  return { get, post, put, del, donlotFile };
};

export { useApi as u };
//# sourceMappingURL=useApi-2vD1WDJW.mjs.map
