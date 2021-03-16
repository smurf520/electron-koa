<!--
    开发人:Victoria
-->
<template>
  <div class="Note">
    <div class="header">
      <div class="title">{{ headerTitle }}</div>
      <Header @submit="submit" />
    </div>
    <mavon-editor
      v-model="content"
      ref="md"
      @change="change"
      :toolbars="options"
    />
    <!-- :editable="false"
      :subfield="false" -->
    <!-- @imgAd d="$imgAdd" -->
  </div>
</template>
<script>
import Header from './Header';

export default {
  name: 'Note',
  components: {
    Header,
  },
  data() {
    return {
      content: '',
      html: '',
      configs: {},
      headerTitle: '',
      imgFile: {},
      options: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        // link: true, // 链接
        // imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  computed: {
    pId: {
      get() {
        return this.$route.query.pId;
      },
      set() {},
    },
    title: {
      get() {
        return this.$route.query.title;
      },
      set() {},
    },
    content1: {
      get() {
        return this.$route.query.content;
      },
      set() {},
    },
  },
  watch: {
    content1: {
      handler(v) {
        if (v) {
          this.content = v;
        }
      },
      immediate: true,
      deep: true,
    },
    title: {
      handler(v) {
        this.headerTitle = v;
        if (v && this.content1 === '') {
          this.content = '';
        }
      },
      immediate: true,
    },
    pId: {
      handler() {},
      immediate: true,
    },
  },
  created() {
    // this.pId = this.$route.params.pId;
    // if (this.$route.params.title) {
    //   this.title = this.$route.params.title;
    // } else {
    //   this.content = this.$route.params.content;
    // }
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      const formdata = new FormData();
      formdata.append('file', $file);
      this.imgFile[pos] = $file;
      console.log('=============instance', this.imgFile, formdata);
      // this.$http.post('/api/upload/fileds', formdata).then((res) => {
      //   if (res.data.code === 200) {
      //     this.$Message.success('上传成功');
      //     let url = res.data.data;
      //     let name = $file.name;
      //     if (name.includes('-')) {
      //       name = name.replace(/-/g, '');
      //     }
      //     let content = this.form.content;
      //     // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
      //     if (content.includes(name)) {
      //       let oStr = `(${pos})`;
      //       let nStr = `(${url})`;
      //       let index = content.indexOf(oStr);
      //       let str = content.replace(oStr, '');
      //       let insertStr = (soure, start, newStr) => {
      //         return soure.slice(0, start) + newStr + soure.slice(start);
      //       };
      //       this.form.content = insertStr(str, index, nStr);
      //     }
      //   } else {
      //     this.$Message.error(res.data.msg);
      //   }
      // });
    },
    $imgDel(pos) {
      delete this.imgFile[pos];
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit() {
      if (this.content1 === '') {
        this.$http
          .post(this.$API.INSERTFILES, {
            fileName: this.title,
            pId: this.pId,
            content: this.content,
            html: this.html,
          })
          .then(({ data }) => {
            if (data.code === '000000') {
              this.$message({
                message: data.msg,
                type: 'success',
              });
              this.$store.dispatch('GetData', true);
              // this.$router.push({
              //   name: 'home',
              // });
            }
          });
      } else {
        this.$http
          .post(this.$API.UPDATEFILES, {
            pId: this.pId,
            content: this.content,
            html: this.html,
          })
          .then(({ data }) => {
            if (data.code === '000000') {
              this.$message({
                message: data.msg,
                type: 'success',
              });
              this.$store.dispatch('GetData', true);
            }
          });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.Note {
  height: 100%;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title {
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
      font-size: 24px;
    }
  }
  /deep/.v-note-wrapper {
    height: calc(100% - 40px);
    background: transparent;
    .v-note-op {
      background-color: transparent !important;
    }
    .v-note-panel {
      .v-note-edit {
        .content-input-wrapper {
          background: transparent !important;
          .auto-textarea-wrapper {
            background: transparent !important;
            textarea {
              background: transparent !important;
            }
          }
        }
      }
      .v-note-show {
        background: transparent !important;
        .v-show-content {
          background: transparent !important;
        }
      }
    }
  }
}
</style>
