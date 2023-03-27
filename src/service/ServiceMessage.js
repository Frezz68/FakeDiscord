import { ServiceXhr } from "./ServiceXhr";

export const ServiceMessage = {
    getAllMessages: async (channelId) => {
        return ServiceXhr.callWithAuthNoBody('https://edu.tardigrade.land/msg/protected/channel/'+channelId+'/messages/0', "GET");
    },
    sendMessage: async (channelId, contentMsg) => {
        return ServiceXhr.callWithAuth('https://edu.tardigrade.land/msg/protected/channel/'+channelId+'/message', JSON.stringify({ Text : contentMsg}), "POST");
    },
    sendImage: async (channelId, Image) => {
        return ServiceXhr.callWithAuth('https://edu.tardigrade.land/msg/protected/channel/'+channelId+'/message', JSON.stringify({Image: Image}), "POST");
    },
    editMessage: async (channelId, data) => {
        return ServiceXhr.callWithAuth('https://edu.tardigrade.land/msg/protected/channel/'+channelId+'/message/moderate', JSON.stringify(data), "POST");
    }
}