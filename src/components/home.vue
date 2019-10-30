<template>
  <div :class="{'has-header':true,'has-footer':true}">
    <div class="home">
      <topHeader :hasBack="false" :title="'嘉美员工端'"></topHeader>
      <!-- <div id="container" style="width:100%;height:5rem;"></div> -->
      <!-- <a
        href="https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:39.892326,116.342763;title:超好吃冰激凌;addr:手帕口桥北铁路道口&key=X7ABZ-724RG-CMFQX-I72XT-HSNSZ-HVBCR&referer=myapp"
      >哈哈哈哈哈</a>-->
      <!-- 技工信息 -->
      <div class="my_header">
        <div class="header_item">
          <div class="header_img">
            <img :src="employeeInfo.headImg" />
          </div>
          <div class="info">
            <h3 v-text="employeeInfo.truename"></h3>
            <p v-text="employeeInfo.shopName"></p>
          </div>
        </div>
      </div>
      <!-- tabs -->
      <Tabs
        class="def_tabs"
        v-model="tabActive"
        :sticky="true"
        :offset-top="offsetTop"
        :animated="true"
        @change="tabChange"
      >
        <Tab title="待服务">
          <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="getWorkList">
            <div style="padding-bottom:0.3rem;">
              <div class="card_item" v-for="(item,index) in workListData" :key="index">
                <div class="header_box">
                  <h3 v-text="item.employeeName"></h3>
                  <div class="name_right">
                    <p>联系客户经理</p>
                    <img src="../assets/images/icon_Telephone.png" />
                  </div>
                </div>
                <div class="time_box">
                  <div class="time time_left">
                    <div class="times">
                      <h3 v-text="item.time"></h3>
                      <p v-text="item.day"></p>
                    </div>
                    <p>服务时间</p>
                  </div>
                  <div class="time time_right">
                    <h3 v-text="item.productName"></h3>
                    <p>服务项目</p>
                  </div>
                </div>
                <div class="address">
                  <p>
                    服务地址:
                    <span v-text="item.areaText+item.address"></span>
                  </p>
                </div>
                <div class="item_btn">
                  <!-- <a style="display:inline-block;" href> -->
                  <Button @click="toMapPage(item)" class="to_btn">去这里</Button>
                  <!-- </a> -->
                </div>
              </div>
            </div>
          </List>
          <!-- <div class="no_works" v-if="workListData.length==0">
            <img src="../assets/images/def_404.png" alt />
            <p>暂无工作安排</p>
          </div>-->
        </Tab>
        <Tab title="待评价">
          <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div style="padding-bottom:0.3rem;">
              <div class="card_item" v-for="(item,index) in workListData" :key="index">
                <div class="header_box">
                  <h3 v-text="item.employeeName"></h3>
                  <div class="name_right">
                    <p>联系客户经理</p>
                    <img src="../assets/images/icon_Telephone.png" />
                  </div>
                </div>
                <div class="time_box">
                  <div class="time time_left">
                    <div class="times">
                      <h3 v-text="item.time"></h3>
                      <p v-text="item.day"></p>
                    </div>
                    <p>服务时间</p>
                  </div>
                  <div class="time time_right">
                    <h3 v-text="item.productName"></h3>
                    <p>服务项目</p>
                  </div>
                </div>
                <div class="address" style="border:none;">
                  <p>
                    服务地址:
                    <span v-text="item.areaText+item.address"></span>
                  </p>
                </div>
              </div>
            </div>
          </List>
          <!-- <div class="no_works" v-if="workListData.length==0">
            <img src="../assets/images/def_404.png" alt />
            <p>暂无工作安排</p>
          </div>-->
        </Tab>
        <Tab title="已完成">
          <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div style="padding-bottom:0.3rem;">
              <div class="card_item" v-for="(item,index) in workListData" :key="index">
                <div class="header_box">
                  <h3 v-text="item.employeeName"></h3>
                  <div class="name_right">
                    <!-- <p>联系客户经理</p>
                    <img src="../assets/images/icon_Telephone.png" />-->
                  </div>
                </div>
                <div class="time_box">
                  <div class="time time_left">
                    <div class="times">
                      <h3 v-text="item.time"></h3>
                      <p v-text="item.day"></p>
                    </div>
                    <p>服务时间</p>
                  </div>
                  <div class="time time_right">
                    <h3 v-text="item.productName"></h3>
                    <p>服务项目</p>
                  </div>
                </div>
                <div class="address" style="border:none;">
                  <p>
                    服务地址:
                    <span v-text="item.areaText+item.address"></span>
                  </p>
                </div>
              </div>
            </div>
          </List>
          <!-- <div class="no_works" v-if="workListData.length==0">
            <img src="../assets/images/def_404.png" alt />
            <p>暂无工作安排</p>
          </div>-->
        </Tab>
      </Tabs>
    </div>
    <Footer :tabIndex="0"></Footer>
  </div>
