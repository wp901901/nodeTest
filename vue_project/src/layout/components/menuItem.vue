<template>
    <div class="asideBarItem-contant">
        <!-- 如果hasOwnProperty监测有children且个数大于一个1 就循环递归展示 -->
        <!-- <el-sub-menu :index="router.path" v-if="router.children && router.children.length > 1"> -->
        <el-sub-menu :index="router.path" v-if="router.children && router.children.length">
            
            <template #title>
                <el-icon>
                    <component :is="router.meta.icon"></component>
                </el-icon>
                <span>{{ router.meta.title }}</span>
            </template>
            <!-- 递归有子孙导航组件 -->
            <menuItem v-for="child in router.children" :key="child.path" :router="child"></menuItem>
        </el-sub-menu>
        <!-- 无子孙导航 -->
        <el-menu-item :key="router.path" :index="router.path" v-else>
            <!-- <el-icon>
                <component :is="router.meta.icon"></component>
            </el-icon> -->
            <template #title>
                <span>{{ router.meta.title }}</span>
            </template>
        </el-menu-item>
    </div>
</template>
<script lang="ts" setup>
defineProps(['router']);
</script>


        <!-- 有子路由但是只有一个子路由 -->
        <!-- <template v-if="router.children && router.children.length == 1">
            <el-menu-item :index="router.children[0].path" v-if="!router.children[0].meta.hidden">
                <el-icon>
                    <component :is="router.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ router.children[0].meta.title }}2</span>
                </template>
            </el-menu-item>
        </template> -->