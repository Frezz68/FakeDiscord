import { defineStore } from "pinia";

export const useUserStore = defineStore("users",{
    state: () => ({
        users: [],
        userIsModerator:false,
        loginUserName:''
    }),
    actions: {
        moderation: function(isModerator){
            this.userIsModerator = isModerator;
            console.log("addind bool data to store :", isModerator);
        },
        setName: function(name){
            this.loginUserName = name;
        }
    },   
})