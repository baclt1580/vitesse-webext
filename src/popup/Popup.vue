<script setup lang="ts">
import { onMessage, sendMessage } from 'webext-bridge/popup';
import YellowButton from './components/button/YellowButton/YellowButton.vue';
import Notification from './components/Notification/Notification.vue';
import Status from './components/Status/Status.vue';
import TranslateView from "./components/TranslateView/TranslateView.vue"
async function toLogin() {
  let tabs = await browser.tabs.query({ active: true, currentWindow: true })
  const activeTab = tabs[0];
  console.log("activeTab",activeTab)
  sendMessage("toLogin", "", `content-script@${activeTab.id}`)
}
</script>
<template>
  <div class="w-[300px] h-[500px] bg-white p-2 pb-8 relative">
    <!-- 头部 -->
    <section class="flex justify-between">
      <YellowButton @click="toLogin">
        <span class="text-sm">登录</span>
      </YellowButton>
      <Notification class=" size-8 ml-2 cursor-pointer"></Notification>
      <img src="./assets/img/setting.svg" title="进入设置" class="w-6 ml-auto cursor-pointer btn-animation">
    </section>
    <!-- 中间设置及信息 -->
    <section class="mt-4">
      <TranslateView></TranslateView>
    </section>
    <Status class="absolute bottom-2 right-2"></Status>
  </div>
</template>
