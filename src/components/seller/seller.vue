<template >
  <div ref="tong" class="seller-main">
    <div>
      <div class="title-one">
        <p class="first-p">{{seller.name}}</p>
        <p class="second-p"><xing class="xing-one"></xing><span class="wenzi-one">（{{seller.ratingCount}}）</span><span class="wenzi-two">月售{{seller.sellCount}}单</span></p>
        <div class="love-heart" @click="bian()">
          <p>
            <i class="icon iconfont icon-aixin" v-show="classmain"></i>
            <i class="icon iconfont icon-aixin" style="color:red" v-show="!classmain"></i>
          </p>
          <p >
            <span v-show="classmain">&nbsp;收藏</span>
            <span v-show="!classmain">已收藏</span>
          </p>
        </div>
      </div>
      <div class="title-two">
        <div class="box-same">
          <p>起送价</p>
          <p>{{seller.minPrice}}<span class="yuan">元</span></p>
        </div>
        <div class="box-same">
          <p>商家配送</p>
          <p>{{seller.deliveryPrice}}<span class="yuan">元</span></p>
        </div>
        <div class="box-same1">
          <p>平均配送时间</p>
          <p>{{seller.deliveryTime}}<span class="yuan">分钟</span></p>
        </div>
      </div>
      <div class="classic-title-before"></div>
      <div class="one-cup">
        <p id="only-one">公告与活动</p>
        <p class="purple-color">{{seller.bulletin}}</p>
        <p><img src="./decrease_3@2x.png"><span>在线支付满28减5，满50减10</span></p>
        <p><img src="./discount_3@2x.png"><span>单人精彩赛</span></p>
        <p><img src="./discount_3@2x.png"><span>清肺雪梨汤8折抢购</span></p>
        <p><img src="./special_3@2x.png"><span>特价饮品八折抢购</span></p>
        <p><img src="./special_3@2x.png"><span>单人精彩套餐</span></p>
        <p><img src="./invoice_1@2x.png"><span>该商家支持发票,请下单写好发票抬头</span></p>
        <p><img src="./guarantee_1@2x.png"><span>已加入“外卖保”计划,食品安全保障</span></p>
      </div>
      <div class="classic-title-before"></div>
      <div class="rel-seller">
        <p class="same-mess">商家实景</p>
       <div ref="ation">
         <div class="pic-main">
           <div class="pic-onemore">
             <img :src="seller.pics[0]" v-if="seller.pics">
             <img :src="seller.pics[1]" v-if="seller.pics">
             <img :src="seller.pics[2]" v-if="seller.pics">
             <img :src="seller.pics[3]" v-if="seller.pics">
           </div>
         </div>
       </div>
      </div>
      <div class="classic-title-before"></div>
      <div>
        <p class="same-mess">商家信息</p>
        <p v-if="seller.infos" class="left-pad">{{seller.infos[0]}}</p>
        <p v-if="seller.infos" class="left-pad">{{seller.infos[1]}}</p>
        <p v-if="seller.infos" class="left-pad">{{seller.infos[2]}}</p>
        <p v-if="seller.infos" class="left-pad">{{seller.infos[3]}}</p>
      </div>
    </div>
  </div>
</template>
<script>
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
      classmain: false
    }
  },
  created () { // 在这个时刻向后台请求数据
    this.axios.get('static/data.json')
      .then((res) => {
        // DOM未更新完成
        this.goods = res.data.goods
        this.seller = res.data.seller
        this.$nextTick(() => {
          this._initScroll()
        })
      })
  },
  methods: {
    bian () {
      this.classmain = !this.classmain
    },
    _initScroll () {
      this.rat = new BScroll(this.$refs.tong, {
        probeType: 3,
        click: true
      })
      this.rats = new BScroll(this.$refs.ation, {
        startX: 0,
        scrollX: true,
        click: true,
        eventPassthrough: 'vertical'
      })
    }
  }
}
</script>

