<template >
  <div class="rating-all"  ref="ratings">
    <!--里面满足一个div 就行-->
    <div>
    <div>
    <div class="rating-main">
    <div class="top-title">
    <div class="score-left">
      <div class="score">{{seller.score}}</div>
      <div>综合评分</div>
      <div>高于周边商家{{seller.rankRate}}</div>
    </div>
    <div class="score-right">
      <div>服务态度 <xing class="xing-one"></xing> <span>{{seller.foodScore}}</span></div>
      <div>服务态度 <xing class="xing-one1"></xing> <span>{{seller.serviceScore}}</span></div>
      <div>送达时间 <span id="score-right-color">{{seller.deliveryTime}}分钟</span></div>
    </div>
    </div>
    <div class="classic-title-before"></div>
      <div class="classic-main">
      <p class="main-one">商品评价</p>
      <div class="classic-all">
        <div class="classic-box">
          <div class="all-one" @click="coose()">全部 24</div>
          <div class="all-two" @click="xlose()">推荐 18</div>
          <div class="all-three" @click="zlose()">吐槽 6</div>
        </div>
      </div>
      <div class="classic-ok">
        <div>
          <span class="ok-left" @click="allcome()">
            <span><i class="icon iconfont icon-gou" v-show="!aain"></i></span>
              <span><i class="icon iconfont icon-gou" style="color:lawngreen" v-show="aain"></i></span>
          </span>
          <span class="ok-one" >只看有内容的评价</span>
        </div>
      </div>
      <div class="classic-ratings" v-for="(one,inse) in rating" :key="inse" v-show="one.nicefood">
              <div class="ratings-one">
                <div><img :src="one.avatar" class="one-pic"></div>
                <div class="one-two">
                  <p>{{one.username}}</p>
                  <p class="send-to"><xing class="xing-two"></xing>{{one.deliveryTime}}送达</p>
                </div>
                <div class="timer">{{one.rateTime | forDate}}</div>
              </div>
              <div class="ratings-two">
                <span>{{one.text}}</span>
                <div class="icon-go">
              <i class="icon iconfont icon-bad" v-show="one.score<=3" style="color:gray"></i>
              <i class="icon iconfont icon-good" style="color:deepskyblue;" v-show="one.score>3"></i>
              <div class="car-info"><div class="car-rec" v-for="(kk,icess) in one.recommend" :key="icess">{{kk}}</div></div>
            </div>
          </div>
      </div>
    </div>
  </div>
    </div>
  </div>
  </div>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import xing from '../star/star.vue'
