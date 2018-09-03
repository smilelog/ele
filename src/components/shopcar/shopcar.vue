<template>
  <div>
      <div class="big-bottom">
        <!--<div class="main-pic" v-show="obq"><img src="./QQ图片20180830134745.jpg" class="center-pic"></div>-->
        <div class="bottom-left"></div>
          <div class="big-circle"></div>
          <!--<div class="small-circle" :class="{'highlights':totalPrice()>0}" @click="toggleList">-->
            <!--<i class="icon iconfont icon-gouwuche" :class="{'highlight':totalPrice()>0}"></i>-->
          <!--</div>-->
          <!--<div class="num" v-show="totalCount()>0">{{totalCount()}}</div>-->
          <!--<div class="total-price" :class="{'hightlight':totalPrice()>0}">￥<span>{{totalPrice()}}</span></div>-->
          <!--<div class="send" >另需配送费￥{{deliveryPrice}}元</div>-->
          <!--<div class="bottom-right" :class="{'payfor':totalPrice()>minPrice}" @click="pay">-->
            <!--{{payDesc()}}-->
          <!--</div>-->
          <div class="small-circle"  @click="toggleList()" >
            <i class="icon iconfont icon-gouwuche" :class="{'highlights':totalPrice>0}"></i>
          </div>
            <div class="num"  v-show="totalCount>0">{{totalCount}}</div>
          <div class="total-price">￥<span class="lastone">{{totalPrice}}</span></div>
          <div class="send" >另需配送费￥{{deliveryPrice}}元</div>
          <div class="bottom-right" :class="{'payfor':totalPrice>minPrice}">
          <span v-show="totalPrice=0">￥&nbsp;{{minPrice + deliveryPrice}}元起送</span>
          <span v-show="totalPrice<minPrice">还差￥&nbsp;{{minPrice - totalPrice + deliveryPrice}}元起送</span>
          <span v-show="totalPrice>0 | totalPrice>minPrice" @click="pay" >￥ &nbsp;{{totalPrice + deliveryPrice}}去结算</span>
          </div>
        <!--滚动小球-->
        <!--<div class="ball=container">-->
            <!--<div v-for="ball in balls" :key="ball">-->
              <!--<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">-->
                <!--<div class="ball" v-show="ball.show">-->
                  <!--<div class="inner inner-hook"></div>-->
                <!--</div>-->
              <!--</transition>-->
            <!--</div>-->
        <!--</div>-->
        <div class="shortcar-list" v-show="listShow">
          <div class="header">
            <div class="title">购物车</div>
            <div class="empty" @click="empty">清空</div>
          </div>
          <div class="list-content" ref="listcontent">
            <div>
              <div v-for="(fods,index) in  good" :key="index" class="abc">
                <div v-for="(food,inde) in fods.foods" :key="inde" class="food" v-if="food.count">
                  <div class="name">{{food.name}}</div>
                  <div class="price">￥{{food.price}}</div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="fods.foods" :i="inde"></cartcontrol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <transition name="fade">
          <div class="list-mask" v-show="listShow"></div>
        </transition>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
