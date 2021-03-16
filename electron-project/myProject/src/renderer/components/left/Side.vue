<!--
    开发人:Victoria
-->
<template>
  <div class="Side">
    <div class="name">
      <div class="avator"></div>
      <div class="text">{{ userName }}</div>
      <div class="logout" title="退出系统" @click="logout"></div>
    </div>
    <div class="fileList">
      <ul>
        <li v-for="item in data" :key="item._id">
          <div :class="clickedId === item._id ? 'activeLi' : ''">
            <span
              class="text"
              @click.stop="setClickedId(item)"
              v-if="renameId !== item._id"
              @contextmenu.prevent="rightClick(item, 1)"
              >{{ item.fileName1 }}</span
            ><el-input
              v-if="renameId === item._id"
              v-model="renameInputValue"
              @blur="inputBlur()"
            ></el-input
            ><span
              class="icon"
              @click.stop="addNote(item._id)"
              title="添加笔记"
            ></span>
          </div>
          <div
            :class="clickedId === itm._id ? 'activeLi' : ''"
            class="child"
            v-if="item.children.length > 0"
            v-for="itm in item.children"
            :key="itm._id"
          >
            <span
              class="text"
              @click.stop="setClickedId(itm)"
              @contextmenu.prevent="rightClick(itm, 2)"
              v-if="renameId !== itm._id"
              >{{ itm.fileName1 }}</span
            >
            <el-input
              v-if="renameId === itm._id"
              v-model="renameInputValue"
              @blur="inputBlur()"
            ></el-input>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottomFixed" @click="addNewNote">
      <div class="icon"></div>
      新建文件夹
    </div>
  </div>
