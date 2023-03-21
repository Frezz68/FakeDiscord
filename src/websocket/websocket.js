export const getWebSocket = (chanelId,token) =>{
    return new Promise((res,rej) =>{
        const ws = new WebSocket(`wss://edu.tardigrade.land/msg/ws/channel/${chanelId}/token/${token}`);
        ws.onopen = ()=>{
            res(ws);
        }
        ws.onerror = () => {
            rej(ws)
        }
    })
}