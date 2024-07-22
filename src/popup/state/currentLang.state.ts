import { sendMessage } from "webext-bridge/popup";
import { translateStatus } from "~/common/storage/translateStatus.use"
import { useActiveTab } from "~/common/use/useActiveTab.use"

export const currentLang=ref<string>("")
let {activeTab}=useActiveTab();
watch(activeTab,()=>{
    let unwatch=watch(translateStatus,async status=>{
        if(status=="free"){
            let res=await sendMessage("getLang",null,`content-script@${activeTab.value?.id}`)
            currentLang.value=res as string
            unwatch()
        }
    })
},{immediate:true})
