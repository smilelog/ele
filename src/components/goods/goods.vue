<template >
  <div>
     <div class="goods" >
       <div class="goods-l" ref="goodlwrapper">
         <ul>
           <!--https://blog.csdn.net/qq_36457584/article/details/80856158-->
           <!--https://blog.csdn.net/tangxiujiang/article/details/80175231-->
           <!--currentIndex()在computed里面定义，当计算出来的索引等于index的时候就显示高亮的样式.current-->
           <li class="goods-name" v-for="(items,index) in goods"  :key="index" @click="selectMenu(index,$event)" :class="{'current': currentIndex === index}" >
             <!--selectMenu(index,$event)实现点击左边的menu，右边滚动到相应的区间，index就是区间索引，$event属性表示原生DOM事件-->
             <span class="text-name">
              <!--<img :src="'./'+'classMap[items.type]'+'_4@2x.png'"  v-show="items.type>0" class="theonly">-->
               <span  v-show="items.type>1" class="theonly"><img src="./special_4@2x.png"></span>
               {{items.name}}</span>
           </li>
         </ul>
       </div>
       <div class="goods-r"  ref="goodrwrapper">
         <ul>
           <li class="food-list food-list-hook" v-for="(item,inde) in goods" :key="inde">
             <section><span class="top-name" >{{item.name}}</span></section>
             <ul>
               <li class="food-item" v-for="(food,sindex) in item.foods" :key="sindex" >
                     <div ><img :src="food.icon" class="pic-left" @click="selectFoods(inde,sindex)"></div>
                     <div class="pic-right">
                       <p>{{food.name}}</p>
                       <p>{{food.description}}</p>
                       <p>月售{{food.sellCount}}份<span class="greats">好评率{{food.rating}}%</span></p>
                       <p><span class="money">￥{{food.price}}</span><span v-show="food.oldPrice" class="oldmoney"><del>￥{{food.oldPrice}}</del></span></p>
                     </div>
                     <div class="cartControl-wrapper">
                       <cartcontrol :food="item.foods" :i="sindex"></cartcontrol>
                     </div>
               </li>
             </ul>
           </li>
         </ul>
       </div>
    </div>
    <transition name="go-left">
      <div class="classic" ref="classic" v-show="showout&&goods" >
        <div>
        <div v-for="(items,index) in goods" :key="index">
        <div v-for="(food,inde) in items.foods" :key="inde" v-show="food.select">
          <div class="big-pic">
          <img src="./删除.png"   @click="delthing(index,inde)" class="most">
          <img  class="big-pic"  :src="food.image" v-show="food.select">
        </div>
        <div class="classic-middle">
          <p class="classic-one">{{food.name}}</p>
          <p class="classic-two">
            <span>月售{{food.sellCount}}</span>
            <span class="span-two">好评率{{food.rating}}</span>
          </p>
          <div class="classic-three">
            <div>
              <span class="three-one">￥{{food.price}}</span>
              <span class="three-two" v-show="food.oldPrice"><del>￥{{food.oldPrice}}</del></span>
            </div>
            <div class="three-car">加入购物车</div>
          </div>
        </div>
        <div class="classic-title-before"></div>
        <div class="classic-title">
          <p>商品介绍</p>
          <div>{{food.info}}</div>
        </div>
        <div class="classic-title-before"></div>
        <div class="classic-main">
          <p class="main-one">商品评价</p>
          <div class="classic-all">
            <div class="classic-box">
            <div class="all-one">全部 24</div>
            <div class="all-two">推荐 18</div>
            <div class="all-three">吐槽 6</div>
            </div>
          </div>
          <div class="classic-ok">
            <div>
              <span class="ok-left"><i class="icon iconfont icon-gou"></i></span>
              <span class="ok-one">只看有内容的评价</span>
            </div>
          </div>
          <div class="classic-ratings"  v-for="(one,inse) in food.ratings" :key="inse">
            <div class="ratings-items">
              <div class="ratings-one">
                <div>{{one.rateTime | forDate}}</div>
                <div>{{one.username}} <img :src="one.avatar" class="small-image"></div>
              </div>
              <div class="ratings-two">
                <span><i class="icon iconfont icon-bad" v-show="!one.text"></i></span>
                <span> <i class="icon iconfont icon-good" style="color:deepskyblue;" v-show="one.text"></i></span>
                <span>{{one.text}}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    </transition>
  </div>
