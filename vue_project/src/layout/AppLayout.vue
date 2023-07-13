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
import AppMain from '@/layout/components/AppMain.vue'

const route:RouteLocationNormalizedLoaded = useRoute();
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