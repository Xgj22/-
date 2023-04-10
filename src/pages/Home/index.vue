<template>
  <div>
    <!-- 三级联动全局组件，因此无需再引入 -->
    <TypeNav :show="show"></TypeNav>
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="f1 in photoList" :key="f1.id" :list="f1" />
    
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
  import Brand from './Brand'
  import Floor from './Floor'
  import Like from './Like'
  import ListContainer from './ListContainer'
  import Rank from './Rank'
  import TodayRecommend from './TodayRecommend'
  import { mapState } from 'vuex'
export default {
  data() {
    return {
      show:true
    }
  },
  mounted(){
    this.$store.dispatch('getPhotoList')
    // this.$store.dispatch('getUserInfo')
  },
  components:{
    ListContainer,Brand,Floor,Like,Rank,TodayRecommend
  },
  computed:{
    ...mapState({
      photoList:(state)=>state.home.photoList
    })
  }
}
</script>

<style>

</style>