</template>
<script>
import { Button, Toast, Tab, Tabs, List } from "vant";
import { mapState, mapMutations } from "vuex";
import topHeader from "./component/header";
import Footer from "./component/footer";
import cardItem from "./component/cardItem";
import { _getEmployeeInfo } from "../service/login";
import { _getWorkList } from "../service/work";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      tabActive: 0,
      loading: false,
      finished: false,
      workParams: {
        pageNumber: 1,
        pageSize: 3,
        status: 1
      },
      workListData: [],
      longitude: 39.916527, //经度
      latitude: 116.397128 //纬度
    };
  },
  components: {
    Button,
    Toast,
    Tab,
    Tabs,
    List,
    topHeader,
    Footer,
    cardItem
  },
  computed: {
    ...mapState({
      employeeInfo: state => state.login.employeeInfo
    }),
    offsetTop: function() {
      let offset = 0;
      if (!this.isMicromessenger) {
        offset = (50 / 750) * (screen.availWidth * 2);
      }
      return offset;
    }
  },
  mounted() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     this.showPosition,
    //     this.showError
    //   );
    // } else {
    //   this.$notify("浏览器不支持地理定位");
    // }
    this.getUserInfo();
    this.loading = false;
  },
  methods: {
    ...mapMutations(["setEmployeeInfo"]),
    showPosition(position) {
      var lat = position.coords.latitude; //纬度
      var lag = position.coords.longitude; //经度
      console.log("纬度:" + lat + ",经度:" + lag);
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
    },
    onLoad() {
      // this.loading = false;
    },
    tabChange(val) {
      this.workListData = [];
      this.workParams.pageNumber = 1;
      switch (val) {
        case 0:
          this.workParams.status = 1;
          break;
        case 1:
          this.workParams.status = 3;
          break;
        case 2:
          this.workParams.status = 4;
          break;
        default:
          break;
      }
      this.finished = false;
    },
    getUserInfo() {
      _getEmployeeInfo().then(res => {
        if (res.data.success) {
          let resData = res.data.data;
          let bastUrl = resData.filePath;
          let params = {
            truename: resData.employee.truename,
            headImg: bastUrl + resData.employee.headImg,
            shopName: resData.shopName,
            levelName: res.data.data.levelName,
            phone: resData.employee.phone,
            nickname: resData.employee.nickname
          };
          this.setEmployeeInfo(params);
        }
      });
    },
    getWorkList() {
      let _this = this;
      _getWorkList(this.workParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          let resData = res.data.data.list;
          resData.forEach(val => {
            let timeInfo = val.servicesTime.split(" ");
            val.time = timeInfo[0];
            val.day = timeInfo[1];
            if (this.workParams.status == 1) {
              axios
                .get(
                  `https://apis.map.qq.com/ws/geocoder/v1/?address=${val.areaText +
                    val.address}&key=X7ABZ-724RG-CMFQX-I72XT-HSNSZ-HVBCR`
                )
                .then(function(res) {
                  val.lat = res.data.result.location.lat;
                  val.lng = res.data.result.location.lng;
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          });
          if (this.workParams.pageNumber >= page.totalPage) {
            this.finished = true;
          }
          this.workListData.push(...resData);
          this.loading = false;
          this.workParams.pageNumber++;
          // console.log(this.workListData);
        }
      });
    },
    toMapPage(item) {
      console.log(item);
      window.open(
        `https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${item.lat},${item.lng};title:${item.address};addr:${item.address}&key=X7ABZ-724RG-CMFQX-I72XT-HSNSZ-HVBCR&referer=myapp`,
        "_blank"
      );
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  .my_header {
    background: linear-gradient(to right, #ef9235, #eb5e2a);
    padding: 0.42rem 0 0.42rem 0.62rem;
    .header_item {
      display: flex;
      align-items: center;
      .header_img {
        position: relative;
        width: 1.16rem;
        height: 1.16rem;
        overflow: hidden;
        border-radius: 100%;
        > img {
          display: block;
          width: 1.16rem;
          border-radius: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .info {
        padding-left: 0.35rem;
        color: #fff;
        line-height: 1;
        h3 {
          font-size: 0.28rem;
        }
        p {
          font-size: 0.24rem;
          padding-top: 0.13rem;
        }
      }
    }
  }
  .card_item {
    background: #fff;
    margin-top: 0.4rem;
    border-radius: 0.2rem;
    padding: 0.4rem 0.3rem;
    .header_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 0.2rem;
      padding-b > h3 {
        font-size: 0.24rem;
      }
      .name_right {
        display: flex;
        align-items: center;
        > p {
          font-size: 0.24rem;
          color: #999;
        }
        > img {
          width: 0.62rem;
          display: block;
          margin-left: 0.08rem;
        }
      }
    }
    .time_box {
      display: flex;
      justify-content: space-between;
      border-bottom: 0.01rem solid #f5f5f5;
      .time {
        line-height: 1;
        h3 {
          font-size: 0.36rem;
        }
        p {
          font-size: 0.24rem;
          color: #999;
          padding: 0.16rem 0 0.3rem 0;
        }
        .times {
          display: flex;
          align-items: flex-end;
          p {
            color: #333;
            padding: 0 0 0 0.2rem;
          }
        }
      }
      .time_right {
        text-align: right;
      }
    }
    .address {
      padding: 0.3rem 0;
      border-bottom: 0.01rem solid #f5f5f5;
      p {
        font-size: 0.24rem;
        color: #999;
        span {
          color: #333;
        }
      }
    }
    .item_btn {
      text-align: right;
      padding-top: 0.2rem;
      .to_btn {
        border-radius: 0.3rem;
        color: #fff;
        background: #eb5d2a;
        width: 1.8rem;
        line-height: 0.6rem;
        height: 0.6rem;
        font-size: 0.28rem;
      }
    }
  }
}
</style>
