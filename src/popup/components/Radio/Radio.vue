<script lang='ts' setup>
import {v1} from "uuid"
defineProps<{
  name: string,
  value: string
}>()
let modelValue = defineModel("modelValue");
let id=v1();
</script>
<template>
  <div class="radio-button">
    <input :name="name" :id="id" :value="value" v-model="modelValue" class="radio-button__input" type="radio">
    <label :for="id" class="radio-button__label">
      <span class="radio-button__custom"></span>
      <slot></slot>
    </label>
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
  border: 5px solid #52bfa1;
  color: #52bfa1;
}

.radio-button__input:checked+.radio-button__label {
  color: #000000;
}

.radio-button__label:hover .radio-button__custom {
  transform: translateY(-50%) scale(1.2);
  border-color: #52bfa1;
  box-shadow: 0 0 10px #52bfa180;
}
</style>