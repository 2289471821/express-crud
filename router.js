/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法 + 请求路径设置具体的请求处理函数
 */
const express = require('express')
const fs = require('fs')
const Student = require('./student')

// 1.创建一个理由容器
const router = express.Router()

// 2.把路由挂载到 router 路由容器中
// 渲染首页
router.get('/', (req, res) => {
  // fs.readFile('./db.json', 'utf-8', (err, data) => {
    // if(err) {
    //   return res.status(500).send('Server error.')
    // }
    // res.render('index.html', {
    //   students: JSON.parse(data).students
    // })
  // })
  Student.find((err, students) => {
    if(err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', {
      students
    })
  })
})

// 渲染添加学生页面
router.get('/students/new', (req, res) => {
  res.render('new.html')
})

// 处理添加学生请求
router.post('/students/new', (req, res) => {
  // 1.获取表单数据
  // 2.处理数据
  // 3.发送响应
  // console.log(req.body);
  // const student = req.body
  Student.save(req.body, err => {
    if(err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})

// 渲染编辑学生页面
router.get('/students/edit', (req, res) => {
  // 根据 id 找到学生信息，并渲染编辑页面
  Student.findIndividual(parseInt(req.query.id), (err, student) => {
    if(err) {
      return res.status(500).send('Server error.')
    }
    // console.log(student);
    res.render('edit.html', {student})
  })
})

// 处理编辑请求
router.post('/students/edit', (req, res) => {
  // console.log(req.body);
  Student.update(req.body, err => {
    if(err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})

// 处理删除请求
router.get('/students/delete', (req, res) => {
  Student.delete(req.query.id, err => {
    if(err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})

// 3.导出 Router
module.exports = router
