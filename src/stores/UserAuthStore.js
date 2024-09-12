import { defineStore } from "pinia";

export const useUserAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        authLevel: ''
    }),
    actions: {
        loginUser({ isLoggedIn, authLevel }) {
            this.isLoggedIn = isLoggedIn;
            this.authLevel = authLevel;
        }
    },
    getters: {
        isUserLoggedIn() {
            return this.isLoggedIn;
        },
        authenticationLevel() {
            return this.authLevel;
        }
    }
});