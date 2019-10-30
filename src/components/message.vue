<template>
  <div style="height:100%;" :class="{'has-header':true,'has-footer':true}">
    <topHeader :hasBack="false" :title="'嘉美员工端'"></topHeader>
    <div class="message">
      <div class="message_item" @click="toWorkList">
        <img src="../assets/images/icon_work.png" />
        <div class="item_right">
          <div class="title">
            <h3>工作通知</h3>
            <span v-text="messageData.timeStr"></span>
          </div>
          <div class="item_info">
            <p v-text="messageData.lastStr"></p>
            <em v-if="messageData.size>0" v-text="messageData.size"></em>
          </div>
        </div>
      </div>
      <!-- 
        <div class="message_item">
          <img src="../assets/images/def_my_pictuier.png" />
          <div class="item_right">
            <div class="title">
              <h3>王经理</h3>
              <span>5分钟前</span>
            </div>
            <div class="item_info">
              <p>[考勤打卡]昨日下班你没有打卡，快去上课的飞机上的发送大夫似地方</p>
              <em style="visibility: hidden;">6</em>
            </div>
          </div>
        </div>
      -->
    </div>
    <Footer :tabIndex="2"></Footer>
  </div>
</template>
<script>
import topHeader from "./component/header";
import Footer from "./component/footer";
import { _getWorkMessage } from "../service/work";
export default {
  data() {
    return {
      messageData: {
        lastStr: "",
        size: 0,
        timeStr: ""
      }
    };
  },
  components: {
    topHeader,
    Footer
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      _getWorkMessage().then(res => {
        if (res.data.success) {
          let data = res.data.data;
          this.messageData = data;
        }
      });
    },
    toWorkList() {
      this.pushTo("WorkNoticeList");
    }
  }
};
</script>
<style lang="less" scoped>
.message {
  .message_item {
    display: flex;
    align-items: flex-start;
    padding: 0.3rem 0 0 0.3rem;
    background: #fff;
    > img {
      width: 1.02rem;
    }
    .item_right {
      line-height: 1;
      flex: 1;
      padding: 0 0 0 0.24rem;
      .title {
        display: flex;
        justify-content: space-between;
        padding-right: 0.3rem;
        > h3 {
          font-size: 0.32rem;
        }
        > span {
          font-size: 0.24rem;
          color: #bfbfbf;
        }
      }
      .item_info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.17rem 0.3rem 0.4rem 0;
        border-bottom: 0.01rem solid #e6e6e6;
        > p {
          font-size: 0.26rem;
          color: #bfbfbf;
          width: 4.3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > em {
          display: block;
          border-radius: 100%;
          background: #eb5d2a;
          color: #fff;
          width: 0.34rem;
          line-height: 0.34rem;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .message_item:last-child {
    .item_info {
      border: none;
    }
  }
}
</style>
