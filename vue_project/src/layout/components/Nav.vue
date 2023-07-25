<template>
    <div class="nav-contain">
      <el-menu
        router
        :default-active="route.path"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#606266"
        active-text-color="#1989FA"
      >
        <!-- <menuItem v-for="router in routeList"  -->
        <menuItem v-for="router in permission.permission_routes" 
          :key="router.path"
          :router="router"
        >
        </menuItem>
      </el-menu>
    </div>
</template>
<script lang="ts" setup>
import { useRoute,RouteLocationNormalizedLoaded } from "vue-router";
import menuItem from "@/layout/components/menuItem.vue";
import {permissionStore} from '@/store/permission'
const route:RouteLocationNormalizedLoaded = useRoute();
const permission = permissionStore();
</script>

<!-- 封装参考 -->
<!-- https://blog.csdn.net/ycmy2017/article/details/131018611 -->
<!-- https://juejin.cn/post/6844904191375196168#comment -->
<!-- https://www.cnblogs.com/cp-cookie/p/13368001.html -->