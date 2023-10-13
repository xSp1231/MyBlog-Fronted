<template>
  <div class="topNav">
    <div class="symbol">

      <div
          style="width:100%;background-color: #ecefef;height: 100%;display: flex;justify-content: center;align-items: center;">
        <h3 style="text-align: center;color: #bec5c5;font-family: Arial;font-style: italic;">Blogs --
          用心记录所得</h3>
      </div>
    </div>
    <div class="menu">
      <el-menu
          class="innerMenu"
          mode="horizontal"
          :ellipsis="false"
      >
        <el-menu-item style="width: 22%;" @click="clickMenu(it)" v-for="it in menuData" :key="it.name" :index="it.name">
          <el-icon>
            <component style="color: #808585" :is="it.icon"/>
          </el-icon>
          <h3 style="color: #808585;font-size: medium;margin: 0;">{{ it.label }}</h3>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="person">
      <div class="loginArea" style="width: 15%;height: 100%;margin-left: 50%;display: flex;justify-content: center;align-items: center;">
        <el-button   plain round  style="width: 70%;color: #779da6;font-size: 15px;font-weight: bold;border: 1px solid #779da6;">登录</el-button>
      </div>
      <div class="avatar" style="width: 7.5%;height: 88%;margin-top: 4px;"></div>
      <div class="option" style="width: 22%;height: 100%;margin-left:1%;display: flex">

         <el-icon style="margin-top: 11%;font-size: 25px;color: rgba(126,124,124,0.87)"><Avatar/></el-icon>
         <el-dropdown style="margin-top: 15%">
          <span style="display: flex">
            <h3 style="margin:0;margin-left: 3px">userName</h3>
            <el-icon style="font-size: large;color: #1a1a1a"><ArrowDown></ArrowDown></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息编辑</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ArrowDown, Avatar} from '@element-plus/icons-vue'
import {useRouter,useRoute} from "vue-router";
const router = useRouter();
const route=useRoute();
const menuData = [//菜单栏里面的数据
  {
    path: "/blogList",
    name: "blogList",
    label: "博客列表",
    icon: "HomeFilled",
  },
  {
    path: "/blogOperations",
    name: "blogOperations",
    label: "发布博客",
    icon: "Promotion",
  },
  {
    path: "/main/history",
    name: "history",
    label: "个人博客管理",
    icon: "Share",
  },
  {
    path: "/main/history",
    name: "history",
    label: "数据展示",
    icon: "Histogram",
  },
]
const clickMenu = (it) => {
  if(it.path!==route.path){ //route.path是当前所在的path  it.path是点击要去的path
    console.log("route is ",route.path)
    console.log("it.path is ",it.path)
    router.push(it.path);
}
}

</script>

<style>
.topNav {
  display: flex;
  width: 100%;
  height: 100%;
}

.symbol {
  display: flex;
  padding: 0;
  height: 100%;
  width: 15%;
}

.menu {
  padding: 0;
  height: 100%;
  width: 45%;

}

.innerMenu {
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #e9ebee;

}

.person {
  display: flex;
  padding: 0;
  width: 40%;
  height: 100%;
}

.avatar {
  border-radius: 50%;
  background-image: url('../assets/user.jpg'); /* 设置背景图片 */
  background-size: cover; /* 让背景图片覆盖整个div */
  background-repeat: no-repeat; /* 不重复背景图片 */
}


</style>
