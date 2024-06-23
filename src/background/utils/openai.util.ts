import { TextNode } from "../translator/Translate.abstract";

export async function sendOpenAiMessage(msg: string,systemMsg?:string) {
    let payload = {
        model: "gpt-3.5-turbo-0125",
        "messages": [
            {"role":"system","content":systemMsg},
            { "role": "user", "content": msg }
        ],
        "temperature": 0.8
    }
    try {
        let res = await fetch("https://api.gpt.ge/v1/chat/completions", {
            method: "post",
            headers: {
                Authorization: "Bearer sk-GAW4QnZ6MJP6R4gkEd550469FeF94f87Ad7f5f623bAb3a03",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
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

export function splitContentsByLength(objects: TextNode[], maxLength: number = 600): TextNode[][] {
    const result: TextNode[][] = [];
    let currentBatch: TextNode[] = [];
    let currentLength: number = 0;
  
    for (const obj of objects) {
      // 如果当前批次加上当前对象会超过最大长度，则保存当前批次并开始新的批次
      if (currentLength + obj.content.length > maxLength) {
        result.push(currentBatch);
        currentBatch = [];
        currentLength = 0;
      }
  
      // 将当前对象添加到当前批次
      currentBatch.push(obj);
      currentLength += obj.content.length;
    }
  
    // 不要忘记在结束时添加最后一个批次
    if (currentBatch.length > 0) {
      result.push(currentBatch);
    }
  
    return result;
  }
  