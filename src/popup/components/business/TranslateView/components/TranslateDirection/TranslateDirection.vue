<script lang='ts' setup>
import { translateSetting } from '~/common/storage/translateSetting.use';
import { langList } from '~/popup/common/utils/lang.utils';

let options: Ref<{ label: string, local: string, value: any }[]> = ref([])
let fromOptions = computed(() => {
    return [
        {
            label: "自动",
            local: null,
            value: "auto"
        },
        ...options.value
    ]
})

onBeforeMount(() => {
    options.value = langList.map(({ lang, zh }) => {
        return {
            label: zh || lang.name,
            local: lang.local || lang.name,
            value: lang[1]
        }
    })
});
let from = computed({
    get() {
        return translateSetting.value.from
    },
    set(v) {
        translateSetting.value.from = v
    }
})
let to = computed({
    get() {
        
        return translateSetting.value.to
    },
    set(v) {
        translateSetting.value.to = v
    }
})


</script>
<template>
    <div class="flex items-center space-x-2">
        <n-select v-model:value="from" :options="fromOptions" />
        <img src="./assets/img/rtight.png" class="w-8" alt="">
        <n-select v-model:value="to" label-field="local" :options="options" />
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>