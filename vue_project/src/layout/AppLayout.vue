<template>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-header>
                    <myheader></myheader>
                </el-header>
                <el-container>
                    <!-- <el-aside v-if="hideSide" width="200px">Aside</el-aside> -->
                    <el-aside v-show="route.path !== '/register' " width="200px">
                    321
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
// import { ref,Ref } from "vue";
import { useRoute,RouteLocationNormalizedLoaded } from "vue-router";
import myheader from '@/layout/components/header.vue'
const route:RouteLocationNormalizedLoaded = useRoute();
</script>
<style lang="scss" scoped>
*{
    padding: 0;
}

</style>