export default {
  components: {
    xing
  },
  data () {
    return {
      goods: [],
      seller: [],
      rating: [],
      aain: false
    }
  },
  filters: {
    forDate (val) { // 自动把标准时间转发
      var value = new Date(val)
      var year = value.getFullYear()
      var month = value.getMonth() + 1
      var day = value.getDate()
      var hour = value.getHours()
      var minutes = value.getMinutes()
      var seconds = value.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    }
  },
  created () { // 在这个时刻向后台请求数据
    this.axios.get('static/data.json')
      .then((res) => {
        // DOM未更新完成
        this.goods = res.data.goods
        this.seller = res.data.seller
        this.rating = res.data.ratings
        this.$nextTick(() => {
          this._initScroll()
        })
      })
    setTimeout(() => {
      for (let i = 0; i < this.rating.length; i++) {
        if (!this.rating[i].nicefood) {
          Vue.set(this.rating[i], 'nicefood', true)
        }
      }
      //  可以在app页面吧数据绑定
    }, 200)
  },
  methods: {
    coose () {
      for (let i = 0; i < this.rating.length; i++) {
        this.rating[i].nicefood = true
      }
      this.success = 0
      if (this.aain) {
        this.aain = !this.aain
        for (let i = 0; i < this.rating.length; i++) {
          if (this.rating[i].text) {
            this.rating[i].nicefood = true
          } else {
            this.rating[i].nicefood = false
          }
        }
      }
    },
    xlose () {
      for (let i = 0; i < this.rating.length; i++) {
        if (this.rating[i].rateType === 0) {
          this.rating[i].nicefood = true
        } else {
          this.rating[i].nicefood = false
        }
      }
      this.success = 1
      if (this.aain) {
        this.aain = !this.aain
        for (let i = 0; i < this.rating.length; i++) {
          if (this.rating[i].text) {
            this.rating[i].nicefood = true
          } else {
            this.rating[i].nicefood = false
          }
        }
      }
    },
    zlose () {
      for (let i = 0; i < this.rating.length; i++) {
        if (this.rating[i].rateType === 1) {
          this.rating[i].nicefood = true
        } else {
          this.rating[i].nicefood = false
        }
      }
      this.success = 2
      if (this.aain) {
        this.aain = !this.aain
        for (let i = 0; i < this.rating.length; i++) {
          if (this.rating[i].text) {
            this.rating[i].nicefood = true
          } else {
            this.rating[i].nicefood = false
          }
        }
      }
    },
    allcome () {
      this.aain = !this.aain
      for (let i = 0; i < this.rating.length; i++) {
        if (this.rating[i].text) {
          this.rating[i].nicefood = true
        } else {
          this.rating[i].nicefood = false
        }
      }
      if (this.success === 0) {
        this.coose()
        this.aain = !this.aain
      }
      if (this.success === 1) {
        this.xlose()
        this.aain = !this.aain
      }
      if (this.success === 2) {
        this.zlose()
        // alert(2)
        this.aain = !this.aain
      }
    },
    _initScroll () {
      this.rat = new BScroll(this.$refs.ratings, {
        probeType: 3,
        click: true
      })
    }
  }
}
</script>
<style scoped>
.icon-go{
 margin-top:0.16rem;
}
.car-info{
  margin-left:0.3rem;
  margin-top:-0.4rem;
}
.car-rec{
  display:inline-block;
  width:1rem;
  margin-left:0.16rem;
  background-color:#fff;
  border:0.01rem solid rgba(7,17,27,0.1);
  height:0.32rem;
  font-size:0.18rem;
  line-height: 0.32rem;
  text-align:center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.one-two{
 margin-left: 0.24rem;
}
.send-to{
  width:2rem;
  height:0.3rem;
  margin-top:-0.1rem;
  font-size:0.2rem;
  margin-left:1.7rem;
  position: relative;
}
.timer{
  font-size:0.2rem;
  font-weight:200;
  width:3.5rem;
  text-align:right;
  color:rgb(147,153,159)
}
.xing-two{
  transform:scale(0.4);
  position:absolute;
  left:-3.15rem;
  top:-0.35rem;
}
.one-pic{
 height:0.56rem;
 width:0.56rem;
 border-radius:50%;
}
.rating-all{
  position:fixed;
  top:3.48rem;
  bottom:1.16rem;
  width:100%;
  overflow:hidden;
}
.top-title{
  width:100%;
  height:2.42rem;
  display:flex;
  background-color: #fff;
}
.score-left{
  width:2.75rem;
  height:1.5rem;
  margin-top:0.36rem;
  text-align:center;
  border-right:0.01rem solid rgb(147,157,159)
}
.score-left div:nth-of-type(1){
  font-size:0.4rem;
  color:rgb(255,153,0)
}
.score-left div:nth-of-type(2){
  font-size:0.24rem;
  color:rgb(7,17,27);
  margin-top:0.06rem;
}
.score-left div:nth-of-type(3){
  font-size:0.24rem;
  margin-top:0.1rem;
  color:rgb(147,153,159)
}
.score-right{
   width:4.74rem;
   height:1.5rem;
   position: relative;
   padding:0.36rem 0.48rem;
   border-right:rgb(7,17,27)
 }
.score-right div{
  font-size:0.24rem;
  color:rgb(7,17,27);
}
#score-right-color{
  color:rgb(147,153,159);
  margin-left:0.24rem;
}
.score-right div span{
  font-size:0.24rem;
  color:rgb(255,253,0);
  margin-left:2.64rem;
}
.score-right div:nth-of-type(2){
  margin-top:0.16rem;
}
.score-right div:nth-of-type(3){
  margin-top:0.16rem;
}
.xing-one{
   transform:scale(0.6);
   position: absolute;
   top:0rem;
}
.xing-one1{
  transform:scale(0.6);
  position: absolute;
  top:0.5rem;
}
.classic-title-before{
  height:0.32rem;
  width:100%;
  background-color: #f3f5f7;
  border-top:0.03rem solid rgba(7,17,27,0.1);
  border-bottom:0.03rem solid rgba(7,17,27,0.1);
}
.main-one{
  font-size:0.28rem;
  color:black;
  font-weight:700;
  height:0.28rem;
  left:0.36rem;
  margin-top:0.36rem;
  margin-left:0.36rem;
  padding-bottom:0.24rem;
}
.classic-all{
  height:0.75rem;
  width:90.4%;
  margin-left:0.36rem;
  margin-right:0.36rem;
  border-bottom:0.02rem solid rgba(7,17,27,0.1);
}
.classic-box{
  width:4.0rem;
  height:0.5rem;
  display:flex;
  justify-content: space-between;
}
.all-one{
  line-height:0.5rem;
  color:white;
  height:0.5rem;
  width:1.3rem;
  font-size:0.25rem;
  text-align:center;
  border-radius: 0.02rem;
  background-color:rgb(0,160,220);
}
.all-two{
  line-height:0.5rem;
  color:rgb(77,85,93);
  height:0.5rem;
  width:1.3rem;
  text-align:center;
  font-size:0.25rem;
  border-radius: 0.02rem;
  background-color:rgba(0,160,220,0.2);
}
.all-three{
  line-height:0.5rem;
  color:rgb(77,85,93);
  height:0.5rem;
  width:1.3rem;
  text-align:center;
  font-size:0.25rem;
  border-radius: 0.02rem;
  background-color:rgba(77,85,93,0.2);
}
.classic-ok{
  border-bottom:0.03rem solid rgba(7,17,27,0.1);
  height:0.8rem;
  line-height:0.8rem;
  font-size:0.24rem;
  color:rgb(147,153,159);
}
.ok-left{
  font-size:0.3rem;
  margin-left:0.36rem;
}
.classic-ratings{
  width:90.4%;
  padding:0.36rem;
}
.ratings-one{
  font-size:0.23rem;
  color:rgb(147,153,159);
  display:flex;
  justify-content: space-between;
}
.ratings-two{
  font-size:0.25rem;
  color:rgb(7,17,27);
  margin-top:0.12rem;
  padding:0.12rem 0.0rem 0.16rem 0.76rem;
}
</style>
