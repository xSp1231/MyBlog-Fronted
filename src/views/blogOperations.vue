<template>
  <div class="addBlogArea">
    <div class="top" style="background-color: #ffffff;height: 6%; display: flex; align-items: center;">
      <div class="inputArea" style="width: 25%;height: 80%;margin-left:3px">
        <el-input
            v-model="blog.title"
            placeholder="请输入blog的标题"
            maxlength="50"
            show-word-limit
            class="input-with-select"
        >
          <template #prepend>
            <el-button :icon="Memo" style="font-size: large;color: #bbb9b9;"/>
          </template>
        </el-input>
      </div>
      <div class="description"
           style="width:9%;height: 70%;margin-left:40% ;background-color: rgba(238,233,233,0.57);border-radius: 10px;">
        <p style="text-align: center;margin-bottom: 0;margin-top:3px;font-size:medium;color: rgba(155,203,197,0.74);font-weight: bold;font-family: 'Andale Mono',sans-serif;">
          {{ blog.type }}</p>
      </div>
      <div class="typeSelection"
           style="width: 30%;height: 80%;margin-left:10px ;background-color: rgba(236,241,240,0.98);border-radius: 10px; display: flex; justify-content:space-around">
        <div v-for="(item, index) in items" :key="index">
          <el-button @click="selectType(item)"
                     style="margin-left: 3px;margin-right:2px;margin-top: 3%;border-radius: 10px;height: 80%;"
                     :type="item.type" plain>{{ item.text }}
          </el-button>
        </div>
      </div>
    </div>
    <v-md-editor class="markdownEditor"
                 mode=""
                 left-toolbar="undo redo | tip | emoji clear h bold italic strikethrough quote ul ol table hr link image code save"
                 v-model="blog.text"
                 :disabled-menus="[]"
                 @upload-image="handleUploadImage"
                 @copy-code-success="handleCopyCodeSuccess"
                 height="88%"
                 width="500px">

    </v-md-editor>
    <div class="submit" style="background-color: rgba(250,250,250,0.89);height:6%">

      <el-button type="info" style="margin-top: 6px;margin-left: 73%" round plain :icon="Edit" @click="updateBlog()">
        修改Blog
      </el-button>
      <el-button type="primary" style="margin-top: 6px;margin-left:12px" round plain :icon="Plus" @click="blogOperations()">
        发布Blog
      </el-button>
      <el-button type="success" style="margin-top: 6px" plain round :icon="Refresh" @click="reset()">重置</el-button>

    </div>
  </div>
</template>

<script setup>

import api from '../api/index.js'
import {Memo, Plus, Refresh,Edit} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import {ElMessage, ElNotification} from "element-plus";

const items = [
  {type: 'primary', text: '代码技术'},
  {type: 'danger', text: '生活分享'},
  {type: 'warning', text: '学习心得'},
  {type: 'success', text: '在路上!'},
  {type: 'info', text: '其他'},
]
const blog = ref({
  username: "",
  title: "",
  type: "选择文章类型",//文章类型
  createTime: "",
  text: ""
})
const selectType = (it) => {
  console.log("选择的type is ", it)
  blog.value.type = it.text;
  ElNotification.success({
    title: 'Success',
    message: 'blog类型选择成功!',
    offset: 100,
    duration: 1600
  })
}
const isAllSpaces = (str) => { //检测文本内容是否全为空格
  const regex = /^[\s]*$/;
  return regex.test(str);
}
const addBlog = () => {
  console.log("文本长度 ", blog.value.text.length)
  //检查是否选择完毕
  if (blog.value.text === "" || isAllSpaces(blog.value.text) === true) { //检测文本内容是否全为空格 或内容是否为空
    ElMessage({
      message: 'blog内容不可为空',
      type: 'warning',
    })
  } else if (blog.value.type === "选择文章类型") {
    ElMessage({
      message: '请选择blog的类型',
      type: 'warning',
    })
  } else if (blog.value.title === "") {
    ElMessage({
      message: '请填写blog的标题',
      type: 'warning',
    })
  } else {
    console.log("上传的blog内容 is ",blog.value)
    api.post("/addBlog",blog.value).then(res=>{
      if(res.data.flag===true){
        ElMessage({
          message: res.data.message,
          type: 'success',
        })
      }else{
        ElMessage({
          message: res.data.message,
          type: 'error',
        })
      }
    })
  }
}
const updateBlog=()=>{
  if (blog.value.text === "" || isAllSpaces(blog.value.text) === true) { //检测文本内容是否全为空格 或内容是否为空
    ElMessage({
      message: 'blog内容不可为空',
      type: 'warning',
    })
  } else if (blog.value.type === "选择文章类型") {
    ElMessage({
      message: '请选择blog的类型',
      type: 'warning',
    })
  } else if (blog.value.title === "") {
    ElMessage({
      message: '请填写blog的标题',
      type: 'warning',
    })
  } else {
    console.log("上传的blog内容 is ",blog.value)
    api.post("/updateBlog",blog.value).then(res=>{
      if(res.data.flag===true){
        ElMessage({
          message: res.data.message,
          type: 'success',
        })
      }else{
        ElMessage({
          message: res.data.message,
          type: 'error',
        })
      }
    })
  }


}
const reset = () => {
  blog.value.title = ''
  blog.value.username = ''
  blog.value.type = ''
  blog.value.createTime = ''
  blog.value.text = ''
}
const getBlogByUsernameAndTitle = () => {
  api.get('/getBlog/xsp/云').then(res=>{
    console.log("获取的数据",res.data.data.text)
    blog.value=res.data.data;
  })
}
//markdown里面上传本地图片
const handleUploadImage=(event, insertImage, files)=> {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  for(let i in files){
    //
    //console.log("上传图片",files);
    let Data=new FormData();
    Data.append("img",files[i]);
    Data.append("user","xsp");
    console.log(Data.get("img"))
    api.post("/uploadImg",Data).then(res=>{
      console.log("接收的结果 ",res.data.data);
      if(res.data.flag===true){
        insertImage({
             url:res.data.data,
             desc: '图片插入',
             width: 'auto',
             height: 'auto',
        });
      }
      // 此处只做示例
    })
  }
}
const handleCopyCodeSuccess=(code)=> {
  console.log(code);
  ElMessage({
    message: '代码复制成功!',
    type: 'success',
  })
}
onMounted(() => {
  getBlogByUsernameAndTitle();
})

</script>


<style scoped>
.addBlogArea {
  background-color: #deefea;
  width: 100%;
  height: 100%;
}

</style>

