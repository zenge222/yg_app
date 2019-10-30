<template>
  <div class="me-detail">
    <input @change="editPic1($event)" type="file" accept="image/*" capture="camera" />
    <input type="file" accept="image/*" />
  </div>
</template>
<script>
import { _changeEmployeeInfo } from "../service/login";
export default {
  data() {
    return {
      imgList: [],
      datas: new FormData(),
      files: 0,
      size: 0
    };
  },
  methods: {
    editPic1(e) {
      let file = e.target.files[0];
      let _this = this;
      if (file) {
        let isLt5M = (file.size / 1024).toFixed(2);
        if (isLt5M < 5120) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {};
          let data = new FormData();
          data.append("headerFile", file);
          console.log(data);
          _changeEmployeeInfo(data).then(res => {
            console.log(res);
          });
        } else {
          this.$notify("上传文件大小不能超过 5MB");
        }
      }
    }
  }
};
</script>
<style lang="less" scope>
</style>