// https://blog.csdn.net/qq_22317389/article/details/80391336
export default {
  components: {
    cartcontrol
  },
  data () {
    return {
      //   ball: [
      //     {
      //       show: false
      //     },
      //     {
      //       show: false
      //     },
      //     {
      //       show: false
      //     },
      //     {
      //       show: false
      //     },
      //     {
      //       show: false
      //     }
      //   ],
      //   dropBalls: [],
      listShow: false
    }
  },
  props: ['good', 'deliveryPrice', 'minPrice'],
  // props: {
  //   selectFoods: {
  //     type: Array,
  //     default () {
  //       return [{
  //         price: 10,
  //         count: 1
  //       }
  //       ]
  //     }
  //   },
  //   deliveryPrice: {
  //     type: Number,
  //     dafault: 0
  //   },
  //   minPrice: {
  //     type: Number,
  //     dafault: 0
  //   }
  // },
  computed: {
    totalPrice () {
      let yy = 0
      if (this.good !== '') { // 判断不为空。
        // console.log(this.good)
        for (let i = 0; i < this.good.length; i++) {
          // console.log(this.good[i])
          for (let k = 0; k < this.good[i].foods.length; k++) { // 要判断count是否
            if (this.good[i].foods[k].count) {
              yy += this.good[i].foods[k].price * this.good[i].foods[k].count
            } else {
              this.$set(this.good[i].foods[k], 'count', 0)
              yy += this.good[i].foods[k].price * this.good[i].foods[k].count
            }
          }
        }
        return yy
      } else {
        return 0
      }
    },
    totalCount () {
      let xx = 0
      for (let i = 0; i < this.good.length; i++) {
        // console.log(this.good[i])
        for (let k = 0; k < this.good[i].foods.length; k++) { // 要判断count是否
          if (this.good[i].foods[k].count) {
            xx += this.good[i].foods[k].count
          }
        }
      }
      return xx
    }
  },
  // payDesc () {
  //   let text = ' '
  //   if (this.totalCount > 0) {
  //     if (this.totalPrice() === 0) {
  //       // console.log(this.totalPrice)
  //       return text === '￥' + this.minPrice + '元起送'
  //     } else if (this.totalPrice() < this.minPrice) {
  //       let diff = this.minPrice - this.totalPrice()
  //       return text === '还差' + diff + '元起送'
  //     } else {
  //       return text === '去结算'
  //     }
  //   }
  //   return text
  // }
  // },
  //   listShow () { // https://coding.imooc.com/learn/questiondetail/72321.html这是新版 Vue.js 的报警，不要在计算属性中做赋值操作， 可以尝试用 watch 来实现类似的逻辑
  //     if (!this.totalCount) { // 因为这样是只读的，要更改，就报错了，想更改，就要用get和set方法
  //       this.fold = true
  //       return false
  //       // listShow将fold的状态传回给shoplist的v-show，通过v-show来决定购物车详情的展开或折叠，同时listShow还设置没有商品时是不可展开的（ this.fold = true）。
  //     }
  //     let show = !this.fold
  //     if (show) {
  //       this.$nextTick(() => { // 有列表有表项的时候才会有滚动，取到列表DOM，listContent
  //         if (!this.scroll) {
  //           this.scroll = new BScroll(this.$refs.listContent, {
  //             click: true
  //           })
  //         } else {
  //           this.scroll.refresh()
  //         }
  //       })
  //     }
  //     return show
  //   }
  // },
  // created () {
  //   setTimeout(() => {
  //     this._initScroll()
  //   }, 200)
  // },
  methods: {
    //   // drop (el) {
    //   //   for (let i = 0; i < this.balls.length; i++) {
    //   //     let ball = this.balls[i]
    //   //     if (!ball.show) {
    //   //       balls.show = true
    //   //       balls.el = el
    //   //     }
    //   //   }
    //   // },
    // totalPrice () {
    //   let yy = 0
    //   console.log(yy)
    //   if (this.good !== '') { // 判断不为空。
    //     // console.log(this.good)
    //     for (let i = 0; i < this.good.length; i++) {
    //       // console.log(this.good[i])
    //       for (let k = 0; k < this.good[i].foods.length; k++) { // 要判断count是否
    //         if (this.good[i].foods[k].count) {
    //           yy += this.good[i].foods[k].price * this.good[i].foods[k].count
    //         } else {
    //           this.$set(this.good[i].foods[k], 'count', 0)
    //           yy += this.good[i].foods[k].price * this.good[i].foods[k].count
    //         }
    //       }
    //     }
    //     return yy
    //   } else {
    //     return 0
    //   }
    // },
    // totalCount () {
    //   let xx = 0
    //   for (let i = 0; i < this.good.length; i++) {
    //     // console.log(this.good[i])
    //     for (let k = 0; k < this.good[i].foods.length; k++) { // 要判断count是否
    //       if (this.good[i].foods[k].count) {
    //         xx += this.good[i].foods[k].count
    //       }
    //     }
    //   }
    //   return xx
    // },
    _initScroll () {
      // 在methods属性里面定义一个better-scroll的实例初始化函数；在created()函数里面用vm.$nextTick()中初始化这个实例
      // 初始化需要滚动的对象,通过vm.$refs可以获取到在<template>中设置ref=goodlwrapper属性的元素节点
      if (!this.leScroll) { // 这一步是为了实时更新购物车里的数据，这样子不会出现购物车栏目里点击加减数量不对
        this.leScroll = new BScroll(this.$refs.listcontent, {
          probeType: 3,
          click: true
        })
      } else {
        this.leScroll.refresh()
      }
    },
    toggleList () {
      // if (!this.totalCount) {
      //   return
      //   // 购物车没有商品的时候不可点击
      // }
      setTimeout(() => {
        this._initScroll()
      }, 200)
      this.listShow = !this.listShow
      // 当前是收起状态就展开，展开状态就收起
    },
    //   pay () {
    //     if (this.totalPrice < this.minPrice) {
    //       return
    //     }
    //     window.alert('￥支付{this.totalPrice}元')
    //   },
    // hideList () {
    //   this.fold = true // 点击mark层，购物车详情列表被收回
    // }
    empty () {
      this.toggleList()
      for (let i = 0; i < this.good.length; i++) {
        // console.log(this.good[i])
        for (let k = 0; k < this.good[i].foods.length; k++) {
          if (this.good[i].foods[k].count) {
            this.$delete(this.good[i].foods[k], 'count')
          }
        }
      }
    },
    pay () {
      alert('购买成功')
    }
  }
}
</script>
<style scoped>
.fade-enter-active,.fade-leave-active{
  transform: translate3d(0,0,0);
}
.fade-enter-leave,.fade-leave-active{
  transform: translate3d(0,-1000%,0) ;
}
.center-pic{
  position: absolute;
  transform: translate3d(-50%,-50%,0);
  left:50%;
  top:50%;
  width: 50%;
  height:50%;
}
.main-pic{
  position: absolute;
  z-index:10000;
  background-color: red;
  width: 100%;
  height:100vh;
  top:-91vh;
}
.lastone{
  color:red;
  font-weight: 700;
  margin-left:0.1rem;
}
.shortcar-list{
  width:100%;
  height:5rem;
  background-color:#fff;
  position:absolute;
  top:-5rem;
  transition:1s;
  z-index:-1;
}
.header{
  height:0.8rem;
  width:100%;
  display:flex;
  justify-content: space-between;
  background-color:#f3f5f7;
  border-bottom:0.03rem solid rgba(7,17,27,0.1)
}
.title,.empty{
  height:0.8rem;
  line-height:0.8rem;
  width:15%;
}
.food{
  position:relative;
  height:0.96rem;
  width:90%;
  padding:0 5% 0 5%;
  border-bottom:0.01rem solid rgba(7,17,27,0.1);
}
.name{
  height:0.96rem;
  line-height:0.96rem;
  text-align:left;
  width:50%;
  font-size:0.28rem;
  color:rgb(7,17,27);
}
.price{
  position: absolute;
  right:2rem;
  height:0.96rem;
  line-height:0.96rem;
  text-align:center;
  width:1rem;
  font-weight:700;
  top:0rem;
  font-size:0.48rem;
  color:rgb(240,20,20);
}
.cartcontrol-wrapper{
  position:absolute;
  right:0.26rem;
  top:0.05rem;
}
.empty{
  text-align:right;
  margin-right:0.36rem;
  font-size:0.24rem;
  color:rgb(0,160,220);
  cursor:pointer;
  width:10%;
}
.list-content{
  width:100%;
  background-color:#fff;
  height:4rem;
  overflow: hidden;
}

