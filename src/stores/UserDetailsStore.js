import { defineStore } from "pinia";

export const useUserDetailsStore = defineStore('userDetailsStore', {
    state: () => ({
        users: [
            {
                userEmail: '',
                userPassword: '',
                userRole: ''
            }
        ]
    }),
    actions: {
        addUser(user) {
            this.users.push(user)
        }
    },
    getters: {
        getAllUsers() {
            return this.users
        }
    }
})