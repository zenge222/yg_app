<template>
  <div :class="{'footer':true,'fix-iphonex-buttom':isIphoneX}">
    <div
      @click="toLink(item)"
      :class="{'active':tabIndex==index}"
      v-for="(item,index) in footerList"
    >
      <p v-text="item.title"></p>
    </div>
  </div>
</template> 
<script>
import { Icon } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      footerList: [
        { title: "首页", path: "Home" },
        { title: "工作", path: "SignIn" },
        { title: "消息", path: "Message" },
        { title: "我的", path: "My" }
      ]
    };
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    Icon
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger,
      isIphoneX: state => state.login.isIphoneX
    })
  },
  mounted() {},
  methods: {
    toLink(item) {
      this.replaceTo(item.path);
    }
  }
};
</script>
<style lang="less" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  text-align: center;
  background: #fff;
  border-top: 1px solid #dcdcdc;
  height: 0.96rem;
  > div {
    flex: 1;
    padding: 0.6rem 0 0.1rem 0;
    color: #b1b7c2;
    font-size: 0.2rem;
  }
  > div:nth-child(1) {
    background: url("../../assets/images/icon_home_gay.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(2) {
    background: url("../../assets/images/icon_work_gay.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(3) {
    background: url("../../assets/images/icon_news_gay.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(4) {
    background: url("../../assets/images/icon_my_gay.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
  > div:nth-child(1).active {
    color: #eb5d2a;
    background: url("../../assets/images/icon_home_yellow.png") no-repeat center
      2px;
    background-size: 0.5rem;
  }
  > div:nth-child(2).active {
    color: #eb5d2a;
    background: url("../../assets/images/icon_work_yellow.png") no-repeat center
      2px;
    background-size: 0.5rem;
  }
  > div:nth-child(3).active {
    color: #eb5d2a;
    background: url("../../assets/images/icon_news_yellow.png") no-repeat center
      2px;
    background-size: 0.5rem;
  }
  > div:nth-child(4).active {
    color: #eb5d2a;
    background: url("../../assets/images/icon_my_yellow.png") no-repeat center 2px;
    background-size: 0.5rem;
  }
}
</style>
