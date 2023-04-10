<template>
    <div class="pagination">
      <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
      <button v-if="startAndEnd.start>1" @click="$emit('getPageNo',1)">1</button>
      <button v-if="startAndEnd.start>2">···</button>
    
      <button v-for="page,index in startAndEnd.end" :key="index" 
        v-show="page>=startAndEnd.start"
        @click="$emit('getPageNo',page)">{{ page }}</button>
      
      <button v-if="startAndEnd.end<this.totalPage-1">···</button>
      <button v-if="startAndEnd.end<this.totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
      <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
      
      <button style="margin-left: 30px">共{{total}}条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','pagerCount'],
    computed:{
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        startAndEnd(){
            //算出连续页码:开始与结束这两个数字
            let start = 0,
                end = 0;
            const { totalPage, pagerCount, pageNo } = this;
            if(this.totalPage>this.pageCount){
                start = 1
                end = this.totalPage
            }else {
                //正常情况：分页器总页数大于连续页码数
                start = pageNo - parseInt(pagerCount / 2);
                end = pageNo + parseInt(pagerCount / 2);
                //约束start|end在合理范围之内
                //约束头部
                if (start < 1) {
                    start = 1;
                    end = pagerCount;
                }
                //约束尾部
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - pagerCount + 1;
                }
            }
            return { start, end };
        }
    },
    methods:{
        
    }
}
</script>

<style lang="less" scoped>
.pagination {
    button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
    }

    &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
    }
    }
}
</style>
  