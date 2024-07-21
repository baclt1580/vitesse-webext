<script lang='ts' setup>
import { sendMessage } from "webext-bridge/popup";
import YellowButton from "~/popup/components/button/YellowButton/YellowButton.vue";
import { translateSetting } from '~/common/storage/translateSetting.use';
import { translateStatus } from "~/common/storage/translateStatus.use";

async function doTranslate(){
    if(translateStatus.value=="translating")return;
    let tabs = await browser.tabs.query({ active: true, currentWindow: true })
     const activeTab = tabs[0];
     sendMessage("translate_visible_c",null,`content-script@${activeTab.id}`)
}
async function doStopTranslate(){
    if(translateStatus.value!="translating")return;
    let tabs = await browser.tabs.query({ active: true, currentWindow: true })
    const activeTab = tabs[0];
    sendMessage("stopTranslate",null,`content-script@${activeTab.id}`)
}

</script>
<template>
    <div class="flex justify-center">
        {{ translateStatus }}
        <YellowButton class="px-8 py-2" v-show="translateStatus=='free'" @click="doTranslate">
            <span class="text-base">翻译</span>
        </YellowButton>
        <YellowButton class="px-8 py-2" v-show="translateStatus=='translating'" @click="doStopTranslate">
            <span class="text-base">停止翻译</span>
        </YellowButton>
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>