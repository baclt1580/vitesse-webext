import { onMessage } from "webext-bridge/content-script";
import { useTranslate } from "../use/tranlate.use";
import { getElements } from "../render/wrapper.util";
import { franc } from "franc";

export function translateController(){
    let {translateVisible,translateAll,stopTranslate}=useTranslate()
    onMessage("translate_visible_c",()=>{
        translateVisible()
    })
    onMessage("translate_all_c",()=>{
        translateAll();
    })
    onMessage("stopTranslate",()=>{
        stopTranslate()
    })
    onMessage("getLang",()=>{
       let text= getElements(true).map(el=>el.textContent).join("").slice(0,5000);
       return franc(text)
    })
}