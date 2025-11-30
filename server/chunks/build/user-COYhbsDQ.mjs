import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { A as useCookie, n as navigateTo } from './server.mjs';

const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    user: null
  }),
  actions: {
    setAuth(token, user) {
      this.token = token;
      this.user = user;
      const tokenCookie = useCookie("token", { path: "/", maxAge: 60 * 60 * 24 * 7 });
      const userCookie = useCookie("user", { path: "/", maxAge: 60 * 60 * 24 * 7 });
      tokenCookie.value = token;
      userCookie.value = JSON.stringify(user);
    },
    loadAuth() {
      const tokenCookie = useCookie("token");
      const userCookie = useCookie("user");
      const token = tokenCookie.value;
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1e3;
          if (decoded.exp && decoded.exp < now) {
            console.warn("⚠️ Token expired, logout otomatis");
            this.logout();
            return;
          }
          this.token = token;
        } catch (err) {
          console.error("❌ Token invalid:", err);
          this.logout();
          return;
        }
      } else {
        this.token = null;
      }
      try {
        if (userCookie.value && typeof userCookie.value === "string") {
          this.user = JSON.parse(decodeURIComponent(userCookie.value));
        } else {
          this.user = userCookie.value;
        }
      } catch (err) {
        console.error("❌ Gagal parse cookie user:", err);
        this.user = null;
        this.logout();
      }
    },
    logout() {
      const tokenCookie = useCookie("token");
      const userCookie = useCookie("user");
      tokenCookie.value = null;
      userCookie.value = null;
      this.token = null;
      this.user = null;
      navigateTo("/login");
    }
  }
});

export { useUserStore as u };
//# sourceMappingURL=user-COYhbsDQ.mjs.map
