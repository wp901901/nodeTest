<template>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-container>
                    <el-aside class="left_menu" v-show="route.path !== '/login' ">
                        <Nav></Nav>
                    </el-aside>
                    <el-main>
                        <!-- 面包屑组件 -->
                        <Breadcrumb></Breadcrumb>
                        <!-- 路由历史记录展示组件 -->
                        <tagView></tagView>
                        <AppMain></AppMain>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
name:'Layout'
import { useRoute,RouteLocationNormalizedLoaded } from "vue-router";
import Header from '@/layout/components/header.vue'
import Nav from '@/layout/components/Nav.vue'
import tagView from '@/layout/components/TagViews/index.vue'
import Breadcrumb from "@/layout/components/Breadcrumb.vue";
import AppMain from '@/layout/components/AppMain.vue'

const route:RouteLocationNormalizedLoaded = useRoute();
</script>
<style lang="scss" scoped>
*{
    padding: 0;
}
.left_menu{
    width: 200px;
    height: calc(100vh - 60px);
    background: #fff;
    box-shadow: 0px 0px 6px 1px rgba(133,133,133,0.16);
}
</style>