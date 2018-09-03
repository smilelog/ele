<template>
    <div  class="moster"  >
      <div :class="[detailshow == false?'one':'one1']">
        <img class="tu-b" :src="seller.avatar">
        <div class="header">
          <div class="main">
            <div><img  class="tu" :src="seller.avatar"></div>
            <div class="tu1">
              <p class="p1"><img src="./brand@2x.png"><span>{{seller.name}}</span></p>
              <p class="p2">{{seller.description}}</p>
              <p class="p3" v-if="seller.supports"><img src="./decrease_2@2x.png"><span>{{seller.supports[0].description}}</span></p>
            </div>
            <div class="tu2" @click="showDetails">
              <span class="wu">5个<img src="./右箭头小圆角.png"></span>
            </div>
          </div>
          <div class="tu3" @click="showDetails">
            <img src="./bulletin@3x.png" class="tu4">
            <span>{{seller.bulletin}}</span>
          </div>
          <div class="tu5" @click="showDetails">
             <span><img src="./右箭头小圆角.png"></span>
          </div>
          </div>
      </div>  <!--<star :size="48" :score="seller.score"></star>-->
      <transition  name="gray">
      <div class="fade-box" v-show="detailshow" >
          <div class="fade-top">
             <div class="nametop">{{seller.name}}</div>
             <div class="star">
                <xing></xing>
             </div>
            <div class="mainbox">
             <div class="title">
               <div class="line"></div>
               <div class="text">商家优惠</div>
               <div class="line1"></div>
             </div>
             <ul class="ulcor">
               <li class="support-item">
                 <span class="icon"><img src="./decrease_2@2x.png"></span>
                 <span class="text" v-if="seller.supports">在线支付满28减5,满50减10</span>
               </li>
               <li class="support-item">
                 <span class="icon"><img src="./discount_2@2x.png"></span>
                 <span class="text" v-if="seller.supports">单人精彩赛</span>
               </li>
               <li class="support-item">
                 <span class="icon"><img src="./discount_2@2x.png"></span>
                 <span class="text" v-if="seller.supports">清肺雪梨汤8折抢购</span>
               </li>
               <li class="support-item">
                 <span class="icon"><img src="./special_2@2x.png"></span>
                 <span class="text" v-if="seller.supports">特价饮品八折抢购</span>
               </li>
               <li class="support-item">
                 <span class="icon"><img src="./special_2@2x.png"></span>
                 <span class="text" v-if="seller.supports">单人特色套餐</span>
               </li>
             </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line1"></div>
          </div>
          <div class="fade-bottom">
             <p>{{seller.bulletin}}</p>
             </div>
            </div>
         </div>
        <div class="del" @click="hideDetails">
          <img src="./删除.png">
        </div>
      </div>
      </transition>
      </div>
</template>

<script>
import xing from '../star/star.vue'
export default {
  props: ['seller'],
  components: {
    xing
  },
  data () {
    return {
      detailshow: false
    }
  },
  methods: {
    showDetails () {
      this.detailshow = true
    },
    hideDetails () {
      this.detailshow = false
    }
  }
}
</script>

