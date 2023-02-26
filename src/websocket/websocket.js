let webSocket = null;
export const getWebSocket = (chanelId,token) =>{
    if(webSocket){
        return Promise.resolve(webSocket);
    }
    return new Promise((res,rej) =>{
        const ws = new WebSocket(`ws://https://edu.tardigrade.land/msg/ws/channel/${chanelId}/token/${token}`);
        ws.onopen = ()=>{
            webSocket = ws
            res(ws);
        }
        ws.onclose = () => {
            webSocket = null;
        }
        ws.onerror = () => {
            rej(ws)
        }
    })
}

export const sendClick = async () => {
    (await getWebSocket()).send("click");
}