const path = require('path')
const execSync = require('child_process').execSync ;

const template = {
  'vueTemplate': '../template/vue-template'
}

module.exports = function (context, dest = '.') {

  dest = path.resolve(process.cwd(), path.join('.', context.projectName))
  
  let src = path.join(__dirname, template[context.projectType])
  console.log(dest, src)
  execSync(`mkdir -p ${dest}`); // 创建多个目录
  execSync(`cp -r ${src}/* ${dest}`); // 复制源码到目标路径
  execSync(`cd ${dest};`, { stdio: 'inherit', shell: true }); // 进入目标路径
}
