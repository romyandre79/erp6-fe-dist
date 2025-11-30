import { ref } from 'vue';
import { a as useI18n, c as useRuntimeConfig } from './server.mjs';
import { u as useApi } from './useApi-2vD1WDJW.mjs';

const useArticle = () => {
  const { get } = useApi();
  const { t } = useI18n();
  const config = useRuntimeConfig();
  const loading = ref(false);
  const error = ref(null);
  const getAllArticle = async () => {
    try {
      loading.value = true;
      error.value = "";
      const res = await get("/blog/post?companyid=" + config.public.companyId);
      if (res?.code == 200) {
        return res;
      } else {
        error.value = res?.message;
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  const getArticle = async (slug) => {
    try {
      loading.value = true;
      error.value = "";
      const res = await get("/blog/post/slug?slug=" + slug);
      if (res.code == 200) {
        return res.data;
      } else {
        error.value = t("INVALID_DATA_RETRIEVED");
      }
    } catch (err) {
      error.value = t("INVALID_DATA_RETRIEVED");
    } finally {
      loading.value = false;
    }
  };
  return { getAllArticle, getArticle, loading, error };
};

export { useArticle as u };
//# sourceMappingURL=useArticle-LffJVAPV.mjs.map
