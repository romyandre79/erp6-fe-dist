import { ref } from 'vue';
import { u as useApi } from './useApi-2vD1WDJW.mjs';

function useWidgets() {
  const Api = useApi();
  const isLoading = ref(false);
  const fetchWidgets = async (modulename) => {
    try {
      isLoading.value = true;
      const dataForm = new FormData();
      dataForm.append("flowname", "getwidgetbymodule");
      dataForm.append("menu", "admin");
      dataForm.append("search", "true");
      dataForm.append("modulename", modulename);
      const res = await Api.post("admin/execute-flow", dataForm);
      if (res.code === 200) return res;
    } catch (e) {
      console.error("Error fetching widgets", e);
    } finally {
      isLoading.value = false;
    }
  };
  const getWidgetForm = async (slug) => {
    try {
      isLoading.value = true;
      const dataForm = new FormData();
      dataForm.append("flowname", "getwidgetname");
      dataForm.append("menu", "admin");
      dataForm.append("search", "true");
      dataForm.append("widgetname", slug);
      const res = await Api.post("admin/execute-flow", dataForm);
      if (res.code == 200) {
        return res;
      } else {
        throw new Error(res.message || $t("INVALID_CREDENTIAL"));
      }
    } catch (err) {
      console.error(err);
      throw new Error($t("INVALID_CREDENTIAL"));
    } finally {
      isLoading.value = false;
    }
  };
  return { isLoading, fetchWidgets, getWidgetForm };
}

export { useWidgets as u };
//# sourceMappingURL=useWidgets-Cg_E0AP3.mjs.map
