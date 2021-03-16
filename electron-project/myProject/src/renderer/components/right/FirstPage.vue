<!--
    开发人:Victoria
-->
<template>
  <div class="FirstPage">
    welcome !
  </div>
</template>
<script>
export default {
  name: 'FirstPage',
};
</script>
<style lang="less" scoped>
.FirstPage {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-image: -webkit-linear-gradient(
    left,
    blue,
    #66ffff 10%,
    #cc00ff 20%,
    #cc00cc 30%,
    #ccccff 40%,
    #00ffff 50%,
    #ccccff 60%,
    #cc00cc 70%,
    #cc00ff 80%,
    #66ffff 90%,
    blue 100%
  );
  -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
  -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
  font-size: 35px;
  @keyframes masked-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
}
</style>
