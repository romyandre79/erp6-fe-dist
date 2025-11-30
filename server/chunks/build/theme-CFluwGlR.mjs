import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { A as useCookie } from './server.mjs';
import { u as useApi } from './useApi-2vD1WDJW.mjs';
import { u as useUserStore } from './user-COYhbsDQ.mjs';

const useThemeStore = defineStore("theme", () => {
  const Api = useApi();
  const themeCookie = useCookie("theme", { default: () => "" });
  const theme = ref(themeCookie.value);
  const themeData = ref(null);
  const themeList = ref([]);
  useUserStore();
  const loadThemes = async () => {
    const dataForm = new FormData();
    dataForm.append("flowname", "searchcombotheme");
    dataForm.append("menu", "admin");
    dataForm.append("search", "true");
    const res = await Api.post("admin/execute-flow", dataForm);
    themeList.value = res.data?.data || [];
  };
  const loadSingleThemes = async (themename) => {
    const dataForm = new FormData();
    dataForm.append("flowname", "getthemebyname");
    dataForm.append("menu", "admin");
    dataForm.append("search", "true");
    dataForm.append("themename", themename);
    const res = await Api.post("admin/execute-flow", dataForm);
    themeData.value = res.data?.data || [];
  };
  const saveActiveTheme = async (newData) => {
    const dataForm = new FormData();
    dataForm.append("flowname", "modiftheme");
    dataForm.append("themedata", newData);
    dataForm.append("themeid", themeData.value.themeid);
    dataForm.append("themename", themeData.value.themename);
    dataForm.append("createdby", themeData.value.createdby);
    dataForm.append("description", themeData.value.description);
    dataForm.append("recordstatus", themeData.value.recordstatus);
    dataForm.append("menu", "admin");
    dataForm.append("search", "false");
    await Api.post("admin/execute-flow", dataForm);
  };
  const applyCurrentTheme = async () => {
    applyTheme(themeCookie.value);
  };
  const applyTheme = async (key) => {
    await loadThemes();
    const found = themeList.value.find((t) => t.themeid === key);
    if (!found) return;
    const themeData2 = typeof found.themedata === "string" ? JSON.parse(found.themedata) : found.themedata;
    for (const [name, val] of Object.entries(themeData2)) {
      if (val !== null && val !== void 0 && val !== "") {
        (void 0).documentElement.style.setProperty(`--${name}`, String(val));
      }
    }
    theme.value = key;
    themeCookie.value = key;
    (void 0).documentElement.setAttribute("data-theme", key);
  };
  watch(theme, (val, old) => {
    if (val !== old) applyTheme(val);
  });
  return {
    theme,
    themeData,
    themeList,
    applyTheme,
    applyCurrentTheme,
    loadThemes,
    loadSingleThemes,
    saveActiveTheme
  };
});

export { useThemeStore as u };
//# sourceMappingURL=theme-CFluwGlR.mjs.map
