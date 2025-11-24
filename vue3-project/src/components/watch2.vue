<template>
    <div> 
        <button @click="changeName">改变name</button>
        <button @click="changeAge">改变age</button>
        <p>{{ state.name }}</p>
        <p>{{ state.age }}</p>
    </div>
   
</template>
<script setup>
//精确侦听对象的某个属性：需求：在不开启deep的前提下，侦听age变化，只有age变化才执行回调
import { ref, watch } from 'vue';

const state=ref({
    name:"Helen",
    age:"20"
})

const changeName=()=>{
    state.value.name="Amy"
}

const changeAge=()=>{
    state.value.age="100"
}
//精确侦听某个具体属性
//不开启deep，想在某个层次比较深的属性变化时执行回调：
// 可以把第一个参数写成函数的写法，返回要监听具体的属性
watch(

    ()=>state.value.age,
    ()=>{console.log("age改变了")}

)

</script>