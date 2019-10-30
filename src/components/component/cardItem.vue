<template>
  <div class="card">
    <div class="card_item" v-for="(item,index) in cardList" :key="index">
      <div class="header_box">
        <h3 v-text="item.title1"></h3>
        <div class="name_right">
          <p>联系客户经理</p>
          <img src="../../assets/images/icon_Telephone.png" />
        </div>
      </div>
      <div class="time_box">
        <div class="time time_left">
          <div class="times">
            <h3 v-text="item.title2"></h3>
            <p v-text="item.title3"></p>
          </div>
          <p>服务时间</p>
        </div>
        <div class="time time_right">
          <h3 v-text="item.title4"></h3>
          <p>服务项目</p>
        </div>
      </div>
      <div class="address">
        <p>
          服务地址:
          <span v-text="item.title5"></span>
        </p>
      </div>
      <div class="item_btn">
        <Button @click="aaa" class="to_btn">去这里</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from "vant";
export default {
  data() {
    return {
      cardList: this.cardParams
    };
  },
  props: {
    cardParams: {
      type: Array,
      required: true
    }
  },
  components: {
    Button
  },
  watch: {
    cardParams: function(newVal, oldVal) {
      this.cardList = newVal;
    }
  },
  mounted() {
  },
  methods: {
    aaa() {}
  }
};
</script>
<style lang="less" scoped>
.card {
  padding: 0 0.3rem 0.8rem 0.3rem;

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
