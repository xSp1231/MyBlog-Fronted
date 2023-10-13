<!------->

<!--父组件使用子组件--->
<template>
<!--  <div>-->
<!--    <comment :list="comments" ></comment>-->
<!--  </div>-->

 <div class="main" >
   <div class="list" style="z-index: 1">
   </div>
   <vue-particles
       id="tsparticles"
       :particlesInit="particlesInit"
       :particlesLoaded="particlesLoaded"
       :options="option"
   />
 </div>

</template>

<script setup >
import {provide} from 'vue'
import {onMounted, ref} from "vue";
import api from "../api/index.js";
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
//import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const particlesInit = async engine => {
  await loadFull(engine);
//  await loadSlim(engine);
};

const particlesLoaded = async container => {
  console.log("Particles container loaded", container);
};
const option={
  background: {
    color: {
      // value: '#ececf1'
      value: 'rgba(255, 255, 255, 0.72)'
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: 'rgba(195,217,216,0.62)'
    },
    links: {
      color: '#a1d5d5',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 3,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}


// const comments=ref([])
// const loadComments=()=>{
//   api.get("/getCommentsByArticleName/"+"活着").then(res=>{
//     comments.value=res.data.data;//数据绑定到comments数组里面
//     console.log("获取到的评论数据is" ,comments.value);
//     console.log("方法传递")
//   })
// }
// provide("loadComments",loadComments)
// onMounted(()=>{
//  loadComments()
// })


</script>
<style scoped>
.main{
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
}
.list{
  width: 70%;
  height: 100%;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.72);
  /*水平居中 margin:auto*/
  margin: auto;
}

</style>
