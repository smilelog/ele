<template>
  <div >
    <v-head :seller="seller"></v-head>
    <div class="hand">
        <div class="hand-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="hand-item">
          <router-link to="/ratings">评价</router-link>
        </div>
        <div class="hand-item">
          <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <router-view :seller="seller" :goods="goods"></router-view><!--记得先传参/-->
    <shopcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"  :good="goods" class="boxmain"></shopcar>
  </div>
</template>
<script>
import vHead from './components/header/header.vue'
import shopcar from './components/shopcar/shopcar.vue'
export default {
  name: 'App',
  data () {
    return {
      seller: '',
      goods: ''
    }
  },
  components: {
    vHead,
    shopcar
  },
  created () {
    console.log(1234)
    this.axios.get('static/data.json')
      .then((res) => {
        this.seller = res.data.seller
        this.goods = res.data.goods
      })
  }
}
</script>
<style>
.boxmain{
  width: 100%;
  position:absolute;
  height:1.16rem;
  bottom:0;
}
.hand{
  width:100%;
  height:0.8rem;
  display:flex;
  justify-content:space-around;
  border:0.01rem solid rgba(7,17,27,0.1)
}
.hand-item{
  flex:1;
  text-align:center;
  height:0.8rem;
  font-size:0.28rem;
  color:rgb(77,85,93);
  line-height: 0.8rem;
}
a:hover{
  color:red;
  text-decoration: none;
}
</style>
