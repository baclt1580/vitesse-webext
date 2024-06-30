import { sendMessage } from "webext-bridge/content-script";

export function request(url:string,payload:any){
    return sendMessage(url,payload,"background")
}