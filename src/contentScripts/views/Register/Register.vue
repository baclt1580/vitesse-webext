<script lang='ts' setup>
import { visibles } from '~/contentScripts/state/visible';
import { CloseFilled } from "@vicons/material"

</script>
<template>
    <div class="flex items-center justify-center flex-col text-center bg-[#ffffff75] fixed left-0 top-0 w-full h-[100vh] z-[99]"
        v-if="visibles.register">
        <div
            class="relative flex justify-center items-center flex-col bg-[#EDDCD9] border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#E99F4C] p-6">
            <p class="text-[#264143] font-black text-xl mt-5">注册</p>
            <CloseFilled class="w-[24px] absolute right-4 top-4 cursor-pointer" @click="visibles.register = false">
            </CloseFilled>
            <form action="">
                <div class="flex flex-col items-baseline my-3">
                    <label class="font-semibold mb-1" for="name">昵称</label>
                    <input placeholder="昵称"
                        class="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm"
                        type="text">
                </div>
                <div class="flex flex-col items-baseline my-3">
                    <label class="font-semibold mb-1" for="name">邮箱</label>
                    <input placeholder="邮箱"
                        class="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm"
                        type="text">
                </div>
                <div class="flex flex-col items-baseline my-3">
                    <label class="font-semibold mb-1" for="password">密码</label>
                    <input placeholder="密码" id="password"
                        class="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm"
                        type="password">
                </div>
                <div class="flex flex-col items-baseline my-3">
                    <label class="font-semibold mb-1" for="password">再输一遍你在上面输过的密码</label>
                    <input placeholder="前面忘了,中间忘了,后面也忘了" id="password"
                        class="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm"
                        type="password">
                </div>
                <div class="mt-6">
                    <button
                        class="p-4 w-72 text-sm bg-[#DE5499] rounded-lg font-black shadow-[3px_3px_0px_0px_#E99F4C] hover:opacity-90 transform transition-transform focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]">注册</button>
                    <p class="mt-4">已经有账户了? <a class="font-black text-[#264143] cursor-pointer p-1"
                            @click="visibles.register = false; visibles.login = true">点这登录!</a></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>