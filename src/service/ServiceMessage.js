import { ServiceXhr } from "./ServiceXhr";

export const ServiceMessage = {
    getAllMessages: async (channelId) => {
        return ServiceXhr.callWithAuthNoBody('https://edu.tardigrade.land/msg/protected/channel/'+channelId+'/messages/40', "GET");
    },
    sendMessage: async (channelId, contentMsg) => {
        return ServiceXhr.callWithAuth('https://edu.tardigrade.land/msg/protected/channel/'+channelId+'/message', JSON.stringify({ Text : contentMsg}), "POST");
    }
}