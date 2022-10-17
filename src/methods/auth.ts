import * as net from 'net';
import { method, part, serverdata } from '../server'

class auth implements method {

    serverData: serverdata

    constructor() { }

    phrase(
        id: number,
        data: Buffer,
        socket: net.Socket,
        sockname: string
    ): {
        response: any;
        respond: (data: any) => void;
    } {
        var name = data.subarray(1, data[0] + 1).toString('ascii')
        this.serverData.sockets.set(name, socket)
        this.serverData.socketInfo.set(name, {})
        socket.once('close', ()=>{
            this.serverData.sockets.delete(name)
            this.serverData.socketInfo.delete(name)
        })

        return {
            response: {},
            respond(data) {

            },
        }
    };

    id: 0;

}