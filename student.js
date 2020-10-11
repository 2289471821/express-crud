/**
 * students.js 数据操作文件模块
 * 职责：
 *   操作文件中的数据，只处理数据，不关心业务
 */
const fs = require('fs')
const dbPath = './db.json'

/**
 * 获取所有学生列表
 */
exports.find = callback => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if(err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

/**
 * 根据 id 获取单个学生信息
 */
exports.findIndividual = (id, callback) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if(err) {
      return callback(err)
    }
    // 把字符串数据转换为对象
    let students = JSON.parse(data).students

    // 遍历 students 找到 id 相同的对象
    let stu = students.find(item => {
      return item.id === parseInt(id)
    })

    // 把找到的学生信息传出
    callback(null, stu)
  })
}

/**
 * 添加保存学生
 */
exports.save = (student, callback) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if(err) {
      return callback(err)
    }
    // 把字符串数据转换为对象
    let students = JSON.parse(data).students

    // 处理 students 为空时的情况
    if(students.length === 0) {
      student.id = 1
    }else {
      // 处理 id 唯一
      student.id = students[students.length - 1].id + 1
    }
    
    // 把用户传递的对象保存到数组中
    students.push(student)

    // 把对象数据转换为字符串
    let fileData = JSON.stringify({students})

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, (err) => {
      if(err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 更新学生
 */
exports.update = (student, callback) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if(err) {
      return callback(err)
    }
    // 把字符串数据转换为对象
    let students = JSON.parse(data).students

    student.id = parseInt(student.id)

    // 遍历 students 找到 id 相同的对象
    let stu = students.find(item => {
      return item.id === student.id
    })

    // 遍历拷贝对象
    for(let key in student) {
      stu[key] = student[key]
    }

    // 把对象数据转换为字符串
    let fileData = JSON.stringify({students})

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, (err) => {
      if(err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 删除学生
 */
exports.delete = (id, callback) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if(err) {
      return callback(err)
    }
    // 把字符串数据转换为对象
    let students = JSON.parse(data).students

    // 找到 id 相同的学生信息的下标
    let deleteIndex = students.findIndex(item => {
      return item.id === parseInt(id)
    })

    // 根据下标删除对应的学生信息
    students.splice(deleteIndex, 1)

    // 把对象数据转换为字符串
    let fileData = JSON.stringify({students})

    // 把字符串保存到文件中
    fs.writeFile(dbPath, fileData, (err) => {
      if(err) {
        return callback(err)
      }
      callback(null)
    })
  })
}
