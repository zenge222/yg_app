<template>
  <div :class="{'has-header':true}">
    <topHeader :title="'嘉美员工端'"></topHeader>
    <div class="set_up">
      <div class="set_item">
        <h3>头像</h3>
        <div class="right_item" @click="phonePopShow=true">
          <div class="user_pic_box">
            <img class="user_pic" :src="employeeInfo.headImg" />
          </div>
          <img class="right_icon" src="../assets/images/tbn_jump.png" />
        </div>
      </div>
      <div class="set_item set_item_border" @click="changeNameShow=true">
        <h3>昵称</h3>
        <div class="right_item">
          <p class="user_name" v-text="employeeInfo.nickname"></p>
          <img class="right_icon" src="../assets/images/tbn_jump.png" />
        </div>
      </div>
      <div class="set_item set_item_border">
        <h3>手机号码</h3>
        <div class="right_item">
          <p class="phone">13056770791</p>
          <p class="phone_reg">已验证</p>
        </div>
      </div>
      <div class="set_item set_item_border" @click="toChnagePwd">
        <h3>设置密码</h3>
        <div class="right_item">
          <img class="right_icon" src="../assets/images/tbn_jump.png" />
        </div>
      </div>
    </div>
    <!-- 修改昵称 -->
    <Popup v-model="changeNameShow" class="has_close_pop" :close-on-click-overlay="false">
      <div class="close_box" @click="changeNameShow=false">
        <Icon class="close_icon" name="cross" />
      </div>
      <div class="pop_container">
        <h3>请输入您的新昵称</h3>
        <Field class="input" v-model="nickname" placeholder="请您的昵称" />
        <Button class="submit_btn" @click="submitNickName">确定</Button>
      </div>
    </Popup>

    <Popup position="bottom" class="phone_pop" v-model="phonePopShow">
      <div :class="{'bottom_container':true,'fix-iphonex-buttom':isIphoneX}">
        <div class="phone1">
          拍照
          <p @click="toPhotograph" class="input"></p>
        </div>
        <div class="phone2">
          从相册选择
          <p @click="changePhone1($event)" class="input"></p>
        </div>
        <div class="cancel" @click="phonePopShow=false;">取消</div>
      </div>
    </Popup>
  </div>
</template>
<script>
import { Button, Toast, Popup, Icon, Field } from "vant";
import { mapState, mapMutations } from "vuex";
import { _changeEmployeeInfo } from "../service/login";
import topHeader from "./component/header";
export default {
  name: "Home",
  data() {
    return {
      tabActive: 0,
      changeNameShow: false,
      nickname: "",
      phonePopShow: false
    };
  },
  components: {
    Button,
    Toast,
    Icon,
    Popup,
    Field,
    topHeader
  },
  computed: {
    ...mapState({
      employeeInfo: state => state.login.employeeInfo,
      isIphoneX: state => state.login.isIphoneX
    })
  },
  mounted() {},
  methods: {
    ...mapMutations(["changeNickName", "changeHeadImg"]),
    toChnagePwd() {
      this.pushTo("ChangePwd");
    },
    submitNickName() {
      if (!this.nickname) {
        this.$notify("请输入昵称");
        return;
      }
      let params = {
        nickname: this.nickname
      };
      _changeEmployeeInfo(params).then(res => {
        if (res.data.success) {
          this.changeNickName(this.nickname);
          this.changeNameShow = false;
          this.nickname = "";
        }
      });
    },
    changePhone1(e) {
      let _this = this;
      api.getPicture(
        {
          sourceType: "library",
          encodingType: "jpg",
          mediaValue: "pic",
          destinationType: "base64",
          allowEdit: true,
          quality: 50,
          targetWidth: 100,
          targetHeight: 100,
          saveToPhotoAlbum: false
        },
        (ret, err) => {
          if (ret) {
            let bast64 = ret.base64Data;
            let params = {
              headerFileBase64: bast64
            };
            _changeEmployeeInfo(params).then(res => {
              if (res.data.success) {
                _this.changeHeadImg(res.data.data.filePath);
                _this.phonePopShow = false;
              }
            });
          } else {
            _this.$notify(JSON.stringify(err));
          }
        }
      );
    },
    toPhotograph() {
      let _this = this;
      api.getPicture(
        {
          sourceType: "camera",
          encodingType: "jpg",
          mediaValue: "pic",
          destinationType: "base64",
          allowEdit: true,
          quality: 50,
          targetWidth: 100,
          targetHeight: 100,
          saveToPhotoAlbum: false
        },
        (ret, err) => {
          if (ret) {
            let params = {
              headerFileBase64: ret.base64Data
            };
            _changeEmployeeInfo(params).then(res => {
              if (res.data.success) {
                _this.changeHeadImg(res.data.data.filePath);
                _this.phonePopShow = false;
              }
            });
          } else {
            _this.$notify(JSON.stringify(err));
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.set_up {
  background: #fff;
  padding-left: 0.3rem;
  .set_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0;
    line-height: 1;
    > h3 {
      font-size: 0.28rem;
    }
    .right_item {
      display: flex;
      justify-items: center;
      align-items: center;
      padding-right: 0.3rem;
      .user_pic_box {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 100%;
        position: relative;
        overflow: hidden;
        .user_pic {
          width: 0.8rem;
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .right_icon {
        width: 0.14rem;
        display: block;
        margin-left: 0.38rem;
      }
      .user_name {
        color: #333;
        font-size: 0.28rem;
      }
      .phone {
        color: #bababa;
        font-size: 0.28rem;
      }
      .phone_reg {
        color: #bababa;
        margin-left: 0.38rem;
        font-size: 0.28rem;
      }
    }
  }
  .set_item_border {
    border-bottom: 0.01rem solid #f5f5f5;
  }
  .et_item_border:last-child {
    border: none;
  }
}
.bottom_container {
}
</style>
