<script lang='ts' setup>
import { sendMessage } from 'webext-bridge/popup';
import { Status } from '~/contentScripts/state/status.state';
import { useActiveTab } from '~/popup/common/use/useActiveTab.use';
import { getActiveTab } from '~/popup/common/utils/utils';
let status = ref<Status | null>();
let statusText = computed(() => {

    switch (status.value) {
        case "success":
            return "已注入";
        case "loading":
            return "注入中";
        case "error":
            return "注入失败";
    }
})
let activeTab = useActiveTab()
async function load() {
    let tab = await getActiveTab();
    let res = await sendMessage("getStatus_c", null, `content-script@${tab.id}`)
    status.value = res;
}

onBeforeMount(() => {
    load()
})
let allow = computed(() => {
    return activeTab.value?.url?.startsWith('http') || activeTab.value?.url?.startsWith('https');
})

</script>
<template>
    <div class="flex items-center" v-if="!allow">
        <img src="./assets/img/error.svg" class="w-5" >
        <span class="ml-1 text-xs  font-[500] text-[#ed7899]">
            这个页面不能注入
        </span>
    </div>
    <div class="flex items-center" v-else>
        <img src="./assets/img/ok.svg" class="w-6" v-if="status == 'success'">
        <img src="./assets/img/error.svg" class="w-6" v-if="status == 'error'">
        <span class="ml-1 text-xs  font-[500]"
            :class="{ 'text-[#38b47b]': status == 'success', 'text-[#ed7899]': status == 'error' }">{{ statusText }}</span>
    </div>


</template>

<script lang='ts'>


export default {

}
</script>

<style></style>