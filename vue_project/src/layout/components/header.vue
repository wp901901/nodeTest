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
        <el-dropdown v-if="userPinia.getterUserInfo.id">
            <span class="el-dropdown-link">
                <img class="header_avatar" :src="userPinia.getterUserInfo.avatar" alt="" />
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="myInfo">个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- <el-sub-menu index="2" >
            <template #title>
                <img class="header_avatar" :src="getUserInfo.avatar" alt="" />
            </template>
            <el-menu-item index="2-1" @click="myInfo">个人信息</el-menu-item>
            <el-menu-item index="2-2" @click="logout">退出</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
        </el-sub-menu> -->
    </el-menu>
</template>
<script setup lang="ts">
    import { ref,reactive } from 'vue'
    import { userInfo } from '@/types/responseType.d' // 导入类型转换
    import {loginUser} from '@/store/users' // 导入pinia
    import { ArrowDown } from '@element-plus/icons-vue'
    import Cookies from "js-cookie";
    // import router from '@/router'
    import{ useRouter } from 'vue-router'
    // import {aside} from '@/store/menuRouter'
    const router = useRouter();
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

    console.log('userPinia.getterUserInfo',userPinia.getterUserInfo);
    
    
    const myInfo = ()=>{
        console.log('点击了个人信息');
        const getUser = userPinia.getterUserInfo;
        console.log(getUser,'getUser');
        router.push({path:'/userInfo'})
    }
    const logout = ()=>{
        console.log('点击了退出');
        userPinia.clearUser();
        userPinia.clearToken();
        sessionStorage.removeItem('userInfo');
        Cookies.remove('jwtToken');
        router.replace({path:'/login'});
        // loginUser.clearUser();
    }
    // const showUserHeaderPic: Ref<boolean> = ref(false)
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
        .header_avatar{
            height: 30px;
        }
    }
    .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
</style>