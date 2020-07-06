const path = require('path')
const {execSync} = require('child_process')
const ora = require('ora')
const fs = require('fs')
const chalk = require('chalk')

let downloadSource = path.join('.download-temp')

// 下载
module.exports.download = () => {
  let url = `` // TODO 下载的仓库地址
  const spinner = ora(`正在下载项目模板...`)
  spinner.start()
  execSync(`
    git clone ${url} ${downloadSource}
  `)
  spinner.succeed()
  return 'ok'
}

// 删除
module.exports.rmDownload = () => {
  const spinner = ora(`正在删除项目模板...`)
  spinner.start()
  execSync(`
    rm -rf ${downloadSource}
  `)
  spinner.succeed()
}

module.exports.createProject = projectName => {
  const spinner = ora(`正在创建项目...`)
  console.log('projectName', projectName)
  spinner.start()
  if (fs.existsSync(projectName)) {
    spinner.fail()
    console.log(chalk.red(`${projectName} is exists! can't created.`))
    return false
  }
  spinner.succeed()
  return true
}

module.exports.customerInstall = async type => {
  const spinner = ora(`安装及启动`)
  spinner.start()
  execSync(`
    ${type} install && ${type} run dev
  `)
  spinner.succeed()
  return 'ok'
} 

// 项目复制
module.exports.copyTemplateToProject = async projectName => {
  fs.mkdirSync(path.join(projectName))
  await transformDir(downloadSource, downloadSource, projectName)
}

async function transformDir(dirpath, dir, projectName) {
  let dirs = fs.readdirSync(dir)
  dirs.filter(n => n !== '.git').forEach(fname => {    
    if (fs.statSync(path.join(dirpath, fname)).isDirectory()) {
      let nextPath = `${dirpath}/${fname}`
      let pname = `${projectName}/${fname}`
      fs.mkdirSync(path.join(projectName, fname))
      transformDir(nextPath, path.join(nextPath), pname)
    } else {
      fs.copyFileSync(path.join(dirpath, fname), path.join(projectName, fname))
    }
  })
}
