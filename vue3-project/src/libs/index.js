let MyPlugin={};

MyPlugin.install =function( vue,options){
    vue.myGlobalMethod=function(){
        console.log('全局方法');
    }
}
// Vue.directive('my-directive',{
//     bind(){
//         console.log('指令绑定成功');
//     }
// })

export default MyPlugin