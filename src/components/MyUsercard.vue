<template>
  <div class="uesercard">
    <div class="head">
        <img :src="userId.avatar" alt="">
    </div>
    
    <div class="name">{{userId.nickname}}</div>
    <div class="id_info">
      <span class="gender">{{userId.gender==1? "男": userId.gender==2? "女":"未知"}}</span>
      <span class="location">{{userId.province}}</span>
      <span class="location">{{userId.city}}</span>
    </div>
    <div class="sendMsg">
    <el-button plain type="primary">发私信</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    userId:{
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
.uesercard{
   margin: 30px 20px;

   .head {
    width: 120px;
    height: 120px;
    border: 8px solid #ececec;
    box-sizing: border-box;
    border-radius: 60px;
    background-color: #ececec;
    overflow: hidden;
    margin-bottom: 5px;

    img{
      width: 100%;
      height: 100%;
      }
    }
    .name{
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 15px;
      text-align: center;
      margin-bottom: 5px;
      font-weight: 600;
      color: rgb(46, 46, 46)
    }
    .id_info {
      width: 120px;
      font-size: 12px;
      text-align: center;
      margin-bottom: 5px;
      color: rgb(110, 110, 110);
  
      .gender {
        margin-right: 10px;
      }
    }
    .sendMsg {
      width: 120px;
      height: 30px;
      font-size: 15px;
      line-height: 30px;
      text-align: center;
      .el-button--primary.is-plain{
        color: rgb(255, 122, 28);
        font-weight: 600;
        width: 100px;
        height: 30px;
        padding: 0;
      }
      .el-button--primary.is-plain:hover{
        color: #fff;
      }
    }
}
  
</style>