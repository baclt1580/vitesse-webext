<script setup lang="ts">
import { onMessage, sendMessage } from 'webext-bridge/popup';
import YellowButton from './components/button/YellowButton/YellowButton.vue';
function toLogin() {
  console.log("发送message")
  sendMessage("toLogin", "", "content-script")
}
</script>
<template>
  <div class="w-[300px] h-[200px] bg-white p-2">
    <section>
      <YellowButton @click="toLogin">
        <span class="text-sm">登录</span>
      </YellowButton>
    </section>
  </div>
</template>
