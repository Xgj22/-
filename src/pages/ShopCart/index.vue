<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @click="changeCheckedBySkuId(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods1.png" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('decrease', cart, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeInputSkuNum(cart, $event)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('increase', cart, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          @change="($event) => updateAllCheck($event)"
          :checked="isAllCheck && this.cartInfoList.length > 0"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span></span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney"></i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" target="_self" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
//引入节流模块
import { throttle } from "lodash";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getShopCartList");
    },
    //throttle 节流函数，防止用户在短时间内多次发送请求，async要在最里面的函数中
    //防抖是多次请求并作最后一次发送
    changeSkuNum: throttle(async function (name, cart, disNum) {
      switch (name) {
        case "decrease":
          if (cart.skuNum < 1) {
            disNum = 0;
          } else {
            disNum = -1;
          }
          break;
        case "increase":
          disNum = 1;
          break;
      }
      try {
        let result = await this.$store.dispatch("getAddOrUpdateCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {}
      //
    },600),
    async changeInputSkuNum(cart, e) {
      //整理参数
      let params = { skuId: cart.skuId };
      //计算出SkuNum携带的数据
      let userResultValue = e.target.value * 1;
      //用户输入完毕，最终结果【非法条件】
      if (isNaN(userResultValue) || userResultValue < 1) {
        params.skuNum = 0;
      } else {
        //正常情况
        params.skuNum = parseInt(userResultValue) - cart.skuNum;
      }
      //发请求：修改商品的个数
      try {
        //修改商品的个数、成功以后再次获取购物车的数据
        await this.$store.dispatch("getAddOrUpdateCart", params);
        this.getData();
      } catch (error) {}
    },
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
        this.getData();
      } catch (error) {
        alert("删除产品失败");
      }
    },
    async changeCheckedBySkuId(cart, e) {
      try {
        let params = {
          skuId: cart.skuId,
          isChecked: e.target.checked ? "1" : "0",
        };
        await this.$store.dispatch("changeChecked", params);
        this.getData();
      } catch (error) {
        alert("失败");
      }
    },
    async deleteAllCart(){
      try {
        await this.$store.dispatch('deleteAllCart')
        this.getData()
      } catch (error) {
        alert("失败");
      }
    },
    async updateAllCheck(e){
      try {
        await this.$store.dispatch('allUpdateCheck',e.target.checked)
        this.getData()
      } catch (error) {
        alert("失败")
      }
    }
    
  },
  computed: {
    ...mapGetters(["cartInfoList"]),
    totalPrice() {
      return this.cartInfoList;
    },
    isAllCheck() {
      //购物车里面的数据进行过滤(勾选)，如果勾选的商品与购物车商品总数相等。全选勾选！相反不够！！！
      return (
        this.cartInfoList.filter((item) => item.isChecked == "1").length ===
        this.cartInfoList.length
      );
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
