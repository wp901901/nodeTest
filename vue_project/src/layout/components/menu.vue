<template>
    <span v-for="child in menuRouterList" >{{ child }}</span>
     <el-sub-menu
        v-for="child in menuRouterList"
        :key="child.path"
        v-if="child"
        :index="child.path"
    >
        <template slot="title">
            <component :is="child.meta.icon"></component>
            <span slot="title">{{child.meta.title}}</span>
        </template>
        <Menu :menuRouterList="child.children"></Menu>
    </el-sub-menu>
    <!-- <el-menu-item :index="child.path" v-else> 
        <component :is="child.meta.icon"></component>
        <span slot="title">{{child.meta.title}}</span>
    </el-menu-item> -->
    <!-- <el-sub-menu
        v-for="child in menuRouterList"
        v-if="child"
        :index="child.path"
    >
        <template slot="title">
            <component :is="child.meta.icon"></component>
            <span slot="title">{{child.meta.title}}</span>
        </template>
        <Menu :menuRouterList="child.children"></Menu>
    </el-sub-menu>
    <el-menu-item :index="child.path" v-else> 
        <component :is="child.meta.icon"></component>
        <span slot="title">{{child.meta.title}}</span>
    </el-menu-item> -->
</template>
<script lang="ts" setup>
name:'Menu'
import { ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
// import Menu from '@/layout/components/menu.vue'
const props = defineProps({
    menuRouterList: {
        type: Array,
    }
})
console.log('props',props.menuRouterList[0])


const [router,route] = [useRouter(),useRoute()];
const routeList = ref(props.menuRouterList);
console.log(routeList.value);

</script>
<style scoped lang="scss">
    span {
        height: 200px;
        color: red;
    }
</style>

<!-- 封装参考 -->
<!-- https://blog.csdn.net/ycmy2017/article/details/131018611 -->
<!-- https://juejin.cn/post/6844904191375196168#comment -->