import * as net from 'net'
import { type } from 'os'

type flagset = Boolean[]
type part = Buffer | string | number | flagset
type serverdata = {
    netServer?: net.Server
    sockets?: Map<string, net.Socket>
    socketInfo?: Map<string, Object>
    
    methods?: Map<number, method>
}
interface method {
    id: number,
    phrase: (
        id: number, 
        parts: Buffer,
        socket: net.Socket, 
        sockname: string
        ) => { 
        response: any, 
        respond: (data: any) => void 
    }
}

class STSMPServer {

    #serverData: serverdata

    constructor(serverOptions?: {
        port?: number,
        host?: string,
        maxBackLog?: number
    }) {
        this.#serverData = {}
        this.#serverData.netServer = net.createServer({
        }, this.#connectionHandler)
            .listen(
                serverOptions?.port,
                serverOptions?.host,
                serverOptions?.maxBackLog
            )
        this.#serverData.sockets = new Map
    }

    async #connectionHandler(socket: net.Socket) {
        var authed = false

        
    }
}

/* 

STANDARD: [ TYPE, ID, ID, ID, ID, LEN, LEN, LEN, LEN, ...PAYLOAD ]
PAYLOADS: 
    AUTH            : [ NAMELEN, ...NAME ]
    RESPONSE        : [ PKTID, PKTID, PKTID, PKTID, RESCODE, RESMESSAGELEN, ...RESMESSAGE ]
*/

export { method, part, flagset, serverdata, STSMPServer }