.title{
  text-align:left;
  margin-left:0.36rem;
  font-size:0.28rem;
  font-weight:200;
  color:rgb(7,17,27);
}
.list-mask{
  width:100%;
  height:100vh;
  top:-1100%;
  background-color:rgba(7,17,27,0.6);
  filter:blur(10px);
  position:absolute;
  transition:1s;
  z-index:-2;
}
.icon{
  font-size:0.6rem;
  color:gray;
}
.highlights{
  color:#00A0DC;
  transition:0.1s;
}
.highlight{
  background-color:white;
  transition:0.1s;
}
.payfor{
  background-color:forestgreen !important;
  color:white !important;
}
.big-bottom{
  position:absolute;
  width:100%;
  display:flex;
  z-index:200;
  height:1.16rem;
}
.bottom-left{
  width:72%;
  position:relative;
  height:1.16rem;
  background-color: #141d27;
}
.bottom-right{
  width:28%;
  background-color:#2B333B;
  font-size:0.24rem;
  height:1.16rem;
  color:#979A9C;
  line-height:1.16rem;
  font-weight:700;
  text-align:center;
}
.big-circle{
  height:1.36rem;
  width:1.36rem;
  border-radius:50%;
  position:absolute;
  background-color:#141d27;
  left:0.24rem;
  top:-0.2rem;
}
.small-circle{
  height:1.12rem;
  width:1.12rem;
  border-radius:50%;
  position:absolute;
  background-color:#2B343C;
  left:0.36rem;
  top:-0.08rem;
  line-height:1.12rem;
  text-align:center;
}
.total-price{
  width:1.44rem;
  height:0.70rem;
  top:0.24rem;
  color:#979A9C;
  position: absolute;
  left:1.2rem;
  font-weight:700;
  text-align:center;
  font-size:0.30rem;
  line-height: 0.70rem;
  border-right:0.02rem  solid #283039;
}
.send{
  width:1.95rem;
  height:0.70rem;
  top:0.24rem;
  color:#979A9C;
  position: absolute;
  left:40%;
  text-align:center;
  line-height: 0.70rem;
}
.num{
  position: absolute;
  left:0.88rem;
  top:-0.12rem;
  background-color: red;
  text-align:center;
  height:0.32rem;
  width:0.48rem;
  border-radius:0.1rem;
  font-size:0.18rem;
  font-weight:700;
  color:white;
  line-height:0.32rem;
  box-shadow:0 0.04rem 0.08rem 0 rgba(0,0,0,0.4);
}
</style>
