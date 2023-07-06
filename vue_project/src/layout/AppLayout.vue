<template>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-container>
                    <!-- <el-aside v-if="hideSide" width="200px">Aside</el-aside> -->
                    <el-aside class="left_menu" v-show="route.path !== '/register' ">
                        <el-menu
                            :default-active="route.path"   
                            class="el-menu-vertical-demo"
                        >   
                            <!-- <span>{{ route.path }}</span>
                            <span>{{ getRouter }}</span> -->
                            <myMenu :menuRouterList="getRouter"></myMenu>
                        </el-menu>
                    </el-aside>
                    <el-main>
                        <transition mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
name:'Layout'
import { ref } from "vue";
import { useRoute,RouteLocationNormalizedLoaded,useRouter } from "vue-router";
import Header from '@/layout/components/header.vue'
import myMenu from '@/layout/components/menu.vue'

const route:RouteLocationNormalizedLoaded = useRoute();
const router = useRouter();

const getRouter = ref(router.getRoutes());

// console.log(route.path);

</script>
<style lang="scss" scoped>
*{
    padding: 0;
}
.left_menu{
    width: 300px;
    margin-top: 60px;
    height: calc(100vh - 120px);
    background: skyblue;
}
</style>