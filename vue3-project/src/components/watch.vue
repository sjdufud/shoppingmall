<template>

<p>watch监听函数的deep属性</p>


<button @click="UpdateHandler">通过count修改</button>
<p>{{ state.count }}</p>

</template> 
<script setup>
//默认机制：通过watch监听的ref对象默认是浅层监听的，
// 直接修改嵌套的对象属性不会触发回调执行，需开启deep选项

// 原因：Vue 的 watch 默认进行浅层比较，它只检查 state.value 
// 这个引用是否改变。当我们修改 state.value.count 时，
// state.value 的引用地址没变，只是对象内部属性变了，所以不会触发回调。


import { ref,watch } from 'vue';
const state=ref({count:0,age:20});
const UpdateHandler=()=>{
    //直接修改属性，不会触发回调
    state.value.count++;
}
watch(state,()=>{
    console.log('count变化了')
},{
    //开启深度监听
    deep:true
    
})



 


</script>