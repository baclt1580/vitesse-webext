<script lang='ts' setup>
import Menu from "./components/Menu/Menu.vue"
import Login from "./components/Login/Login.vue";
import Register from "./components/Register/Register.vue";

</script>
<template>
   <div id="wt_application">
      <Menu></Menu>
      <Login></Login>
      <Register></Register>
   </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style>
:host {
    all: unset; 
}
</style>