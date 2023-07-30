<!-- 面包屑组件 -->
<template>
    <div class="breadcrumb_box">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in routeMarchedList" :key="item.path" :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    
</template>
<script lang="ts" setup>
import { useRoute,RouteLocationMatched } from 'vue-router'
import { watchEffect,ref,Ref } from 'vue';
const route = useRoute();
const routeMarchedList:Ref<RouteLocationMatched[]> = ref([]);
watchEffect(()=>{
    console.log('route.matched',route.matched);
    routeMarchedList.value = route.matched;
})
</script>
<style lang="scss" scoped>
.breadcrumb_box{
    margin: 20px 13px;
}
</style>