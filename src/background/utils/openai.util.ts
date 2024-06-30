import { catchError, firstValueFrom, from, of, retry, timeout } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import { config } from "../config/config";
export async function sendOpenAiMessage(msg: string, systemMsg?: string) {
    let payload = {
        model: "gpt-3.5-turbo-0125",
        "messages": [
            { "role": "system", "content": systemMsg },
            { "role": "user", "content": msg }
        ],
        "temperature": 0.8
    }
    try {
        let observable = fromFetch(config.gpt.baseUrl, {
            method: "post",
            headers: {
                Authorization: `Bearer ${config.gpt.key}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).pipe(timeout(12000),retry(3),catchError(err => {
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
            return resp.choices[0].message.content as string
        }
    } catch (e) {
        console.warn(e)
        return null
    }
}

