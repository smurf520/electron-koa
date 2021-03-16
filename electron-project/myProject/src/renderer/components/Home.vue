<!--
    开发人:Victoria
-->
<template>
  <div class="Home">
    <div class="leftMenu">
      <Side @addNewNote="addNewNote" />
    </div>
    <div class="rightContent">
      <!-- <transition name="fade"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import Side from './left/Side';
import Note from './right/Note';

export default {
  name: 'Home',
  components: {
    VueDraggableResizable,
    Side,
    Note,
  },
  data() {
    return {};
  },
  methods: {
    addNewNote() {},
  },
};
</script>
<style lang="less" scoped>
.Home {
  width: 100%;
  height: 100%;
  background: url('../assets/imgs/cat.jpg');
  background-size: cover;
  display: flex;
  flex-direction: row;
  .leftMenu {
    width: 200px;
    height: 100%;
  }
  .rightContent {
    flex: 1;
  }
}
</style>
