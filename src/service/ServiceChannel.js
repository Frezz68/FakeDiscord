import { ServiceXhr } from "./ServiceXhr";

export const ServiceChannel = {
    getAllChannel: async () => {
        return ServiceXhr.callWithAuthNoBody('https://edu.tardigrade.land/msg/protected/user/channels', "GET");
    },
    /*
    create: async (title, description, listeId) => {
        const data = JSON.stringify({title: title, description: description, done: false, list: listeId});
        return ServiceXhr.callWithAuth("http://localhost:8080/api/v1/tasks", data, "POST");
    },
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