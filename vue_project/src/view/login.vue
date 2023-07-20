<template>
    <div class="content">
        <div class="login_box">
            <div class="login_title">{{ifLogin ? '登录' : '注册'}}</div>
            <!-- 登录 -->
            <el-form
                v-if="ifLogin"
                ref="ruleFormRef"
                :model="loginData"
                class="form"
            >
                <el-form-item label="邮箱" prop="email" :rules="{required: true,message:'请输入邮箱',trigger: 'blur'}">
                    <el-input 
                    v-model="loginData.email" 
                    placeholder="请输入邮箱"
                    :prefix-icon="User"
                />
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="{required: true,message:'请输入密码',trigger: 'blur'}">
                    <el-input 
                        placeholder="请输入密码" 
                        type="password" 
                        show-password 
                        v-model="loginData.password" 
                        :prefix-icon="Lock"
                    />
                </el-form-item>
            </el-form>
            <!-- 注册 -->
            <el-form
                v-else
                ref="ruleFormRef"
                :model="registerData"
                :rules="rules"
                class="form"
                label-width="80px"
            >
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="registerData.name" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerData.email" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="{required: true,message:'请输入密码',trigger: 'blur'}">
                    <el-input 
                        placeholder="请输入密码" 
                        type="password" 
                        show-password 
                        v-model="registerData.password" 
                    />
                </el-form-item>
                <el-form-item label="确认密码" prop="password2" :rules="{required: true,message:'请确认密码',trigger: 'blur'}">
                    <el-input 
                        placeholder="请确认密码" 
                        type="password" 
                        show-password 
                        v-model="registerData.password2" 
                    />
                </el-form-item>
                <el-form-item label="选择身份" prop="identity" :rules="{required: true,message:'请选择身份',trigger: 'change'}">
                    <el-select style="width:230px;" v-model="registerData.identity" placeholder="请选择身份">
                        <el-option label="超级管理员" value="superAdmin" />
                        <el-option label="管理员" value="admin" />
                        <el-option label="用户" value="user" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="bottom_btn">
                <el-button class="btn" color="#626aef" size="large" @click="submit(ruleFormRef,ifLogin ? 0 : 1)">{{ifLogin ? '登录' : '注册'}}</el-button>
                <!-- <el-button class="text_btn" text @click="changeState">{{ifLogin ? '还没有账号？去注册' : '已用账号？去登录'}}</el-button> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive,ref } from "vue";
import { Lock, User } from '@element-plus/icons-vue'
// import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";
import { ElMessage } from 'element-plus'
import {register } from '@/http/index'
import type { FormInstance,FormRules,ElForm } from "element-plus";
import { useRouter,Router} from 'vue-router'
import {loginUser} from '@/store/users' // 导入pinia
import { userInfo,httpRes,loginRes } from '@/types/responseType.d' // 导入类型转换
type FormInstance = InstanceType<typeof ElForm>
type FormRules = InstanceType<typeof ElForm>


// type FormInstance = InstanceType<typeof ElForm>;
// type FormRules = Record<string, any>;

const router:Router = useRouter()

// type loginRule = Omit<loginRegister,'name'|'password2'|'identity'>
interface loginForm{
    email: string;
    password: string;
}
// 登录
const loginData = reactive<loginForm>({ 
    email: "",
    password: "",
});
// 注册
interface registerFrom extends loginForm{
    name:string,
    password2:string,
    identity:string,
}
const registerData = reactive<registerFrom>({   
    name:'',
    email:'',
    password:'',
    password2:'',
    identity:''
})
// 是否是登录，true为登录表单，false为注册
const ifLogin = ref<boolean>(true)
async function changeState() {
    ifLogin.value = !ifLogin.value;
}
// 验证相关
const validateName = (rule: any, value: any, callback: any) => {
    const regex = /^[^\u4e00-\u9fa5]+$/;
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if(value.length < 6 || value.length > 12){
        callback(new Error('请输入长度6-12的用户名'))
    }else if(!regex.test(value)){
        callback(new Error('用户名不能包含中文字符'))
    }else{
        callback()
    }
}
const validateEmail = (rule: any, value: any, callback: any) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(value === ''){
        callback(new Error('请输入邮箱'))
    }else if(!emailRegex.test(value)){
        callback(new Error('请输入正确的邮箱格式'))
    }else{
        callback()
    }
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if(value === ''){
        callback(new Error('请输入密码'))
    }else if(value.length < 6 || value.length > 12){
        callback(new Error('请输入长度6-12的密码'))
    }else{
        callback()
    }
}
const validatePassword2 = (rule: any, value: any, callback: any) => {
    if(value === ''){
        callback(new Error('请输入密码'))
    }else if(value.length < 6 || value.length > 12){
        callback(new Error('请输入长度6-12的密码'))
    }else if(value !== registerData.password){
        callback(new Error('两次输入的密码不一致'))
    }else{
        callback()
    }
}
const rules = reactive<FormRules>({
    name: [{ validator: validateName, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    password2: [{ validator: validatePassword2, trigger: 'blur' }],
    identity: [{ required: true, message: '请选择身份', trigger: 'change'}]
})

const ruleFormRef = ref<FormInstance>();
const userInfo = loginUser(); // 注册pinia
// 登录/注册接口
const submit = async (formEl:any,type:number)=>{
    if (!formEl) return
    await formEl.validate(async <T,U>(valid:T,fields:U) =>{
        if(valid){
            if(type === 0){
                // const res = await login({
                //     email:loginData.email,
                //     password:loginData.password
                // });
                // if(res.code != 200){return ElMessage.error(res.message)}
                // ElMessage({ message: res.message, type: 'success'})
                // const { token } = res.content;
                // Cookies.set('jwtToken',token,{expires:7})
                // // 解析token
                // const decoded:userInfo = jwt_decode(token);
                // // 给pinia赋值
                // userInfo.setUser(decoded)    
                // userInfo.setToken(token)
                const res:any = await userInfo.userlogin(loginData.email,loginData.password)
                console.log('res',res);
                
                if(res.code != 200){return ElMessage.error(res.message)}
                // userInfo.getUserInfo;
                // const user = userInfo.getUserInfo;
                // console.log('getter',userInfo,user);
                
                router.push({path:'/index'})
            }else{
                const res = await register({
                    name:registerData.name,
                    email:registerData.email,
                    password:registerData.password,
                    password2:registerData.password2,
                    identity:registerData.identity
                })
                if(res.code != 200){return ElMessage.error(res.message)}
                ElMessage({ message: res.message, type: 'success'})
                ruleFormRef.value != ruleFormRef.value;
            }
        }else {
            console.log('error submit!', fields)
        }
    })
}
</script>
<style lang="scss" scoped>
.content {
    width: 100vw;
    height: calc(100vh - 60px);
    background: #fff;
    background-image: url("@/assets/login_bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; // 铺满屏幕
    .login_box {
        width: 376px;
        min-height: 430px;
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        border-radius: 6px;
        padding-bottom: 20px;
        position: absolute;
        top: 160px;
        right: 300px;
        background: #fff;
        .login_title {
            margin-left: 20px;
            margin-top: 30px;
            font-size: 20px;
        }
        .form {
            width: 300px;
            margin: 50px auto 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .bottom_btn{
            width: 300px;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            .btn{
                margin-top: 50px;
            }
            .text_btn{
                margin-top: 16px;
                display: flex;
                justify-content: flex-end;
                &:hover{
                    background: #fff;
                }
            }
        }
    }
}
</style>
