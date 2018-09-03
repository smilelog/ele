<template>
  <transition name="go-left">
    <div class="classic" ref="classic" v-show="false">
      <div><img src="" class="big-pic"></div>
      <div class="classic-middle">
        <p class="classic-one">好评率</p>
        <p class="classic-two">
          <span></span>
          <span class="span-two"></span>
        </p>
        <div class="classic-three">
          <div>
            <span class="three-one">￥</span>
            <span class="three-two"><del>￥</del></span>
          </div>
          <div class="three-car">加入购物车</div>
        </div>
      </div>
      <div class="classic-title-before"></div>
      <div class="classic-title">
        <p>商品介绍</p>
        <div></div>
      </div>
      <div class="classic-title-before"></div>
      <div class="classic-main">
        <p>商品评价</p>
        <div class="classic-all">
          <div>全部 57</div>
          <div>推荐 47</div>
          <div>吐槽 10</div>
        </div>
        <div class="classic-ok">
          <div>
            <i class="icon iconfont icon-gou"></i>
            <span class="ok-one">只看有内容的评价</span>
          </div>
        </div>
        <div class="classic-ratings">
          <div class="ratings-items">
            <div class="ratings-one">
              <div></div>
              <div></div>
            </div>
            <div class="ratings-two"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['foods']
}
</script>

<style scoped>

</style>
