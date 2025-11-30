import { u as useUserStore } from './user-COYhbsDQ.mjs';
import { u as useApi } from './useApi-2vD1WDJW.mjs';
import { l as useRouter, n as navigateTo } from './server.mjs';
import { computed } from 'vue';

const useAuth = () => {
  const userStore = useUserStore();
  const { post, get } = useApi();
  const router = useRouter();
  const login = async (payload) => {
    try {
      const res = await post("/auth/login", payload);
      if (res.code == 200) {
        userStore.setAuth(res.data?.token, res.data.user);
        navigateTo("/admin/dashboard");
      } else {
        throw new Error(res.message || $t("INVALID CREDENTIAL"));
      }
    } catch (err) {
      console.error(err);
      throw new Error($t("INVALID CREDENTIAL"));
    }
  };
  const me = async () => {
    try {
      const res = await get("/auth/me");
      if (res.code == 200) {
        return res;
      } else {
        (void 0).logout();
        throw new Error(res.message || $t("INVALID CREDENTIAL"));
      }
    } catch (err) {
      console.error(err);
      (void 0).logout();
      throw new Error($t("INVALID CREDENTIAL"));
    }
  };
  const updateUserTheme = async (themeid) => {
    try {
      const dataForm = new FormData();
      dataForm.append("flowname", "modifusertheme");
      dataForm.append("menu", "admin");
      dataForm.append("search", "true");
      dataForm.append("themeid", themeid);
      dataForm.append("useraccessid", userStore.user?.userid);
      dataForm.append("languageid", userStore.user?.languageid);
      const res = await post("admin/execute-flow", dataForm);
      if (res.code == 200) {
        userStore.setAuth(userStore.token, {
          ...userStore.user,
          themeid
        });
        return res;
      } else {
        throw new Error(res.message || $t("INVALID CREDENTIAL"));
      }
    } catch (err) {
      console.error(err);
      (void 0).logout();
      throw new Error($t("INVALID CREDENTIAL"));
    }
  };
  const updateUserLanguage = async (languageid) => {
    try {
      const dataForm = new FormData();
      dataForm.append("flowname", "modifusertheme");
      dataForm.append("menu", "admin");
      dataForm.append("search", "true");
      dataForm.append("themeid", userStore.user?.themeid);
      dataForm.append("useraccessid", userStore.user?.userid);
      dataForm.append("languageid", languageid);
      const res = await post("admin/execute-flow", dataForm);
      if (res.code == 200) {
        return res;
      } else {
        throw new Error(res.message || $t("INVALID CREDENTIAL"));
      }
    } catch (err) {
      console.error(err);
      (void 0).logout();
      throw new Error($t("INVALID CREDENTIAL"));
    }
  };
  const getMenuForm = async (slug) => {
    try {
      const dataForm = new FormData();
      dataForm.append("flowname", "getmenubyname");
      dataForm.append("menu", "admin");
      dataForm.append("search", "true");
      dataForm.append("menuname", slug);
      const res = await post("admin/execute-flow", dataForm);
      if (res.code == 200) {
        return res;
      } else {
        throw new Error(res.message || $t("INVALID CREDENTIAL"));
      }
    } catch (err) {
      console.error(err);
      throw new Error($t("INVALID CREDENTIAL"));
    }
  };
  const logout = async () => {
    userStore.logout();
    await router.push("/login");
  };
  const isAuthenticated = computed(() => !!userStore.token);
  return { login, logout, updateUserTheme, updateUserLanguage, me, getMenuForm, isAuthenticated };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-DxiGeqFG.mjs.map
