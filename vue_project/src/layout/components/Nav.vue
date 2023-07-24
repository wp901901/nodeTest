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
import { ref } from "vue";
import { useRoute,RouteLocationNormalizedLoaded,useRouter } from "vue-router";
import menuItem from "@/layout/components/menuItem.vue";
import {permissionStore} from '@/store/permission'
const route:RouteLocationNormalizedLoaded = useRoute();
const router = useRouter();
const permission = permissionStore();
console.log('permission',permission.permission_routes)
console.log('router.options.routes',router.options.routes);
console.log('router.getRoutes',router.getRoutes());


const filtersRouter = router.options.routes.filter(item => (item.path !=='/login'))
const routeList = ref(filtersRouter);
// console.log(routeList.value);
</script>

<!-- 封装参考 -->
<!-- https://blog.csdn.net/ycmy2017/article/details/131018611 -->
<!-- https://juejin.cn/post/6844904191375196168#comment -->
<!-- https://www.cnblogs.com/cp-cookie/p/13368001.html -->