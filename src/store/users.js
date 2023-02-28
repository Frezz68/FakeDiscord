import { defineStore } from "pinia";

export const useUserStore = defineStore("users",{
    state: () => ({
        users: []
    }),
    actions: {
        getUser : function (id){
            return this.users.find((e) => e.id === id);
        },
        setUser : function (user){
            this.users.push(user);
        },
    }
})