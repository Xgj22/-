<template>
    <div class="swiper-container"  ref="mySwiper">
        <div class="swiper-wrapper">
        <div class="swiper-slide" 
        v-for="b1 in carouselList" 
        :key="b1.id">
            <img :src="b1.imgUrl" />
        </div>
        
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev swiper-button-black"></div>
        <div class="swiper-button-next swiper-button-white" ></div>
    </div>
    
    
</template>

<script>
import Swiper from 'swiper';
export default {
    name:'Carousel',
    props:['carouselList'],
    watch:{
      carouselList:{
        immediate:true,
        handler(newValue,oldValue){
          this.$nextTick(()=>{
            // 异步问题。没人能保证mounted的时候 请求结果已经得到了
              let mySwiper = new Swiper (this.$refs.mySwiper, {
              // direction: 'vertical', // 垂直切换选项
              loop: true, // 循环模式选项
              
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
              
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              
              // 如果需要滚动条
              scrollbar: {
                el: '.swiper-scrollbar',
              },
            })
            
          })
        }
      }
    }
}
</script>

<style>

</style>