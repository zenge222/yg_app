<template>
  <div style="height:100%;" :class="{'has-header':true}">
    <topHeader :title="'404'"></topHeader>
  </div>
</template>
<script>
import { Button, Toast, Icon, Field } from "vant";
import topHeader from "./component/header";
export default {
  data() {
    return {};
  },
  components: {
    Button,
    Toast,
    Icon,
    Field,
    topHeader
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
