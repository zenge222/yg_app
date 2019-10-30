<template>
  <div style="height:100%;" :class="{'has-header':true}">
    <topHeader :title="'修改密码'"></topHeader>
    <div class="change_pwd">
      <h3>修改登录密码</h3>
      <div class="inputs_item">
        <div class="left_item">+86</div>
        <div class="left_item" style="flex:1;font-weight:normal;">15067477383</div>
      </div>
      <div class="inputs_item">
        <!-- <div class="left_item">+86</div>-->
        <!-- <div class="left_item" style="flex:1;font-weight:normal;">15067477383</div> -->
        <!-- <Field maxlength="11" class="input" placeholder="请输入您的手机号" /> -->
        <Field
          maxlength="11"
          type="password"
          v-model="userInfo.pwd1"
          class="input"
          placeholder="请输入新密码"
        />
      </div>
      <div class="inputs_item">
        <Field
          maxlength="11"
          type="password"
          v-model="userInfo.pwd2"
          class="input"
          placeholder="请确认新密码"
        />
      </div>
      <Button class="login_btn" @click="changePwd">修改</Button>
    </div>
  </div>
</template>
<script>
import { Button, Toast, Icon, Field } from "vant";
import { _changeEmployeeInfo } from "../service/login";
import topHeader from "./component/header";
export default {
  data() {
    return {
      userInfo: {
        pwd1: "",
        pwd2: ""
      }
    };
  },
  components: {
    Button,
    Toast,
    Icon,
    Field,
    topHeader
  },
  mounted() {},
  methods: {
    changePwd() {
      let _this = this;
      let reg = /^[\w_-]{6,16}$/;
      if (!reg.test(this.userInfo.pwd1)) {
        this.$notify("请输入6~16位密码");
        return;
      }
      if (this.userInfo.pwd1 != this.userInfo.pwd2) {
        this.$notify("确认密码与新密码不一致");
        return;
      }
      let params = {
        password: this.userInfo.pwd1
      };
      _changeEmployeeInfo(params).then(res => {
        if (res.data.success) {
          this.$toast({
            message: res.data.message,
            forbidClick: true,
            duration: 1000,
            onClose() {
              // _this.replaceTo("SetUp");
              _this.$router.go(-1);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.change_pwd {
  height: 100%;
  background: #fff;
  padding: 0 0.6rem;
  > h3 {
    font-size: 0.36rem;
    color: #282828;
    font-weight: bold;
    line-height: 1;
    padding: 0.6rem 0 0.5rem 0;
  }
  .inputs_item {
    display: flex;
    align-items: center;
    .left_item {
      width: 1rem;
      padding: 0.4rem 0 0.4rem 0;
      border-bottom: 0.01rem solid #dcdcdc;
      font-size: 0.32rem;
      margin-right: 0.28rem;
      color: #282828;
      font-weight: bold;
    }
    .input {
      flex: 1;
      padding: 0.4rem 0 0.4rem 0;
      border-bottom: 0.01rem solid #dcdcdc;
      font-size: 0.32rem;
    }
  }
  .login_btn {
    width: 100%;
    display: block;
    margin-top: 0.8rem;
    border-radius: 0.45rem;
    background: #eb5d2a;
    color: #fff;
    line-height: 0.9rem;
    height: 0.9rem;
  }
}
</style>
