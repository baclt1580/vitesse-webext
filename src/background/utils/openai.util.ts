import { catchError, firstValueFrom, from, mergeMap, Observable, retry, Subscriber, timeout } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import { config } from "../config/config";

let subscriber:Subscriber<{msg:string,systemMsg?:string,resolve:any}>|null=null;
let observer=new Observable<{msg:string,systemMsg?:string,resolve:any}>(sub=>{
    subscriber=sub;
}).pipe(mergeMap(item=>{
    return from(sendOpenAiMessageInternal(item.msg,item.resolve,item.systemMsg))
},8)).subscribe()

export async function sendOpenAiMessage(msg: string, systemMsg?: string) {
    return new Promise<string>(resolve=>{
        subscriber?.next({msg,resolve,systemMsg})
    })
}

async function sendOpenAiMessageInternal(msg: string,resolve:any, systemMsg?: string) {
    let payload = {
        model: config.gpt.model,
        "messages": [
            { "role": "system", "content": systemMsg },
            { "role": "user", "content": msg }
        ],
        "temperature": config.gpt.temperature
    }
    try {
        let observable = fromFetch(config.gpt.baseUrl, {
            method: "post",
            headers: {
                Authorization: `Bearer ${config.gpt.key}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).pipe(timeout(config.gpt.timeout), retry(3), catchError(err => {
            console.error('Fetch failed after 3 retries:', err);
            throw err;
        }))

        let res = await firstValueFrom(observable);
        if (!(res.status + "").startsWith("20")) {
            console.log("gpt:非20x状态码")
            return null;
        }
        let resp = await res.json();
        if (resp) {
            resolve(resp.choices[0].message.content);
            return null;
        }
    } catch (e) {
        console.warn(e)
        return null
    }
}