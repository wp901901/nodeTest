<template>
    <!-- <span v-for="child in menuRouterList" >{{ child }}</span> -->
    <template v-for="item in routeList" :key="item.path">
        <el-menu-item :index="item.path" class="left_menu_item" >
            <el-icon>
                <!--component vue框架提供的全局组件，可以直接使用-->
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
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
import { ref  } from 'vue'
import { useRouter,useRoute } from 'vue-router'
// import Menu from '@/layout/components/menu.vue'
// defineProps(['menuRouterList']);
// const props = defineProps({
//     menuRouterList: {
//         type: Array,
//         required: true,
//         default: ''
//     }
// })
// console.log('props',props.menuRouterList)
// const filtersRouter = props.menuRouterList.filter(item => (item.path !=='/register' && item.path !== '/'))
// console.log('filtersRouter',filtersRouter)

// const [router,route] = [useRouter(),useRoute()];
// const routeList = ref(filtersRouter);
// console.log(routeList.value);


</script>
<style scoped lang="scss">
    // .left_menu_item {
    //     height: 100px;
    // }
</style>

<!-- 封装参考 -->
<!-- https://blog.csdn.net/ycmy2017/article/details/131018611 -->
<!-- https://juejin.cn/post/6844904191375196168#comment -->
<!-- https://www.cnblogs.com/cp-cookie/p/13368001.html -->