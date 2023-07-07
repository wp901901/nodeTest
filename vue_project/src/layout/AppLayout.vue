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
                        <!-- <el-menu
                            :default-active="route.path"   
                            class="el-menu-vertical-demo"
                        > 
                            <myMenu :menuRouterList="getRouter"></myMenu>
                        </el-menu> -->
                        <Nav></Nav>
                    </el-aside>
                    <el-main>
                        <AppMain></AppMain>
                        <!-- <transition mode="out-in">
                            <router-view></router-view>
                        </transition> -->
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
name:'Layout'
// import { ref } from "vue";
import { useRoute,RouteLocationNormalizedLoaded } from "vue-router";
import Header from '@/layout/components/header.vue'
// import myMenu from '@/layout/components/menu.vue'
import Nav from '@/layout/components/Nav.vue'
import AppMain from '@/layout/components/AppMain.vue'

const route:RouteLocationNormalizedLoaded = useRoute();
// const router = useRouter();

// const getRouter = ref(router.getRoutes());

// console.log(route.path);

</script>
<style lang="scss" scoped>
*{
    padding: 0;
}
.left_menu{
    width: 300px;
    height: calc(100vh - 60px);
    background: skyblue;
}
</style>