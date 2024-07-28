import { sendMessage } from "webext-bridge/popup";
import { translateStatus } from "~/common/storage/translateStatus.use"
import { useActiveTab } from "~/common/use/useActiveTab.use"
import { langWithZh } from "../common/utils/lang.utils";

export const currentLang=ref<langWithZh|null>(null)
let {activeTab}=useActiveTab();
watch(activeTab,()=>{
    let unwatch=watch(translateStatus,async status=>{
        if(status=="free"){
            let res=await sendMessage("getLang",null,`content-script@${activeTab.value?.id}`)
            currentLang.value=res as unknown as langWithZh
            unwatch()
        }
    })
},{immediate:true})
