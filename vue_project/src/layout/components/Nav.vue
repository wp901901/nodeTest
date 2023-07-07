<template>
    <div class="nav-contain">
      <el-menu
        router
        :default-active="route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <menuItem v-for="router in routeList" 
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
const route:RouteLocationNormalizedLoaded = useRoute();
const router = useRouter();
console.log(router.options.routes);

const filtersRouter = router.options.routes.filter(item => (item.path !=='/register'))
const routeList = ref(filtersRouter);
console.log(routeList.value);
</script>