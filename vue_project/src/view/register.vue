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
                <el-form-item label="邮箱" prop="name" :rules="{required: true,message:'请输入邮箱',trigger: 'blur'}">
                    <el-input 
                    v-model="loginData.email" 
                    placeholder="请输入邮箱"
                    :prefix-icon="User"
                />
                </el-form-item>
                <el-form-item label="密码" prop="region" :rules="{required: true,message:'请输入密码',trigger: 'blur'}">
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
                <el-form-item label="用户名" prop="name" :rules="{required: true,message:'请输入用户名',trigger: 'blur'}">
                    <el-input v-model="registerData.name" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :rules="{required: true,message:'请输入邮箱',trigger: 'blur'}">
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
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="bottom_btn">
                <el-button class="btn" color="#626aef" size="large">{{ifLogin ? '登录' : '注册'}}</el-button>
                <el-button class="text_btn" text @click="changeState">{{ifLogin ? '还没有账号？去注册' : '已用账号？去登录'}}</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive,ref } from "vue";
import { Lock, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from "element-plus";

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
function changeState() {
    ifLogin.value = !ifLogin.value;
}
</script>
<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 100vh;
    background: #fff;
    background-image: url("@/assets/login_bg.png");
    background-repeat: no-repeat;
    background-position: center;
    .login_box {
        width: 376px;
        min-height: 430px;
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        border-radius: 6px;
        padding-bottom: 20px;
        position: absolute;
        top: 160px;
        right: 300px;
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
