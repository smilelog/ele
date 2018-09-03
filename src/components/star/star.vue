<template>
  <div class="evaStar">
    <ul class="star">
      <li v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></li>
    </ul>
  </div>
</template>
<script>
export default{
  data () {
    return {
      score: 4
    }
  },
  computed: {
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push('on')
      }
      if (hasDecimal) {
        result.push('half')
      }
      while (result.length < 5) {
        result.push('off')
      }
      return result
    }
  }
}
</script>
<style>
  .evaStar{
    float: right;
    padding-top: .34rem;
  }
  .star{
    font-size: 0;
  }
  .star-item{
    display: inline-block;
    background-repeat: no-repeat;
    width: .6rem;
    height: .6rem;
    margin-left: .27rem;
    background-size: 100%;
  }
  .star-item.on{
    background-image: url('./star36_on@3x.png');
  }
  .star-item.half{
    background-image: url('./star36_half@3x.png');
  }
  .star-item.off{
    background-image: url('./star36_off@3x.png');
  }
</style>
