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