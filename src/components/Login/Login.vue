<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:duan}" @click="duan=true,mi=false">短信登录</a>
          <a href="javascript:;" :class="{on:mi}" @click="mi=true,duan=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:duan}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" @input="placeholderisok" v-model="phone"/>
              <button :disabled="ifbtn" class="get_verification" :style="a" @click.prevent="getCode">{{computerTime>0?`已发送剩余(${computerTime})s`:'发送验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code"/>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:mi}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name"/>
              </section>
              <section class="login_verification">
                <input :type="showpwd" maxlength="8" placeholder="密码" v-model="paw" />
                <div class="switch_button off" :class="showpwd == 'password'?'':'on'" @click="showpwd=='password'?showpwd='text':showpwd='password'">
                  <div class="switch_circle" :class="showpwd == 'password'?'':'right'"></div>
                  <span class="switch_text">{{showpwd=='password'?'':'show'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"/>
                <img class="get_verification" :src="captchaImg" alt="captcha" @click="getcaptcha"/>
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.push('/profile')">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeAlser"></AlertTip>
  </section>
</template>
<script>
 import AlertTip from '../AlertTip/AlertTip.vue' 
 import {mapMutations} from 'vuex' 
// import "../../assets/stulus/mixins.styl"
export default {
  data(){
    return{
      duan:true,  //短信登录tab切换
      mi:false,   //密码登录tab切换
      ifbtn:true,  // 按钮是否可用
      a:''  ,       //按钮文字颜色
      phone:'',        //手机号
      computerTime:0,   //计时时间
      showpwd:'password',  //控制密码显示  
      paw:'',     //密码
      code:'',    //短信验证码
      name:'',    //账号手机号
      captcha:'', //验证码
      alertText:'',  //提示文本
      showAlert:false,  //是否显示提示框   
      captchaImg:'http://localhost:4000/captcha',   //验证图片地址
      intervalidL:''  //定时器
    }
  },
  components:{
    AlertTip
  },
  methods:{
    ...mapMutations(['receive_userInfo']),
    //判断手机号是否合法
    placeholderisok(e) {
      let phone = e.target.value
    if((/^1[3456789]\d{9}$/.test(phone))){  
        this.ifbtn = false
        this.a='color: black;'
    } 
    else{
      this.ifbtn = true
      this.a = ''
    }
    },
    //获取验证码点击事件
  async  getCode(){
      this.computerTime = 30
      this.ifbtn = true
      this.a = ''
   this.intervalid = setInterval(()=>{
        this.computerTime--
        if(this.computerTime == 0){
          this.ifbtn = false
          this.a='color: black;'
clearInterval(this.intervalid)
        }
      },1000)
      //发送短信验证码
   const result = await this.$http.get('/dev-api/sendcode?phone='+this.phone)
  //  if(result[[PromiseValue]].data.code != 0)
      if(result.data.code == 1){
        this.computerTime = 0
         this.showAlert = true
  this.alertText ="获取验证码失败"
        clearInterval(this.intervalid)
           this.ifbtn = false
          this.a='color: black;'

      }
    },
    //提交表单时判断
   async login(){
     let result
      if(this.duan){
        //验证码登录
if(!(/^1[3456789]\d{9}$/.test(this.phone))){
  this.showAlert = true
  this.alertText ="输入正确的手机号"
  return
}else if(!/^\d{6}$/.test(this.code)){
  this.showAlert = true 
  this.alertText = "请输入正确的验证码"
  return
}
result = await this.$http.post('/dev-api/login_sms',{
  phone : this.phone,
  code : this.code
})
      }else{
        //账号密码登录
  if(!this.name){
    this.showAlert = true
    this.alertText = '请输入手机/邮箱/用户名'
    return
  }else if(!this.paw){
    this.showAlert = true
    this.alertText = "请输入密码"
    return
  }else if(!this.captcha){
    this.showAlert = true
    this.alertText = "请输入验证码"
    return
  }
result = await this.$http.post('/dev-api/login_pwd',{
  name : this.name,
  paw : this.paw,
  captcha : this.captcha
})
      }
 clearInterval(this.intervalid)

let user = result.data
let msg = result.data.msg 
if(user.code == 1){
        this.showAlert = true
        this.alertText = msg
        this.captchaImg = 'http://localhost:4000/captcha?time='+Date.now()
      }else{
  this.computerTime = 0
      this.ifbtn = true
      this.a = ''
      user.data.phone = this.phone
this.receive_userInfo(user.data)
// console.log(user.data)
      this.$router.replace('/profile')
      }
    },
    //关闭提示框
    closeAlser(){
      this.showAlert = false
      this.alertText = ''
    },
    //获取验证图片
    getcaptcha(){  
this.captchaImg = 'http://localhost:4000/captcha?time='+Date.now()
    }
  },

}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stulus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>