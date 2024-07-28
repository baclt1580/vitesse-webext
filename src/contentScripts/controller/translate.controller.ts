import { onMessage } from "webext-bridge/content-script";
import { useTranslate } from "../use/tranlate.use";
import { getElements } from "../render/wrapper.util";
import { franc } from "franc-min";
import { getLangByl3, getLangWithZh } from "~/popup/common/utils/lang.utils";

export function translateController() {
    let { translateVisible, translateAll, stopTranslate } = useTranslate()
    onMessage("translate_visible_c", () => {
        translateVisible()
    })
    onMessage("translate_all_c", () => {
        translateAll();
    })
    onMessage("stopTranslate", () => {
        stopTranslate()
    })
    onMessage("getLang", () => {
        let langAttr=document.documentElement.lang;
        if (langAttr) {
            if(langAttr.includes("-")){
                langAttr=langAttr.split("-")[0];
            }
            let lang = getLangWithZh(langAttr);
            if (lang) {
                return lang;
            }
        }
        let text = getElements(true).map(el => {
            return el.textContent;
        }).join("").slice(0, 5000);
        let l3 = franc(text);
        let lang = getLangByl3(l3);
        console.log("lang", lang)
        if (lang?.lang[1]) {
            document.documentElement.lang = lang?.lang[1];
        }
        return lang;
    })
}