<script lang='ts' setup>
import { sendMessage } from "webext-bridge/popup";
import YellowButton from "~/popup/components/button/YellowButton/YellowButton.vue";
import { translateStatus } from "~/common/storage/translateStatus.use";
import { currentLang } from '~/popup/state/currentLang.state';
import { translateSetting } from "~/common/storage/translateSetting.use";
async function doTranslate() {
    if (translateStatus.value == "translating") return;
    let tabs = await browser.tabs.query({ active: true, currentWindow: true })
    const activeTab = tabs[0];
    sendMessage("translate_visible_c", null, `content-script@${activeTab.id}`)
}
async function doStopTranslate() {
    if (translateStatus.value != "translating") return;
    let tabs = await browser.tabs.query({ active: true, currentWindow: true })
    const activeTab = tabs[0];
    sendMessage("stopTranslate", null, `content-script@${activeTab.id}`)
}
let isNotNeedTranslate=ref(false)
watch(currentLang,()=>{
    isNotNeedTranslate.value=currentLang.value?.lang[1]==translateSetting.value.to;
},{
    immediate:true
})

</script>
<template>
    <div class="flex justify-center">
        <YellowButton class="px-8 py-2" v-show="translateStatus == 'free'&&!isNotNeedTranslate" @click="doTranslate">
            <span class="text-base">翻译</span>
        </YellowButton>
        <YellowButton class="px-8 py-2" v-show="translateStatus == 'translating'&&!isNotNeedTranslate" @click="doStopTranslate">
            <span class="text-base">停止翻译</span>
        </YellowButton>
        <span class="text-[12px] text-gray-400" v-show="isNotNeedTranslate">页面语言和目标语言相同,无需翻译</span>
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>