<style scoped>
.one-cup p img{
  height:0.32rem;
  position: absolute;
  top:0.15rem;
}
.left-pad{
  width:85.4%;
  border-bottom:0.01rem solid rgba(7,17,27,0.1);;
  margin-left:0.36rem;
  height:0.24rem;
  font-size:0.24rem;
  color:rgb(7,17,27);
  padding:0.32rem 0.2rem;

}
.one-cup{
  width:90.4%;
  margin-left:0.36rem;
  padding-top:0.36rem;
}
#only-one{
  font-size:0.28rem;
  color:black;
  font-weight:700;
}
.same-mess{
  font-size:0.28rem;
  color:black;
  font-weight:700;
  margin-top:0.36rem;
  margin-left:0.36rem
}
.one-cup p:nth-of-type(2){
  font-size:0.24rem;
  color:rgb(240,20,20);
  padding:0.16rem 0.24rem 0.32rem 0.24rem;
  border-bottom:0.01rem solid rgba(7,17,27,0.1);
}
.one-cup p{
  position: relative;
  font-size:0.24rem;
  color:rgb(7,17,27);
  line-height:0.32rem;
  padding:0.16rem 0.24rem 0.32rem 0.24rem;
  border-bottom:0.01rem solid rgba(7,17,27,0.1);
}
.one-cup p span{
  margin-left:0.5rem;
}
.title-two{
  height:0.78rem;
  display:flex;
  padding:0.36rem 0;
}
.box-same{
  height:0.78rem;
  width:33.3%;
  text-align:center;
  border-right:0.01rem solid rgba(7,17,27,0.1);
}
.box-same p:nth-of-type(1){
  font-size:0.2rem;
  color:rgb(77,85,93)
}
.box-same1 p:nth-of-type(1){
  font-size:0.2rem;
  color:rgb(77,85,93)
}
.box-same p:nth-of-type(2){
  margin-top:0.08rem;
  font-size:0.48rem;
  color:black;
  font-weight:200;
}
.box-same1 p:nth-of-type(2){
  margin-top:0.08rem;
  font-size:0.48rem;
  color:black;
  font-weight:200;
}
.box-same span{
  font-size:0.2rem;
 }
.box-same1 span{
  font-size:0.2rem;
}
.box-same1{
  height:0.78rem;
  width:33.3%;
  text-align:center;
}
.love-heart{
  position: absolute;
  right:0;
  height:0.8rem;
  top:0.36rem;
  text-align:center;
}
.xing-one{
  position: absolute;
  transform:scale(0.4);
  left:-1.45rem;
  top:-0.35rem;
}
.first-p{
  font-size:0.28rem;
  color:black;
  font-weight:700;
}
.second-p{
  font-size:0.20rem;
  margin-top:0.16rem;
  color:black;
  position: relative;
}
.wenzi-one{
  margin-left:1.56rem;
}
.wenzi-two{
  margin-left:0.15rem;
}
.title-one{
  height:1.26rem;
  width:90.4%;
  position: relative;
  margin-left:0.36rem;
  padding-top:0.36rem;
  border-bottom:0.01rem solid  rgba(7,17,27,0.1);
}
.pic-main{
 width:100%;
 height:1.8rem;
 padding:0.24rem 0 0.24rem  0.36rem;
}
.pic-onemore{
  display:flex;
  width:9rem;
}
.pic-onemore img{
 width:2.4rem;
 height:1.8rem;
 display:block;
 margin-left:0.12rem;
}
.seller-main{
  position:fixed;
  top:3.48rem;
  bottom:1.16rem;
  width:100%;
  overflow:hidden;
}
.classic-title-before{
  height:0.32rem;
  width:100%;
  background-color: #f3f5f7;
  border-top:0.03rem solid rgba(7,17,27,0.1);
  border-bottom:0.03rem solid rgba(7,17,27,0.1);
}
</style>
