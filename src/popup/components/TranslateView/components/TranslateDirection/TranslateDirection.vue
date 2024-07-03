<script lang='ts' setup>
import langs from 'langs-es';
import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage';
import { TranslateSetting, getDefaultSetting } from '~/contentScripts/use/tranlate.use';
import { getZhLang, langList } from '~/popup/common/utils/lang.utils';
let options: Ref<{ label: string, local: string, value: any }[]> = ref([])
onBeforeMount(() => {
    options.value = langList.map(({ lang, zh }) => {
        return {
            label: zh || lang.name,
            local: lang.local || lang.name,
            value: lang[1]
        }
    })
});
const setting: Ref<TranslateSetting> = useWebExtensionStorage<TranslateSetting>("translateSetting", getDefaultSetting());
let from = computed({
    get() {
        return setting.value.from?.[1] || null
    },
    set(v) {
        setting.value.from = langs.all().find(item => item[1] == v);
    }
})
let to = computed({
    get() {
        return setting.value.to?.[1] || null
    },
    set(v) {
        setting.value.to = langs.all().find(item => item[1] == v);
    }
})
</script>
<template>
    <div class="flex items-center space-x-2">
        <n-select v-model:value="from" :options="options" />
        <img src="./assets/img/rtight.png" class="w-10" alt="">
        <n-select v-model:value="to" label-field="local" :options="options" />
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>