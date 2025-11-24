<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import powerSet from './power-set'
// 商品数据
const goods = ref({})
const getGoods = async () => {
  // 1135076  初始化就有无库存的规格
  // 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
  const res = await axios.get('http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074')
  goods.value = res.data.result
  const pathMap =getPathMap(goods.value)
  console.log(pathMap)
  initDisabledStatus(goods.value.specs,pathMap)

}
onMounted(() => getGoods())
//切换选中状态
const changeSelectedStatus =(item,val)=>{
    if(val.disabled)return
    //item:同排的对象
    //val:当前点击项
    if(val.selected){
        val.selected=false
    }else{

        item.values.forEach(val=>val.selected=false)
        val.selected=true
    }
const arr=getSelectedValues(goods.value.specs)

console.log(arr)
}
//生成有效路径字典对象

const getPathMap =(goods)=>{
    const pathMap={}
    //1.根据skus字段生成有效sku数组
    const effectiveSkus =goods.skus.filter(sku=>sku.inventory>0)
    //2.根据有效的aku使用算法（子集算法）[1,2]=>[[1],[2],[1,2]]
    effectiveSkus.forEach(sku=>{
        //2.1 获取匹配的valueName组成的数组
        const selectedValArr =sku.specs.map(val=>val.valname)
        //2.2使用算法获取子集
       const valueArrPowerSet= powerSet(selectedValArr)
        //3.把得到子集生成最终路径字典对象
        valueArrPowerSet.forEach(arr=>{
            //初始化key 数组join ->字符串 对象的key
            const key =arr.join('-')
            //如果已经存在当前key 就往数组中直接添加skuid 如果不存在key 直接做赋值
            if(pathMap[key]){
                pathMap[key].push(sku.id)
            }else{
                pathMap[key]=[sku.id ]
            }

        })
    })
    return pathMap
}


//初始化禁用状态S
const initDisabledStatus =(specs,pathMap)=>{

     specs.forEach(specs=>{
        specs.values.forEach(val=>{
                if(pathMap[val.name]){
                    val.disabled=false
                }else{
                    val.disabled=true
                }
            }
        )
     })
}


//获取选中项的匹配数组

const getSelectedValues=(specs)=>{
    const arr =[]
    specs.forEach(spec=>{
        const selectedVal=spec.values.find(item=>item.selected)
        arr.push(selectedVal?selectedVal.name:undefined)
    })
    return arr

}


//切换时更新禁用状态

const updateDisabledStatus =(specs,pathMap)=>{


     
}


</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img :class="{selected:val.selected,disabled:val.disabled}" @click="changeSelectedStatus(item,val)" v-if="val.picture" :src="val.picture" >
          <!-- 文字类型规格 -->
          <span :class="{selected:val.selected,disabled:val.disabled}" @click="changeSelectedStatus(item,val)">{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>