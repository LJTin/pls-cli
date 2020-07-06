#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const chalk = require('chalk')
const {
  download,
  rmDownload,
  createProject,
  copyTemplateToProject,
  customerInstall
} = require('../lib/utils')
const {
  getContext,
} = require('../lib/getContext')
const generator = require('../lib/generator')

async function init () {
  // 1. 获取 用户 的 项目相关信息
  let context = await getContext()
  // 项目目标路径
  let pname = path.resolve(process.cwd(), path.join('.', context.projectName))

  let cannext = await createProject(pname)

  if (cannext) {
    // 定制化模版
    await generator(context)

    // 3. cp template to project 复制模版到指定目录下
    // await copyTemplateToProject(pname)

    // rmDownload()
  
    console.log(chalk.green('创建成功:'))

    console.log(chalk.green(`cd ${context.projectName} \n yarn \n yarn serve`))
  }
}

init()