// 动态注册compontents内的所有组件，之后在全局无需注册即可使用
// 格式为  目录名-文件名，
// 例子1  src/components/page/header.vue, <page-header>
// 例子2  src/components/Hello.vue, <hello>

import Vue from 'vue'
const requireContext = require.context('./', true, /.*\.vue$/)

const components = requireContext.keys().map(key => {
    Vue.component(rename(key), requireContext(key).default)
})

/* 将组件注册成 目录-文件名的形式, page-header
 * 无目录则为文件名，如 hello
 */
function rename(key) {
    let name = key
        .replace(/\.+\//, '')
        .replace(/\.vue/, '')
        .replace(/\//g, '-')
        .replace(/^(\w)/, v => v.toLowerCase())
    return name
}

export default components