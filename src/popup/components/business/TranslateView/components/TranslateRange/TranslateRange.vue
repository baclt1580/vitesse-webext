<script lang='ts' setup>
import { translateSetting } from '~/common/storage/translateSetting.use';
import Tooltip from '~/popup/components/Tooltip/Tooltip.vue';
import Radio from '~/popup/components/Radio/Radio.vue';

</script>
<template>
  <div>
    <section class="flex items-center">
      <span class="text-xl font-kt">翻译范围</span>
      <img class="w-4 ml-1" src="./assets/img/icon.png" />
    </section>
    <div class="mt-2 space-x-4">
      <Radio name="radio-group" value="visible" v-model="translateSetting.rangeRange">可见区域</Radio>
      <Radio name="radio-group" value="manual" v-model="translateSetting.rangeRange">
        <div class="flex items-center"> 手动 
            <Tooltip content="点一下翻译一下当前可见区域的内容" class="ml-2">
              <img src="https://img.icons8.com/dusk/64/ask-question.png" class="w-5">
            </Tooltip>
          </div>
      </Radio>
      <Radio name="radio-group" value="all" v-model="translateSetting.rangeRange">
        整个页面
      </Radio>
    </div>


  </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style>

</style>