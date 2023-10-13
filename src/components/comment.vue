<!---comment 评论回复递归组件 子组件--->
<template>
  <div class="comments" v-for="item in list">  <!--评论-->
    <div style="margin-left:0;width:500px;margin-top:3px;background-color:rgba(168,204,197,0.7);border-radius: 6px">
      <div style="display: flex; width: 100%;">

        <h3 v-if="item.parentId===0" style="width: 12%;color: #b07373;margin: 0">{{ item.username }}</h3>  <!--  父节点 设置层级之间的间距-->
        <h3 v-if="item.parentId!==0" style="width: 12%;margin-left: 15px;color: #b07373;margin-right: 0;margin-top: 0">{{ item.username }}</h3><!--子节点右移-->

        <h3 v-if="item.parentId!==0" style="width: 15%;color: #58acb7;font-weight: normal;margin: 0">
          @{{ item.parentUsername }}</h3> <!--如果该条回复存在父级评论 那么就要使用@-->

        <p style="margin-top:0;width: 40%;text-align: left;font-size: 15px;color: #8a8585">&nbsp;&nbsp;{{ item.createTime }}&nbsp;</p>
        <span style="width: 40%;">
        <el-icon style="font-size: 20px;color: #808383 ;margin-left: 35%" @click="click(item)">
          <ChatRound/>
        </el-icon>
        <el-icon style="font-size: 18px;color:#808383;;margin-left: 2%" @click="click(item)">
          <Delete/>
        </el-icon>
        </span>
      </div>
      <!---条件判断-->
      <h4 v-if="item.parentId===0" style="margin-left: 8px;margin-top:-12px;margin-bottom: 0;text-align:left;font-size:13px;color: #656363">{{ item.text }}</h4>
      <h4 v-if="item.parentId!==0" style="margin-left: 22px;margin-top:-12px;margin-bottom: 0;text-align:left;font-size:13px;color: #656363">{{ item.text }}</h4>

    </div>
    <comment v-if="item.children!=null" :list="item.children"/><!--回复-->
  </div>
</template>

<script setup>
import { inject } from 'vue'
import {Delete, ChatRound} from '@element-plus/icons-vue';
const props = defineProps({       //props 父子组件传值  子组件接收值
  list: {
    type: Array,
    default: () => []  //如果未提供数组的值 就表示为空数组
  },
})
const load = inject('loadComments');
const click = (it) => {
  console.log("点击评论 is", it)
  load();
}
</script>
<style scoped>

</style>
