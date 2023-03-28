import { ServiceXhr } from "./ServiceXhr";

export const ServiceChannel = {
    getAllChannel: async () => {
        return ServiceXhr.callWithAuthNoBody('https://edu.tardigrade.land/msg/protected/user/channels', "GET");
    },
    addUserToChannel: async (channelId, userId) => {
        return ServiceXhr.callWithAuthNoBody(`https://edu.tardigrade.land/msg/protected/channel/${channelId}/user/${userId}`, "PUT");
    },
    removeUserFromChannel: async (channelId, userId) => {
        return ServiceXhr.callWithAuthNoBody(`https://edu.tardigrade.land/msg/protected/channel/${channelId}/user/${userId}`, "DELETE");
    },
    addChannel: async (name, image) => {
        const data = JSON.stringify({ name: name, img: image });
        return ServiceXhr.callWithAuth("https://edu.tardigrade.land/msg/protected/channel", data, "PUT");
    },
    deleteChannel: async (id) => {
        return ServiceXhr.callWithAuthNoBody(`https://edu.tardigrade.land/msg/protected/channel/${id}`, "DELETE");
    },
    editChannel: async (id, name, image , theme) => {
        const data = JSON.stringify({
            name: name,
            img: image,
            theme: theme
        });
        return ServiceXhr.callWithAuth(`https://edu.tardigrade.land/msg/protected/channel/${id}/update_metadata`, data, "POST");
    }
    /*
    modify: async (id, title, description, isDone, listeId) => {
        const data = JSON.stringify({title: title, description: description, done: isDone, list: listeId});
        const url = "http://localhost:8080/api/v1/tasks/" + id;
        return ServiceXhr.callWithAuth(url, data, "PUT");
    },
    delete: async (id) => {
        const url = "http://localhost:8080/api/v1/tasks/" + id;
        return ServiceXhr.callWithAuthNoBody(url, "DELETE");
    }*/
}