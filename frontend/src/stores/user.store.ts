import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    const savedUser = localStorage.getItem("currentUser");

    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    return {
      isLoggedIn: !!currentUser,
      username: currentUser?.username || "",
      role: currentUser?.role || "",
    };
  },

  actions: {
    login(username: string, role: string) {
      this.isLoggedIn = true;
      this.username = username;
      this.role = role;
    },

    logout() {
      this.isLoggedIn = false;
      this.username = "";
      this.role = "";

      localStorage.removeItem("currentUser");
    },
  },
});