<style scoped>
.moster{
  position:relative;
}
.one{
  width:100%;
  height:2.68rem;
  overflow:hidden;
}
.one1{
  width:100%;
  height:2.68rem;
  overflow:hidden;
  filter: blur(2px);
}
.header{
  background:rgba(7,17,27,0.5);
  width:100%;
  height:2.68rem;
  position:absolute;
  top:0.0rem;
}
.tu-b{
  width:100%;
  height:2.68rem;
  filter: blur(10px);
}
.header span{
  font-size:0.32rem;
}
.tu{
  position:absolute;
  left:0.48rem;
  top:0.48rem;
  width:1.28rem;
  height:1.28rem;
  border-radius:0.04rem;
}
.main{
  width:100%;
  height:2.12rem;
  position:relative;
}
.tu1{
  height:1.28rem;
  width:4.5rem;
  position: absolute;
  left:2.08rem;
  top:0.48rem;
}
.p1 img{
  position: absolute;
  height:0.36rem;
  width:0.6rem;
  top:0.05rem;
}
.p1 span{
  margin-left:0.72rem;
}
.p1{
  height:0.46rem;
  position: relative;
  color:rgb(255,255,255);
  font-size:0.32rem;
  font-weight:bold;
  line-height:0.46rem;
}
.p2{
  height:0.36rem;
  color:rgb(255,255,255);
  font-size:0.24rem;
  font-weight:200;
  line-height:0.36rem;
}
.p3{
  height:0.36rem;
  color:rgb(255,255,255);
  position:relative;
}
.p3 img{
  height:0.3rem;
  width:0.3rem;
  position:absolute;
  top:0.03rem;
}
.p3 span{
  left:0.38rem;
  top:0.08rem;
  font-size:0.2rem;
  font-weight:200;
  position: absolute;
}
.tu2{
  position: absolute;
  text-align:center;
  bottom:0.36rem;
  right:0.24rem;
  height:0.48rem;
  width:0.9rem;
  font-size:0.3rem;
  background-color:rgba(0,0,0,0.2);
  color:rgb(255,255,255);
  line-height:0.48rem;
  border-radius: 0.5rem;
}
.tu2 span{
  margin-left:0.04rem;
}
.tu2 img{
  height:0.3rem;
  width:0.3rem;
}
.tu5 img{
  height:0.3rem;
  width:0.3rem;
}
.tu3{
  position: absolute;
  height:0.56rem;
  width:95%;
  font-weight:200;
  font-size:0.2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  line-height:0.56rem;
  background-color:rgba(7,17,27,0.2);
  color:rgb(255,255,255);
}
.tu3 span{
  margin-left:0.82rem;
  font-size:0.2rem;
}
.tu4{
  position:absolute;
  left:0.24rem;
  top:0.16rem;
  height:0.25rem;
  width:0.50rem;
}
.tu5{
  position:absolute;
  left:95%;
  height:0.56rem;
  width:5%;
  font-weight:200;
  font-size:0.3rem;
  line-height:0.56rem;
  background-color:rgba(7,17,27,0.2);
  color:rgb(255,255,255);
}
.gray-enter-active,.gray-leave-active{
  opacity:1.0;
  background:rgba(7,17,27,0.8);
}
.gray-enter,.gray-leave-to{
  opacity:0.0;
  background:rgba(7,17,27,0.0);
}
.fade-box{
  position:fixed;
  z-index:1000000;
  width:100%;
  height:100%;
  top:0;
  left:0;
  transition:1s;
  overflow:auto;
  background-color:rgba(7,17,27,0.8);
  backdrop-filter:blur(100px);
}
.fade-top{
  min-height:100%;
  width:100%;
  margin-top:1.28rem;
  margin-bottom:1.28rem;
}
.nametop{
  font-size:0.50rem;
  font-weight:800;
  width:80%;
  margin:0 auto;
  text-align:center;
  color:rgb(255,255,255);
  line-height:0.50rem;
}
.star{
height:0.48rem;
width:70%;
margin-left:7%;
margin-top:0.32rem;
}
.mainbox{
  padding-left:0.72rem;
  padding-right:0.72rem;
}
.title{
  height:1.28rem;
  width:100%;
  line-height:1.28rem;
  display:flex;
  position: relative;
  justify-content:space-around;
}
.line{
position: absolute;
width:2.24rem;
height:0.03rem;
top:50%;
left:0%;
background-color:rgba(255,255,255,0.2);
}
.line1{
position: absolute;
width:2.24rem;
height:0.03rem;
top:50%;
right:0%;
background-color:rgba(255,255,255,0.2);
}
.text{
font-size:0.35rem;
font-weight:800;
color:white;
}
.ulcor{
height:5.0rem;
padding-left:0.24rem;
padding-right:0.24rem;
}
.support-item .icon{
position:absolute;
top:-0.1rem;
left:0.0rem;
height:0.35rem;
width:0.35rem;
}
.support-item{
position: relative;
height:0.5rem;
line-height:0.5rem;
margin-top:0.44rem;
}
.support-item .text{
margin-left:0.87rem;
font-size:0.35rem;
font-weight:200;
color:white;
}
.fade-bottom{
line-height: 0.75rem;
font-size:0.35rem;
font-weight:200;
color:white;
}
.del{
  position:relative;
  width:0.68rem;
  height:0.68rem;
  text-align:center;
  line-height: 0.68rem;
  margin:-0.64rem auto 0 auto;
  clear:both;
}
.del>img{
  width:0.68rem;
  height:0.68rem;
}
</style>
