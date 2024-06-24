import { onMessage, sendMessage } from "webext-bridge/background";
import { translators } from "../state/translators";
import { GPTTranslator } from "../translator/GPTTranslator";
import { TextNode } from "../translator/Translate.abstract";

export function init() {
    initTranslator()
}

function initTranslator() {
    translators.set("gpt", new GPTTranslator())
    onMessage("translate", async (e) => {
        console.log("收到翻译请求",e)
       
        let data= e.data as {
            type:string,
            textNodes:TextNode[]
        }
        if(!data.textNodes?.length){
            console.warn("翻译:收到的数据有问题");
            return;
        }
        let translator = translators.get("gpt")
        if (translator) {
            let tabId=e.sender.tabId;
           
             translator.translate(data.textNodes,res=>{
                console.log("type",data.type)
                sendMessage("translate_result",{type:data.type,textNodes:res},`content-script@${tabId}`)
             },{ url: "" });
        }
    })
}