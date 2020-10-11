/**
 * app.js 入口模块
 * 职责：
 *   启动服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */
const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

const app = express()

// 模板引擎
app.engine('html', require('express-art-template'))

// 提供静态资源服务
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// body-parser 解析表单 post 请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 挂载路由
app.use(router)

// 监听端口启动服务
app.listen(3000, () => console.log('App listening on port 3000!'))
