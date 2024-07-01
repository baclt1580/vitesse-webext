<script setup lang="ts">
import { onMessage, sendMessage } from 'webext-bridge/popup';
import YellowButton from './components/button/YellowButton/YellowButton.vue';
import Notification from './components/Notification/Notification.vue';
async function toLogin() {
  let tabs = await browser.tabs.query({ active: true, currentWindow: true })
  const activeTab = tabs[0];
  console.log("activeTab",activeTab)
  sendMessage("toLogin", "", `content-script@${activeTab.id}`)
}
</script>
<template>
  <div class="w-[300px] h-[400px] bg-white p-2">
    <section class="flex justify-between">
      <YellowButton @click="toLogin">
        <span class="text-sm">登录</span>
      </YellowButton>
      <Notification class="ml-auto size-8 mr-2 cursor-pointer"></Notification>
      <img src="./assets/img/setting.svg" alt="进入设置" class="w-8 cursor-pointer">
    </section>
    
  </div>
</template>
