<template>
  <div :class="{'has-header':true,'has-footer':true}">
    <topHeader :hasBack="false" :title="'嘉美员工端'"></topHeader>
    <div class="my">
      <div class="header_bg">
        <div class="info_box">
          <div class="my_info">
            <div class="header_img">
              <img :src="employeeInfo.headImg" />
            </div>
            <div class="info_item">
              <h3 v-text="employeeInfo.truename"></h3>
              <em v-text="employeeInfo.levelName+'员工'"></em>
              <p v-text="employeeInfo.phone"></p>
            </div>
            <div class="edit_bottom" @click="toSetUp">
              <img src="../assets/images/icon_edit.png" />
            </div>
          </div>
        </div>
      </div>
      <!-- <div style="height:100px;background:red;">123</div> -->
      <Button class="out_login_btn" @click="outLogin">退出登录</Button>
    </div>
    <Footer :tabIndex="3"></Footer>
  </div>
</template>
<script>
import { Button, Toast, Dialog } from "vant";
import { mapState, mapMutations } from "vuex";
import topHeader from "./component/header";
import * as types from "../store/mutations";
import Footer from "./component/footer";
export default {
  name: "Home",
  data() {
    return {
      tabActive: 0
    };
  },
  components: {
    Button,
    Toast,
    Dialog,
    topHeader,
    Footer
  },
  computed: {
    ...mapState({
      employeeInfo: state => state.login.employeeInfo
    })
  },
  mounted() {},
  methods: {
    toSetUp() {
      this.pushTo("SetUp");
    },
    outLogin() {
      Dialog.confirm({
        message: "确认退出？"
      })
        .then(() => {
          this.$store.commit(types.SET_AUTHORIZATION, "");
          this.replaceTo("Login");
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less" scoped>
.my {
  .header_bg {
    height: 3rem;
    background: linear-gradient(to right, #ef9235, #eb5e2a);
    position: relative;
    .info_box {
      position: absolute;
      left: 50%;
      bottom: -0.56rem;
      width: 100%;
      transform: translate(-50%, 0);
      padding: 0 0.3rem;
      .my_info {
        background: #fff;
        padding: 0.52rem 0.3rem 0.7rem 0.3rem;
        box-shadow: 0rem 0.1rem 0.1rem 0rem #e7e7e7;
        border-radius: 0.08rem;
        display: flex;
        align-items: center;
        position: relative;
        .header_img {
          width: 1.58rem;
          height: 1.58rem;
          border-radius: 100%;
          position: relative;
          overflow: hidden;
          > img {
            width: 1.58rem;
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            border-radius: 100%;
            transform: translate(-50%, -50%);
          }
        }
        .info_item {
          padding-left: 0.48rem;
          line-height: 1;
          h3 {
            font-size: 0.36rem;
            color: #252525;
          }
          em {
            display: block;
            background: linear-gradient(to right, #ef9235, #eb5e2a);
            color: #fff;
            border-radius: 0.16rem;
            padding: 0 0.3rem;
            line-height: 0.32rem;
            font-size: 0.22rem;
            margin: 0.2rem 0;
          }
          p {
            padding-left: 0.32rem;
            background: url("../assets/images/icon_my_ipone.png") no-repeat;
            background-size: 0.24rem;
          }
        }
        .edit_bottom {
          position: absolute;
          bottom: 0;
          right: 0;
          img {
            width: 0.57rem;
            display: block;
          }
        }
      }
    }
  }
  .out_login_btn {
    display: block;
    color: #fff;
    background: #eb5d2a;
    width: 5rem;
    line-height: 0.8rem;
    height: 0.8rem;
    text-align: center;
    font-size: 0.3rem;
    margin: 2rem auto;
    border-radius: 0.4rem;
  }
}
</style>
