import {ServiceXhr} from "./ServiceXhr";

export const ServiceUtilisateur = {
    login: async (username, password) => {
        const data = JSON.stringify({username: username, password: password});
        return ServiceXhr.callWithoutAuth("https://edu.tardigrade.land/msg/login", data, "POST");
    }
}