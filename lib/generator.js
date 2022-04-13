/*
 * @Author: jianting.lian
 * @LastEditors: jianting.lian
 * @Date: 2020-07-06 18:02:18
 * @LastEditTime: 2022-04-13 14:19:22
 */
const path = require('path')
const execSync = require('child_process').execSync ;

const template = {
  'vueTemplate': '../template/vue-template',
  'vue3Template': '../template/vue3-template'
}

module.exports = function (context, dest = '.') {

  dest = path.resolve(process.cwd(), path.join('.', context.projectName))
  
  let src = path.join(__dirname, template[context.projectType])
  console.log(dest, src)
  execSync(`mkdir -p ${dest}`); // 创建多个目录
  execSync(`cp -r ${src}/* ${dest}`); // 复制源码到目标路径
  execSync(`cd ${dest};`, { stdio: 'inherit', shell: true }); // 进入目标路径
}
