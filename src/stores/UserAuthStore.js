import { defineStore } from "pinia";

export const useUserAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false
    }),
    actions: {
        login(isLoggedIn) {
            this.isLoggedIn = isLoggedIn;
        }
    },
    getters: {
        isUserLoggedIn() {
            return this.isLoggedIn
        }
    }
})