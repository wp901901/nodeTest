<template>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-header>
                    <myheader></myheader>
                </el-header>
                <el-container>
                    <el-aside width="200px">Aside</el-aside>
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
import myheader from '@/layout/components/header.vue'

</script>
<style lang="scss" scoped>
*{
    padding: 0;
}

</style>