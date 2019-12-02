<template>
  <div class="messagebox">
    羚羊top正在跳转中...
    <el-progress :text-inside="true" :stroke-width="10" :percentage="progress" status="warning"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'AfterConnect',
  data() {
    return {
      progress:1
    }
  },
  created() {
    let code = this.$route.query.code
    this.$store.commit('setCode', code)

    // setInterval(() => {
    //   this.progress = this.progress + 5
    // }, 15);

    this.timer = setTimeout(() => {
      this.progress = this.progress + 100
    }, 500);

    setTimeout(() => {
      this.$router.push({path:'/userstat'})
    }, 1500);
  },
}
</script>

<style lang="scss">
.messagebox {
  width: 400px;
  height: 55px;
  margin: 0 auto;
  position: relative;
  top: 40%;
  background-color: rgb(235, 235, 235);
  border-radius: 20px;
  text-align: center;
  padding: 20px 20px 0px 20px;
}

.messagebox .el-progress-bar__innerText {
  margin: 10px 5px;
}

.messagebox .el-progress.is-warning .el-progress-bar__inner {
  background-color: #F9C13D;
}

.messagebox .el-progress-bar__outer {
  background-color: rgb(167, 167, 167);
}
  
</style>