<template>
    <div class="cartcontrol">
      <transition name="gg"><div class="decrease icon iconfont icon-jiajian1" v-show="food[i].count>0" @click="decreaseCart"></div></transition>
      <div class="cart-count" v-show="food[i].count>0">{{food[i].count}}</div>
      <div class="add icon iconfont icon-jiajian" @click="addCart"></div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['food', 'i'],
  methods: {
    addCart () { // 两种办法.可以自己用 this.$set
      // console.log(this.food[this.i])
      // console.log(this.i)
      if (!this.food[this.i].count) {
        Vue.set(this.food[this.i], 'count', 1)
      } else {
        this.food[this.i].count++
      }
      this.$emit('balls', event.target)
    },
    decreaseCart () {
      if (this.food[this.i].count) {
        this.food[this.i].count--
      }
    }
  }
}
</script>

<style scoped>
.cartcontrol{
  font-size:0;
  height:0.95rem;
  width:1.75rem;
  line-height:0.95rem;
  position:relative;
}
.icon{
  font-size:0.48rem;
}
.decrease{
  color: #00A0DC;
  height:0.5rem;
  width:0.5rem;
  position:absolute;
  right:1.0rem;
  z-index:1 ;
  transform:rotateY(180deg);
  transition:all 0.4s ;
}
.add{
  color: #00A0DC;
  height:0.5rem;
  width:0.5rem;
  position:absolute;
  right:0.0rem;
  z-index:1;
}
.gg-enter-active,.gg-leave-active{
opacity: 1;
transform:translate3d(0,0,0);
}
.gg-enter,.gog-leave-to{
  opacity: 0;
  transform:translate3d(0.5rem,0,0) rotate(180deg);
}
.cart-count{
  height:0.95rem;
  width:0.50rem;
  line-height:0.95rem;
  color:red;
  font-weight:700;
  text-align:center;
  font-size:0.2rem;
  position:absolute;
  right:0.5rem;
  z-index:0;
  transition:all 0.4s ;
}
.totalprice{
  height:0.95rem;
  width:0.50rem;
  line-height:0.95rem;
  color:red;
  text-align:center;
  font-size:0.2rem;
  position:absolute;
  right:1.75rem;
  z-index:1;
  font-weight:700;
}
</style>
