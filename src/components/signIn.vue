<template>
  <div style="height:100%;" :class="{'has-header':true,'has-footer':true}">
    <topHeader :hasBack="false" :title="'嘉美员工端'"></topHeader>
    <div class="sign_in" v-if="hasWork">
      <div class="sign_container">
        <img class="sign_pic" src="../assets/images/def_Illustration.png" />
        <Button v-if="signInType==0" class="sign_btn" @click="signIn">立即签到</Button>
        <img v-if="signInType==1" class="signin_img" src="../assets/images/sign_success.png" />
        <img v-if="signInType==2" class="signin_img" src="../assets/images/sign_late.png" />
        <div class="work_container">
          <div class="work_header">
            <div class="header_work">
              <h3>工作内容</h3>
              <img src="../assets/images/def_title.png" />
            </div>
          </div>
          <div class="work_center">
            <div class="center_work">
              <div class="work_list">
                <div class="list_item" v-for="(item,index) in workList" :key="index">
                  <div class="work_message">
                    <p v-text="(index+1)+'.'+item.title"></p>
                  </div>
                  <div id="input_box" @click="selWork(item)">
                    <span>
                      <input class="input_item" type="checkbox" :checked="item.checked" />
                      <label>
                        <span style="width:0.36rem; height:0.36rem;"></span>
                      </label>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="work_footer">
            <div class="footer_work">
              <Button class="submit_btn" @click="submitWork">提交信息</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no_works" v-if="!hasWork">
      <img src="../assets/images/def_404.png" alt />
      <p>暂无工作安排</p>
    </div>
    <Footer :tabIndex="1"></Footer>
  </div>
