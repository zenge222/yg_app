<template>
  <div style="height:100%;" :class="{'has-header':true}">
    <div class="login">
      <topHeader :hasBack="false" :title="'登录'"></topHeader>
      <div class="login_container">
        <img class="def_header" src="../assets/images/def_head_portrait.png" alt />
        <div class="from_items">
          <div class="input_item">
            <Field v-model="userInfo.phone" maxlength="11" class="input" placeholder="请输入您的手机号" />
            <img class="left_icon" src="../assets/images/icon_ipone.png" alt />
          </div>
          <div class="input_item">
            <Field
              type="password"
              v-model="userInfo.password"
              maxlength="11"
              class="input"
              placeholder="请输入密码"
            />
            <img class="left_icon" src="../assets/images/icon_Password.png" alt />
          </div>
        </div>
        <Button @click="loginSubmit" class="submit_btn">登录</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Toast, Field } from "vant";
import topHeader from "./component/header";
import { _toLogin } from "../service/login";
export default {
  name: "Home",
  data() {
    return {
      userInfo: {
        phone: "",
        password: ""
      }
    };
  },
  components: {
    Button,
    Toast,
    Field,
    topHeader
  },
  mounted() {},
  methods: {
    loginSubmit() {
      let _this = this;
      // api.getPicture(
      //   {
      //     sourceType: "camera",
      //     encodingType: "jpg",
      //     mediaValue: "pic",
      //     destinationType: "base64",
      //     allowEdit: true,
      //     quality: 50,
      //     targetWidth: 100,
      //     targetHeight: 100,
      //     saveToPhotoAlbum: false
      //   },
      //   (ret, err) => {
      //     if (ret) {
      //       // alert(JSON.stringify(ret));
      //     } else {
      //       _this.$notify(JSON.stringify(err));
      //     }
      //   }
      // );

      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(this.userInfo.phone)) {
        this.$Notify("请输入正确的手机号码");
        return;
      }
      if (!this.userInfo.password) {
        this.$Notify("请输入密码");
        return;
      }
      _toLogin(this.userInfo).then(res => {
        if (res.data.success) {
          this.replaceTo("Home");
        } else {
          this.$Toast(res.data.message);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background: -webkit-linear-gradient(#f99c3f, #f36a37);
  background: -o-linear-gradient(#f99c3f, #f36a37);
  background: -moz-linear-gradient(#f99c3f, #f36a37);
  background: linear-gradient(#f99c3f, #f36a37);
  overflow: hidden;
  .login_container {
    width: 6.9rem;
    height: 10.4rem;
    margin: 1.26rem auto 0 auto;
    background: #fff;
    position: relative;
    border-radius: 0.2rem;
    box-sizing: border-box;
    padding: 0 0.5rem;
    .def_header {
      width: 2.8rem;
      position: absolute;
      left: 50%;
      top: -1.2rem;
      transform: translate(-50%, 0);
    }
    .from_items {
      padding-top: 2.28rem;
      .input_item {
        position: relative;
        font-size: 0.28rem;
        .input {
          padding: 0.32rem 0 0.32rem 0.53rem;
          border-bottom: 0.01rem solid #f5f5f5;
          .van-cell:not(:last-child)::after {
            border: none;
          }
        }
        .left_icon {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 0.4rem;
        }
      }
    }
    .submit_btn {
      display: block;
      width: 100%;
      border-radius: 0.5rem;
      background: #eb5d2a;
      color: #fff;
      margin-top: 0.95rem;
    }
  }
}
</style>
