<template>
  <div :class="{'has-header':true}">
    <topHeader :title="'嘉美员工端'"></topHeader>
    <div class="work_notice">
      <List v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
        <div class="work_item" v-for="(item,index) in workList" :key="index">
          <div class="send_time" v-text="item.createTimeStr"></div>
          <div class="work_info">
            <img src="../assets/images/icon_work.png" />
            <div class="right_info">
              <h3>工作通知</h3>
              <div class="message_info">
                <h3>工作通知</h3>
                <p v-text="item.content"></p>
              </div>
            </div>
          </div>
        </div>
      </List>
    </div>
  </div>
</template>
<script>
import { Button, Toast, List } from "vant";
import topHeader from "./component/header";
import { _getWorkNotice, _updateMessage } from "../service/work";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      workParams: {
        pageSize: 4,
        pageNumber: 1
      },
      workList: []
    };
  },
  components: {
    Button,
    Toast,
    List,
    topHeader
  },
  mounted() {
    this.workList = [];
    _updateMessage().then(res => {
      console.log(res);
    });
  },
  methods: {
    getData() {
      _getWorkNotice(this.workParams).then(res => {
        if (res.data.success) {
          let page = res.data.data.page;
          let resData = res.data.data.list;
          if (this.workParams.pageNumber >= page.totalPage) {
            this.finished = true;
          }
          this.workList.push(...resData);
          this.loading = false;
          this.workParams.pageNumber++;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.work_notice {
  padding: 0 0.3rem;
  .work_item {
    padding: 0.4rem 0 0 0;
    .send_time {
      width: 2rem;
      text-align: center;
      margin: 0 auto;
      color: #fff;
      background: #d3d3d3;
      border-radius: 0.1rem;
    }
    .work_info {
      display: flex;
      align-items: flex-start;
      padding-top: 0.4rem;
      > img {
        width: 0.82rem;
      }
      .right_info {
        flex: 1;
        padding-left: 0.28rem;
        > h3 {
          color: #999;
          font-size: 0.24rem;
        }
        .message_info {
          margin-top: 0.18rem;
          background: #fff;
          border-radius: 0.1rem;
          padding: 0.3rem 0.26rem;
          box-shadow: 0.01rem 0.03rem 0rem #e0e0e0;
          h3 {
            color: #f26702;
            font-size: 0.32rem;
          }
          p {
            padding-top: 0.2rem;
            font-size: 0.28rem;
          }
        }
      }
    }
  }
}
</style>

