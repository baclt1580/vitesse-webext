import { onMessage } from "webext-bridge/content-script";
import { useTranslate } from "../use/tranlate.use";

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
}