<template>
  <div class="header" v-if="!isMicromessenger">
    <div class="left_icon">
      <Icon v-if="hasBack" @click="goBack" name="arrow-left" />
    </div>
    <h3 v-text="title"></h3>
    <p></p>
  </div>
</template>
<script>
import { Icon } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true
    },
    hasBack: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Icon
  },
  computed: {
    ...mapState({
      isMicromessenger: state => state.login.isMicromessenger
    })
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  background: #fff;
  padding: 0 0.3rem;
  height: 1rem;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  .left_icon {
    flex: 0 0 1rem;
    font-size: 0.36rem;
  }
  > h3 {
    flex: 1;
    text-align: center;
    line-height: 44px;
    font-size: 0.36rem;
  }
  p {
    flex: 0 0 1rem;
    text-align: right;
  }
}
</style>
