<script lang='ts' setup>
import { visibles } from '~/contentScripts/state/visible';
import {CloseFilled} from "@vicons/material"
</script>
<template>
    <teleport to="body">
        <div class="flex items-center justify-center flex-col text-center bg-[#ffffff75] absolute left-0 top-0 w-full h-full z-[999]"
        v-if="visibles.login"
        >
            <div class="flex justify-center items-center flex-col bg-[#EDDCD9] border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#E99F4C] p-6 relative">
                <p class="text-[#264143] font-black text-xl mt-5">登录</p>
                <n-icon :size="24" class="absolute right-4 top-4 cursor-pointer" @click="visibles.login=false">
                    <CloseFilled></CloseFilled>
                </n-icon>
                <form action="">
                    <div class="flex flex-col items-baseline my-3">
                        <label class="font-semibold mb-1" for="name">邮箱</label>
                        <input placeholder="输入邮箱" class="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm" type="text">
                    </div>
                    <div class="flex flex-col items-baseline my-3">
                        <label class="font-semibold mb-1" for="password">密码</label>
                        <input placeholder="输入密码" id="password" class="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm" type="password">
                    </div>
                    <div class="mt-6">
                        <button class="p-4 w-72 text-sm bg-[#DE5499] rounded-lg font-black shadow-[3px_3px_0px_0px_#E99F4C] hover:opacity-90 transform transition-transform focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]">登录</button>
                        <p class="mt-4 flex justify-center items-center">还没账号? <div class="font-black text-[#264143] p-1 cursor-pointer" @click="visibles.login=false;visibles.register=true">点这注册!</div></p>
                    </div>
                </form>
            </div>
        </div>
    </teleport>

</template>

<script lang='ts'>


export default {

}
</script>

<style>
</style>