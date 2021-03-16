<!--
    开发人:Victoria
-->
<template>
  <div class="NoteList">
    <div class="box">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click.stop="setClickedId(item)"
        >
          {{ item.fileName1 }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoteList',
  computed: {
    fileData() {
      return this.$store.getters.getFileData;
    },
    clickedId() {
      return this.$store.getters.getClickedId;
    },
    getDataFlag() {
      return this.$store.getters.getDataFlag;
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    setList(data, id) {
      /* eslint-disable */
      data.forEach((item) => {
        if (
          item.fileCode === '0' &&
          item.children.length > 0 &&
          item._id === id
        ) {
          this.list = item.children;
        }
      });
      /* eslint-disable */
    },
    setClickedId(item) {
      this.$store.commit('SETCLICKEDID', item._id);
      this.$router.push({
        path: `/note/${item._id}`,
        query: {
          pId: item._id,
          content: item.content,
          title: item.fileName1,
        },
      });
    },
  },
  watch: {
    fileData: {
      handler(v) {
        // if (v.length > 0 && this.clickedId) {
        //   this.setList(v);
        // }
      },
      deep: true,
      immediate: true,
    },
    clickedId: {
      handler(v) {
        if (v && this.fileData.length > 0) {
          this.setList(this.fileData, v);
        }
      },
      immediate: true,
    },
    getDataFlag(v) {
      if (v) {
        this.setList(this.fileData, v);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.NoteList {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  font-size: 16px;
  margin-left: 50px;
  line-height: 30px;
  ul {
    li {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: skyblue;
      }
    }
  }
}
</style>
