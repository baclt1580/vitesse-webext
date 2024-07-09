<script lang='ts' setup>
import Radio from '~/popup/components/Radio/Radio.vue';
import { translateSetting } from '~/common/storage/translateSetting.use';
</script>
<template>
    <div>
        <section class="flex items-start">
            <span class="text-xl font-kt">译文位置</span>
            <img class="w-5 ml-1" src="./assets/img/icon.svg" />
        </section>
        <section class="mt-2 space-x-4">
            <Radio name="radio-showMode" value="bottom" v-model="translateSetting.showMode">原文下方</Radio>
            <Radio name="radio-showMode" value="replace" v-model="translateSetting.showMode">替换原文</Radio>
        </section>
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>