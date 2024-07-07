<script lang='ts' setup>
import { translateSetting } from '~/common/storage/translateSetting.use';
import Tooltip from '~/popup/components/Tooltip/Tooltip.vue';


</script>
<template>
  <div>
    <section class="flex items-center">
      <span class="text-xl font-kt">翻译范围</span>
      <img class="w-4 ml-1" src="./assets/img/icon.png" />
    </section>
    <div class="radio-buttons-container mt-2">
      <div class="radio-button">
        <input name="radio-group" id="radio2" value="visible" v-model="translateSetting.rangeRange" class="radio-button__input" type="radio">
        <label for="radio2" class="radio-button__label">
          <span class="radio-button__custom"></span>
          可见区域
        </label>
      </div>
      <div class="radio-button">
        <input name="radio-group" id="radio1" value="manual" v-model="translateSetting.rangeRange" class="radio-button__input" type="radio">
        <label for="radio1" class="radio-button__label">
          <span class="radio-button__custom"></span>
          <div class="flex items-center"> 手动 
            <Tooltip content="点一下翻译一下当前可见区域的内容" class="ml-2">
              <img src="https://img.icons8.com/dusk/64/ask-question.png" class="w-5">
            </Tooltip>
          </div>
        </label>
      </div>
      <div class="radio-button">
        <input name="radio-group" id="radio3" value="all" v-model="translateSetting.rangeRange" class="radio-button__input" type="radio">
        <label for="radio3" class="radio-button__label">
          <span class="radio-button__custom"></span>
          整个页面
        </label>
      </div>
    </div>


  </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style scoped>
.radio-buttons-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.radio-button {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.radio-button__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-button__label {
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 10px;
  position: relative;
  font-size: 14px;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

.radio-button__custom {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #555;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

.radio-button__input:checked+.radio-button__label .radio-button__custom {
  transform: translateY(-50%) scale(0.9);
  border: 5px solid #4c8bf5;
  color: #4c8bf5;
}

.radio-button__input:checked+.radio-button__label {
  color: #4c8bf5;
}

.radio-button__label:hover .radio-button__custom {
  transform: translateY(-50%) scale(1.2);
  border-color: #4c8bf5;
  box-shadow: 0 0 10px #4c8bf580;
}
</style>