</template> 
<script>
import { Button, Toast, Icon, Field } from "vant";
import { mapState, mapMutations } from "vuex";
import topHeader from "./component/header";
import Footer from "./component/footer";
import { _toSignIn } from "../service/login";
import {
  _getJobContent,
  _getLongLat,
  _locationScope,
  _workSubmit
} from "../service/work";
export default {
  data() {
    return {
      hasWork: false,
      workParams: {
        pageNumber: 1,
        pageSize: 5
      },
      servicesId: "",
      addressStr: "",
      workList: [],
      targetLocation: {
        lat: 0,
        lag: 0
      },
      distance: 2000,
      isSignIn: false,
      signInType: 0
    };
  },
  components: {
    Button,
    Toast,
    Icon,
    Field,
    topHeader,
    Footer
  },
  computed: {
    ...mapState({
      mapKey: state => state.login.mapKey
    })
  },
  mounted() {
    this.signInType = 0;
    this.isSignIn = false;
    this.getData();
  },
  methods: {
    getData() {
      let _this = this;
      _getJobContent(this.workParams).then(res => {
        if (res.data.success) {
          let endData = [];
          this.addressStr = res.data.data.addressStr;
          this.servicesId = res.data.data.servicesId;
          let resData = res.data.data.servicesItems;
          if (resData.length == 0) {
            this.hasWork = false;
            return;
          }
          this.hasWork = true;
          resData.forEach(val => {
            let obj = {};
            obj.checked = false;
            obj.title = val;
            endData.push(obj);
          });
          this.workList = endData;
          let params = {
            address: this.addressStr,
            key: this.mapKey
          };
          // 地址逆解析
          _getLongLat(params).then(res => {
            let location = res.data.result.location;
            _this.targetLocation.lat = location.lat;
            _this.targetLocation.lng = location.lng;
          });
        }
      });
    },
    selWork(item) {
      item.checked = !item.checked;
    },
    signIn() {
      let _this = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        // this.$notify("浏览器不支持地理定位");
        this.$notify("签到失败 请开启定位");
      }
    },
    submitWork() {
      let _this = this;
      let workChecked = true;
      if (!this.isSignIn) {
        this.$notify("您还未签到");
        return;
      }
      this.workList.find(val => {
        if (!val.checked) {
          workChecked = false;
        }
      });
      if (!workChecked) {
        this.$notify("您还有未勾选的工作内容");
        return;
      }
      let params = {
        servicesId: this.servicesId
      };
      _workSubmit(params).then(res => {
        if (res.data.success) {
          _this.getData();
        }
      });
    },
    // 当前经纬度
    showPosition(position) {
      let _this = this;
      let lat = position.coords.latitude; //纬度
      let lng = position.coords.longitude; //经度
      // alert(`定位当前经纬度 lat:${lat} lng:${lng}`);
      // alert(
      //   `目标经纬度 lat${_this.targetLocation.lat} lng:${_this.targetLocation.lng}`
      // );
      // alert("纬度:" + lat + ",经度:" + lag);
      let params = {
        from: `${lat},${lng}`,
        to: `${_this.targetLocation.lat},${_this.targetLocation.lng}`,
        key: this.mapKey
      };
      // 计算目标距离
      _locationScope(params).then(res => {
        // alert("_locationScope");
        // alert(JSON.stringify(res.data));
        _this.distance = res.data.result.elements[0].distance;
        alert("计算目标距离:" + _this.distance);
        if (_this.distance > 2000) {
          _this.$toast("未达到指定范围无法签到");
          return;
        }
        let params = {
          servicesId: this.servicesId
        };
        _toSignIn(params).then(res => {
          // 迟到签到
          if (res.data.data.status == 501) {
            _this.signInType = 2;
            this.isSignIn = true;
            return;
          }
          // 签到成功
          if (res.data.success) {
            this.isSignIn = true;
            _this.signInType = 1;
          }
        });
      });
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.$notify("定位失败,用户拒绝请求地理定位");
          break;
        case error.POSITION_UNAVAILABLE:
          this.$notify("定位失败,位置信息是不可用");
          break;
        case error.TIMEOUT:
          this.$notify("定位失败,请求获取用户位置超时");
          break;
        case error.UNKNOWN_ERROR:
          this.$notify("定位失败,定位系统失效");
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sign_in {
  width: 100%;
  height: 100%;
  background: url("../assets/images/def_circle.png") no-repeat,
    -webkit-linear-gradient(#f99c3f, #f36a37);
  background: url("../assets/images/def_circle.png") no-repeat,
    -o-linear-gradient(#f99c3f, #f36a37);
  background: url("../assets/images/def_circle.png") no-repeat,
    -moz-linear-gradient(#f99c3f, #f36a37);
  background: url("../assets/images/def_circle.png") no-repeat,
    linear-gradient(#f99c3f, #f36a37);
  .sign_container {
    height: 100%;
    box-sizing: border-box;
    padding: 0.3rem;
    .sign_pic {
      width: 5.1rem;
      display: block;
      margin: 0 auto;
    }
    .signin_img {
      display: block;
      margin: 0 auto;
      width: 2.9rem;
      margin-top: 0.24rem;
    }
    .sign_btn {
      width: 4rem;
      height: 0.88rem;
      line-height: 0.88rem;
      border-radius: 0.5rem;
      display: block;
      margin: 0.24rem auto 0.4rem auto;
      color: #fff;
      background: linear-gradient(#fdc327, #ff7e21);
      border: none;
      box-shadow: 0rem 0.03rem 0.12rem 0rem #d97633;
      font-size: 0.32rem;
    }
    .work_container {
      margin: 0.2rem auto 0 auto;
      width: 90%;
      overflow: hidden;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.3);
      padding: 0.1rem;
      border-radius: 0.24rem;
      position: absolute;
      top: 5rem;
      left: 50%;
      bottom: 1.4rem;
      transform: translate(-50%, 0);
      text-align: center;
      .work_header {
        padding: 0 0.1rem;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 0;
        width: 100%;
        transform: translate(-50%, 0);
        .header_work {
          //   padding-top: 20px;
          position: relative;
          background: #fff;
          height: 1.2rem;
          width: 100%;
          margin-top: 0.1rem;
          border-top-left-radius: 0.24rem;
          border-top-right-radius: 0.24rem;
          > h3 {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.28rem;
            line-height: 1;
            color: #eb5d2a;
          }
          > img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 2.3rem;
          }
        }
      }
      .work_center {
        position: absolute;
        top: 1.28rem;
        left: 50%;
        bottom: 1.58rem;
        width: 100%;
        transform: translate(-50%, 0);
        padding: 0 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
        padding-bottom: 0.1rem;
        .center_work {
          height: 100%;
          background-color: #fff;
          .work_list {
            padding: 0 20px 0 20px;
            box-sizing: border-box;

            -webkit-flex: 1;
            -ms-flex: 1;
            -moz-flex: 1;
            flex: 1;

            height: 300px;
            overflow: hidden;
            overflow-y: scroll;
          }

          .work_list .list_item {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;

            -webkit-box-pack: justify;
            -moz-justify-content: space-between;
            -webkit-justify-content: space-between;
            justify-content: space-between;

            -webkit-box-align: center;
            -moz-align-items: center;
            -webkit-align-items: center;
            align-items: center;
            padding-bottom: 0.4rem;
          }

          .work_list .list_item .work_message {
            overflow: hidden;
            box-sizing: border-box;
            // padding: 0 1rem;
            flex: 1;
            text-align: left;
            padding-right: 0.47rem;
          }

          .work_list .list_item .work_message p {
            font-size: 0.24rem;
            word-wrap: break-word;
            margin: 0;
            color: #eb5d2a;
          }

          .work_list .list_item h3 {
            font-size: 1.4rem;
            margin: 0;
            line-height: 1.6;
            font-weight: normal;
            color: #eb5d2a;

            -webkit-flex: 1;
            -ms-flex: 1;
            -moz-flex: 1;
            flex: 1;
          }
          input[type="checkbox"] {
            display: none;
          }

          input[type="checkbox"] + label {
            margin: 0 auto;
            display: inline-block;
            cursor: pointer;
          }

          input[type="checkbox"] + label > span {
            background: url(../assets/images/btn_circle.png) no-repeat;
            width: 0.36rem;
            height: 0.36rem;
            background-size: 0.36rem 0.36rem;
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
          }

          input[type="checkbox"]:checked + label > span {
            background: url("../assets/images/btn_yse.png") no-repeat;
            width: 0.36rem;
            height: 0.36rem;
            background-size: 0.36rem 0.36rem;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
      .work_footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0.1rem;
        box-sizing: border-box;
        .footer_work {
          background: #fff;
          box-sizing: border-box;
          padding: 0.4rem 0.9rem;
          border-bottom-left-radius: 0.24rem;
          border-bottom-right-radius: 0.24rem;
          .submit_btn {
            line-height: 0.8rem;
            height: 0.8rem;
            width: 100%;
            background: #eb5d2a;
            color: #fff;
            font-size: 0.3rem;
            border-radius: 0.4rem;
          }
        }
      }
    }
  }
}
</style>