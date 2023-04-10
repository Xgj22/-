<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveIndex" @mouseenter="entershow">
      <h2 class="all" >全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="showlist" >
        <div class="all-sort-list2" 
        v-for="(c1,index) in categoryList.slice(0,15)" 
        :key="c1.categoryId" 
        >     
        <!-- 当这两个index相等时，就会拥有cur 这个class名 -->
          <div class="item bo" 
          @click="goSearch"
          >
          <!-- 使用声明式导航很费内存 鼠标滑过需要渲染很多组件 因此采用编程式导航 -->
            <h3 @mouseenter="changeIndex(index)"
                :class="{cur:currentIndex==index}" 
            >
              <!-- <router-link to="/search"></router-link> -->
              <!-- a设置点击事件的同时要将href属性去掉 -->
              <!-- html允许自定义属性 以data-开头即为自定义属性 -->
              <!-- 用某一属性来筛选元素 如categoryId-->
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix" 
            v-for="c2 in c1.categoryChild" 
            :key="c2.categoryId"
            :style="{display:currentIndex==index?'block':'none'}"
            >
              <div class="subitem">
                <dl class="fore">
                  <dt>
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
   
    import { mapState } from "vuex";
    import throttle from '/Vue_xgj/project_sph/node_modules/lodash/throttle'
    // 节流和防抖效果找lodash插件
    export default {
        name: "TypeNav",
        data() {
          return {
            currentIndex:-1,
            showlist:true
          }
        },
        props:['show'],
        methods:{
          //防抖效果，使用loadsh中的throttle.js 限制在50ms内只能发送一次，给予后台足够时间渲染代码，不会出现卡顿现象
          changeIndex:throttle(function(index){
            this.currentIndex = index
          },50),
          leaveIndex(){
            this.currentIndex = -1
            if(this.$route.path !='/home'){
              this.showlist = false
            }
          },
          goSearch(event){
            // 通过事件获取元素
            let element = event.target
            let {categoryname,category1id,category2id,category3id} = element.dataset
            if(categoryname){
              var location = {
                name:'search',
                query:{
                  categoryName:categoryname
                }
              }
              // 上面这种写法无法传递categoryName参数
              // if(category1id){
              //   location.query = {category1id : category1id}
                
              // }else if(category2id){
              //   location.query = {category2id : category2id}
              // }else{
              //   location.query = {category3id : category3id}
              // }
              //一级分类的a
              if (category1id) {
                location.query.category1Id = category1id;
                
              } else if (category2id) {
                //二级分类的a
                location.query.category2Id = category2id;
              } else {
                //三级分类的a
                location.query.category3Id = category3id;
              }
              //若有params参数则一起传过去
              if(this.$route.params){
                location.params = this.$route.params
              }
              // console.log(location)
              this.$router.push(location)
            }
          },
          entershow(){
            this.showlist = true
          }
        },
        mounted(){
          //若在typeNav中发送请求，则每次挂载都需要发送请求，浪费资源
          //派发action
          //路由切换的时候,路由组件会被销毁重建【子组件不也是】
          if (this.$route.path != "/home") {
            this.showlist = false;
          }
        },
        //计算属性
        computed: {
          //数组的写法:目前书写的是大仓库state的K  ...mapState(['home'])
          ...mapState({
            //对象写法,对象的K,给VC新增的属性
            //新增的属性erha,右侧属性值为箭头函数返回的结果。作为新增属性的属性值
            //箭头函数执行，注入一个参数state->大仓库【包含小仓库】
            categoryList: (state) => state.home.categoryList, //对象简写形式
          }),
        },
    };
</script>

<style lang="less" scoped>
.cur{
  background-color: rgb(81, 81, 183);
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}
</style>
