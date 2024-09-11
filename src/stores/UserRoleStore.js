import { defineStore } from "pinia";

export const useUserRoleStore = defineStore('userRole', {
    state: () => ({
        role: ''
    }),
    actions: {
        role(role) {
            this.role = role;
        }
    },
    getters: {
        getRole() {
            return this.role
        }
    }
})