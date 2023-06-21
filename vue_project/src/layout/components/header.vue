<template>
    <!-- <div class="header">
        <div class="header_left">
            <img class="header_icon" src="@/assets/header_icon.gif" alt="" />
            <img class="header_title" src="@/assets/header_title.png" alt="" />
        </div>
        
    </div> -->
    <el-menu
        :default-active="activeIndex"
        class="header"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item >
            <div class="header_left">
                <img class="header_icon" src="@/assets/header_icon.gif" alt="" />
                <img class="header_title" src="@/assets/header_title.png" alt="" />
            </div>
        </el-menu-item>
        <div class="flex-grow" />
        <!-- <el-menu-item index="1">Processing Center</el-menu-item> -->
        <el-sub-menu index="2" v-if="showUserHeaderPic">
            <template #title>
                <span>{{ getUserInfo.name }}</span>
                <!-- <img class="header_icon" src="@/assets/header_icon.gif" alt="" /> -->
            </template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
    </el-sub-menu>
    </el-menu>
</template>
<script setup lang="ts">
    import { ref,Ref,reactive,computed } from 'vue'
    import { userInfo } from '@/types/responseType.d' // 导入类型转换
    import {loginUser} from '@/store/users' // 导入pinia
    const activeIndex = ref('1')
    const userPinia = loginUser(); // 注册pinia
    const userInfo:userInfo = reactive({
            avatar:'',
            date:'',
            email:'',
            exp:0,
            iat:0,
            id:0,
            identity:'',
            name:'',
            password:null,
            password2:null,
    })
    const getUserInfo = computed(()=>{
        return userPinia.getUserInfo
    })
    console.log(userPinia.getUserInfo);
    console.log();
    
    const showUserHeaderPic: Ref<boolean> = ref(false)
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }
</script>
<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 60px;
        box-shadow: 0px 0px 6px 1px rgba(72,72,72,0.16);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        .header_left{
            // margin-left: 50px;
            display: flex;
            align-items: center;
            .header_icon{
                height: 34px;
            }
            .header_title{
                width: 284px;
                height: 34px;
                margin-left: 5px;
            }
        }
        
    }
</style>