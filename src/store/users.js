import { defineStore } from "pinia";

export const useUserStore = defineStore("users", {
    state: () => ({
        users: [],
        userIsModerator: false,
        loginUserName: '',
        channels: []
    }),
    actions: {
        moderation: function (isModerator) {
            this.userIsModerator = isModerator;
            console.log("addind bool data to store :", isModerator);
        },
        setName: function (name) {
            this.loginUserName = name;
        },
        filterChannel: function (currentId, channels) {
            let filteredChannels = channels.find(channel => channel.id == currentId)
            if (!filteredChannels) return;
            return filteredChannels
        }
    },
})