</template>
<script   >
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
export default {
  components: {
    cartcontrol
    // shopcar
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
  props: ['goods', 'seller'],
  data () {
    return {
      // goods: [], // 用来接收从后台返回的数据
      // seller: [],
      listHeight: [], // 存放右边每一个li的高度
      scrollY: 0, // 实时滚动的y轴大小，利用better-scroll的onScroll事件监听这个值
      showout: false
    }
  },
  created () { // 在这个时刻向后台请求数据
    console.log(this.goods)// 为什么不出来先不出来.因为app先执行。在goods执行。app在思考需要时间。但并不妨碍。goods出现.app传数据需要时间
    this.axios.get('static/data.json')
      .then((res) => {
        // DOM未更新完成
        // this.goods = res.data.goods
        // this.seller = res.data.seller
        this.$nextTick(() => { // better-scroll的实例初始化要放在vm.$nextTick()里面才生效
          // DOM已经更新完成.应用数据变dom.时间才有用
          // 实例化better-scroll
          // console.log(this.$refs.classic.offsetHeight)
          this._initScroll()
          // 计算右边.foods-wrapper的每个li的累加的高度，存放在listHeight中
          this._calculateHeight()
        })
      })
  },
  computed: {
    currentIndex () {
      // 利用vue中的计算属性computed实时计算，对listHeight遍历，返回当前的左边mune-wrapper的li
      // 对应的index，从而让其显示高亮的属性.current
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 当遍历到listHeight最后一个元素的时候，height2的值为undefined,如果是
        // 最后一个元素的话!height2为真，后面就不需要判断了
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // this.currentIndex = i
          // console.log(i)
          return i
        }
      }
      // 默认情况下是返回第一个元素
      return 0
    }
  },
  methods: {
    delthing (index, inde) { // 作用地域链。要搞清楚  delthing和selectFoods作用地域链不同。记得要用参数就要传参
      this.showout = false
      this.goods[index].foods[inde].select = false
      // console.log(inde)
      // console.log(index)
    },
    selectFoods (inde, sindex) { // vue forEach循环数组拿到自己想要的数据 https://blog.csdn.net/qq_36947128/article/details/79078611
      this.showout = true
      if (!this.goods[inde].foods[sindex].select) { // 节点大概传播不下来.用两次索引
        Vue.set(this.goods[inde].foods[sindex], 'select', true)
      }
      setTimeout(() => {
        this._initScroll()
      }, 200)
    },
    selectMenu (index, event) { // 点击左边的menu，跳到右边相应的li
      let foodList = this.$refs.goodrwrapper.getElementsByClassName('food-list-hook')// 获取到右边li对象
      let el = foodList[index] // 根据index，获取到右边具体滚动到的
      this.foodsScroll.scrollToElement(el, 300) // 要滑动到右边的对象，300完成动作的时间
      // this.currentIndex = index
    },
    _initScroll () {
      // 在methods属性里面定义一个better-scroll的实例初始化函数；在created()函数里面用vm.$nextTick()中初始化这个实例
      // 初始化需要滚动的对象,通过vm.$refs可以获取到在<template>中设置ref=goodlwrapper属性的元素节点
      this.leftScroll = new BScroll(this.$refs.goodlwrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.goodrwrapper, {
        // 最好不用驼峰
        probeType: 3,
        click: true
      })
      this.classicScroll = new BScroll(this.$refs.classic, {
        probeType: 3,
        click: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () { // 将右侧的.foods-wrapper里面的每个li的高度进行累加，存放到数组listHeight里面
      let foodList = this.$refs.goodrwrapper.getElementsByClassName('food-list-hook')// 获取到所有的ref='foodList'的DOM元素
      let height = 0
      this.listHeight.push(height) // 第一个元素的高度是0
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight // 通过原生DOM中的js获取到li的高度，并且累加
        this.listHeight.push(height)
      }
    }
  }
}
</script>
<style >
  /*<!--详情页-->*/
.go-left-active,.go-left-leave-active{
  transition:all 0.2s linear;
  opacity:1.0;
  transform:translate3d(-100%,0,0);
}
.go-left-enter,.go-left-leave-active{
  opacity:0;
  transform:translate3d(100%,0,0);
}
.small-image{
  height:0.24rem;
  width:0.24rem;
  border-radius:50%;
}
.most{
  height:0.5rem;
  width:0.5rem;
  left:0.2rem;
  top:0.2rem;
  position:absolute;
  z-index:10000;
}
.classic-ratings{
  width:90.4%;
  padding:0 0.36rem;
}
.ratings-items{
  height:0.56rem;
  width:100%;
  padding:0.32rem 0;
}
.ratings-one{
 font-size:0.23rem;
 color:rgb(147,153,159);
 display:flex;
 justify-content: space-between;
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
.classic-one div{
  margin-left:0.06rem;
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
.ratings-two{
  font-size:0.25rem;
  color:rgb(7,17,27);
  margin-top:0.12rem;
}
.classic-title-before{
  height:0.32rem;
  width:100%;
  background-color: #f3f5f7;
  border-top:0.03rem solid rgba(7,17,27,0.1);
  border-bottom:0.03rem solid rgba(7,17,27,0.1);
}
.classic-title{
    width:90.4%;
    padding:0.36rem 0.36rem;
}
.classic-title>p{
  font-size:0.28rem;
  font-weight:600;
  color:black;
  text-align:left;
}
.classic-title>div{
  font-size:0.24rem;
  font-weight:200;
  color:rgb(77,85,93);
  margin-top:0.3rem;
}
.classic{
  top:0;
  bottom:0;
  width:100%;
  position:absolute;
  z-index:100;
  overflow:hidden;
  background-color: #fff;
}
.big-pic{
  height:7.5rem;
  width:100%;
}
.classic-middle{
  height:2rem;
  width:90.4%;
  padding:0.36rem 0.36rem;
}
.classic-one{
  font-size:0.28rem;
  font-weight:700;
  color:rgb(7,17,27)
}
.classic-two{
  font-size:0.20rem;
  margin-top:0.16rem;
  color:rgb(147,153,159)
}
.span-two{
  margin-left:0.24rem;
}
.classic-three{
  margin-top:0.36rem;
  height:0.5rem;
  display:flex;
  line-height:0.5rem;
  justify-content: space-between;
}
.three-one{
  font-size:0.25rem;
  font-weight:normal;
  color:rgb(240,20,20);
}
.three-two{
  font-size:0.20rem;
  font-weight:normal;
  color:rgb(147,153,159);
}
.three-car{
  height:0.5rem;
  width:1.48rem;
  border-radius: 0.24rem;
  line-height:0.5rem;
  text-align:center;
  font-size:0.20rem;
  color:rgb(255,255,255);
  background-color:rgb(0,160,220);
}
/*<!--详情页-->*/
.goods{
  position:fixed;
  display:flex;
  top:3.48rem;
  width:100%;
  bottom:1.16rem;
  overflow:hidden;
}
.goods-l{
  width:1.6rem;
  line-height:0.28rem;
  background-color:#f3f5f7;
}
.goods-name{
  display:table;
  padding:0 0.24rem;
  line-height:0.28rem;
  width:1.12rem;
  height:1.08rem;
  font-size:0.24rem;
}
.text-name{
  display:table-cell;
  vertical-align:middle;
  color:black;
  width:1.12rem;
  font-weight:200;
  border-bottom:0.03rem solid rgba(7,17,27,0.1);
  background-color: #f3f5f7;
}
.theonly img{

  height:0.24rem;
  width:0.24rem;
}
.current{
  background-color:white;
  position: relative;
  font-weight:800;
  margin-top:-0.01rem;
}
.goods-r{
  width:100%;
}
.food-list{
  width:100%;
}
.food-list section{
  height:0.54rem;
  width:100%;
  font-size:0.30rem;
  line-height:0.54rem;
  border-left:0.03rem solid #d9dde1;
  background-color:#F3F5F7;
}
.food-item{
  height:2.52rem;
  margin-bottom:0.36rem;
  top:0.36rem;
  position: relative;
  border-bottom:0.02rem solid rgba(7,17,27,0.1);
}
.cartControl-wrapper{
   position:absolute;
   right:0.36rem;
   top:0.8rem;
 }
.top-name{
  margin-left:0.36rem;
}
.food-item div{float:left}
.pic-left{
  height:1rem;
  width:1rem;
  margin-left:0.36rem;
}
.pic-right{
  width:70%;
  margin-left:0.20rem;
}
.pic-right p:nth-of-type(1){
  font-size:0.3rem;
  color:black;
  margin-top:0.04rem;
}
.pic-right p:nth-of-type(2){
  font-size:0.2rem;
  color:gray;
  margin-top:0.16rem;
}
.money{
  color:red;
  font-weight:800;
}
.oldmoney{
   color:gray;
   font-weight:800;
  margin-left:0.16rem;
 }
.pic-right p:nth-of-type(3){
  font-size:0.2rem;
  color:gray;
  margin-top:0.16rem;
}
.pic-right p:nth-of-type(4){
  font-size:0.2rem;
  color:gray;
  margin-top:0.16rem;
}
.greats{
  margin-left:0.24rem;
}
</style>