</template>
<script>
export default {
  name: 'Side',
  data() {
    return {
      data: [],
      clickedId: '',
      renameId: '',
      renameInputValue: '',
      updateId: '',
      removeId: '',
      userName: '',
      pushFlag: -1,
    };
  },
  created() {
    this.getFileData();
    this.userName = localStorage.getItem('loginName');
  },
  computed: {
    getDataFlag() {
      return this.$store.getters.getDataFlag;
    },
    clickedIdStore() {
      return this.$store.getters.getClickedId;
    },
    // routeEle() {
    //   return this.$route.params.id;
    // },
  },
  watch: {
    clickedIdStore: {
      handler(v) {
        this.clickedId = v;
      },
      immediate: true,
    },
    getDataFlag(v) {
      if (v) {
        this.getFileData();
      }
    },
    // routeEle(v) {
    //   console.log('===========v', v);
    //   this.clickedId = v;
    // },
  },
  methods: {
    inputBlur() {
      this.renameId = '';
      this.$http
        .post(this.$API.UPDATEFILENAME, {
          fileId: this.updateId,
          reName: this.renameInputValue,
        })
        .then(({ data }) => {
          if (data.code === '000000') {
            if (this.pushFlag === 2) {
              this.$router.push({
                path: `/note/${this.updateId}`,
                query: {
                  updateId: this.updateId,
                  title: this.renameInputValue,
                },
              });
            }
            this.pushFlag = -1;
            this.$store.dispatch('GetData', true);
          }
        });
    },
    rightClick(item, flag) {
      const that = this;
      this.pushFlag = flag;
      /* eslint-disable */
      const { remote } = require('electron');
      const { Menu, MenuItem } = remote;
      const menu = new Menu();
      menu.append(
        new MenuItem({
          label: '删除',
          click: () => {
            that.removeItem(item);
          },
        }),
      );
      menu.append(
        new MenuItem({
          label: '重命名',
          click: () => {
            that.reNameItem(item);
          },
        }),
      );
      menu.popup(remote.getCurrentWindow());
      /* eslint-disable */
    },
    removeItem(item) {
      this.removeId = item._id;
      this.$http
        .post(this.$API.DELITEM, {
          fileId: this.removeId,
        })
        .then(({ data }) => {
          if (data.code === '000000') {
            // this.$message({
            //   message: data.msg,
            //   type: 'success',
            // });
            this.$store.dispatch('GetData', true);
          }
        });
    },
    reNameItem(item) {
      this.renameId = item._id;
      this.updateId = item._id;
      this.renameInputValue = item.fileName1;
    },
    addNote(pId) {
      this.$prompt('请输入标题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.clickedId = '';
        this.$store.commit('SETCLICKEDID', '');
        this.$router.push({
          path: `/note/${pId}`,
          query: {
            pId,
            title: value,
            content: '',
          },
        });
      });
    },
    setClickedId(item) {
      /* eslint-disable */
      this.clickedId = item._id;
      this.$store.commit('SETCLICKEDID', this.clickedId);
      if (item.fileCode === '1') {
        this.$router.push({
          path: `/note/${item._id}`,
          query: {
            pId: item._id,
            content: item.content,
            title: item.fileName1,
          },
        });
      } else {
        this.$router.push('/noteList');
      }
    },
    getFileData() {
      this.$http.post(this.$API.GETFILES).then(({ data }) => {
        if (data.code === '000000') {
          this.data = data.data.fileList;
          this.$store.commit('SETFILEDATA', this.data);
          this.$store.dispatch('GetData', false);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    logout() {
      this.$store.commit('SETCLICKEDID', '');
      localStorage.clear();
      this.$router.push('/login');
    },
    addNewNote() {
      this.$prompt('请输入文件名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          this.$http
            .post(this.$API.INSERTFILES, {
              fileName: value,
            })
            .then(({ data }) => {
              if (data.code === '000000') {
                this.$message({
                  message: data.msg,
                  type: 'success',
                });
                this.getFileData();
              }
            });
        })
        .catch(() => {
          // this.$message({
          //   message: '新建失败',
          //   type: 'error',
          // });
        });
    },
    handleNodeClick(data) {
      // console.log(data);
    },
  },
};
</script>
<style lang="less" scoped>
.Side {
  width: 200px;
  height: 100%;
  background: fade(#ccc, 50%);
  display: flex;
  flex-direction: column;
  .name {
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 70px;
    cursor: pointer;
    .avator {
      width: 30px;
      height: 30px;
      background: url('./../../assets/imgs/avatar.jpg');
      background-size: cover;
      border-radius: 100%;
    }
    .text {
      margin-left: 6px;
    }
    .logout {
      width: 18px;
      height: 18px;
      background: url('./../../assets/imgs/logout.png');
      background-size: cover;
      margin-top: 6px;
      margin-left: 68px;
    }
  }
  .settingListTop {
    padding: 20px;

    height: 130px;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: flex-start;
      height: 30px;
      cursor: pointer;
      .icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
    .quickFind {
      .searchIcon {
        width: 20px;
        height: 20px;
        background: url('./../../assets/imgs/search.png');
        background-size: cover;
        border-radius: 100%;
      }
    }
    .allUpdates {
      .updateIcon {
        width: 12px;
        height: 12px;
        background: url('./../../assets/imgs/update.png');
        background-size: cover;
        border-radius: 100%;
      }
    }
    .settings {
      .setIcon {
        width: 15px;
        height: 15px;
        background: url('./../../assets/imgs/settings.png');
        background-size: cover;
        border-radius: 100%;
      }
    }
  }
  /deep/.fileList {
    height: calc(~'100% - 240px');
    overflow-y: auto;
    border-top: 1px solid fade(#ccc, 80%);
    border-bottom: 1px solid fade(#ccc, 80%);
    ul {
      li {
        display: flex;
        flex-direction: column;
        .icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url('./../../assets/imgs/addNote.png');
          background-size: cover;
        }
        & > div {
          padding: 0 10px 0 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            display: inline-block;
            cursor: pointer;
            height: 30px;
            line-height: 30px;
          }
          .text {
            width: 140px;
          }
        }
        .child {
          padding-left: 30px;
        }
        .activeLi {
          background: fade(#ccc, 80%);
        }
        .el-input {
          width: 100%;
          height: 30px;
          .el-input__inner {
            height: 30px;
            background: fade(#ccc, 80%);
          }
          input {
            // border: none;
            border-radius: none;
          }
        }
      }
    }
  }
  .settingListBottom {
    padding: 20px;
    height: 130px;
    margin-bottom: 40px;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: flex-start;
      height: 30px;
      cursor: pointer;
      .icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
    .templates {
      .tempIcon {
        width: 20px;
        height: 20px;
        background: url('./../../assets/imgs/temp.png');
        background-size: cover;
        border-radius: 100%;
      }
    }
    .import {
      .importIcon {
        width: 12px;
        height: 12px;
        background: url('./../../assets/imgs/import.png');
        background-size: cover;
        border-radius: 100%;
      }
    }
    .trash {
      .trashIcon {
        width: 15px;
        height: 15px;
        background: url('./../../assets/imgs/trash.png');
        background-size: cover;
        border-radius: 100%;
      }
    }
  }
  .bottomFixed {
    padding: 20px;
    background: #ccc;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    position: fixed;
    bottom: 0;
    height: 40px;
    align-items: center;
    font-size: 16px;
    width: 200px;
    .icon {
      width: 20px;
      height: 20px;
      background: url('./../../assets/imgs/addFile.png');
      background-size: cover;
      border-radius: 100%;
      margin-right: 6px;
    }
  }
}
</style>
