<!--
    开发人:Victoria
-->
<template>
  <div class="Header">
    <div class="breadcrumb"></div>
    <div class="headerSet" @click="submit">提交</div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  methods: {
    submit() {
      this.$emit('submit');
    },
  },
};
</script>
<style lang="less" scoped>
.Header {
  width: 100px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .headerSet {
    height: 100%;
    font-size: 16px;
    height: 24px;
    line-height: 24px;
    margin-right: 20px;
    border-bottom: 1px solid #4c72bf;
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
}
</style>
