import { createRouter, createWebHistory } from "vue-router"
const routes =
[
    {path:"/", //路径
    component: ()=>import("@/views/index.vue") //组件
    },
    {
    path:"/content",
    component: ()=>import("@/views/content.vue")
    },
    // {
    //     path:"/user/:id/name/:name?",
    //     component:()=>import("@/views/")
    // }
]

const router =createRouter({
    history:createWebHistory(),//选择路由模式，三种模式可选：history: createWebHistory(),      // HTML5 模式 (需要服务器配置)
//   history: createWebHashHistory(),  // Hash 模式 (默认，兼容性好)
//   history: createMemoryHistory(),   // 内存模式 (SSR/测试用)
    routes //放入路由规则
})

export default router


// reateRouter() 是 Vue Router 4 的工厂函数，用于：

// ✅ 创建路由实例

// ✅ 配置路由模式和路由表

// ✅ 支持 TypeScript 类型推断

// ✅ 提供编程式导航和路由守卫