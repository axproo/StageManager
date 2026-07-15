import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
  }),

  actions: {
    login(name: string) {
      this.username = name;
    },
  },
});
