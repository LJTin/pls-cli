/*
 * @Author: jianting.lian
 * @LastEditors: jianting.lian
 * @Date: 2020-07-06 18:02:18
 * @LastEditTime: 2022-04-13 14:19:58
 */
const inquirer = require('inquirer')

module.exports.getContext = async () => {

  let projectType = await inquirer.prompt([
    {
      name: 'projectType',
      message: '模版类型',
      type: 'list',
      choices: [{
        name: 'vue项目',
        value: 'vueTemplate'
      }, {
        name: 'vue3项目',
        value: 'vue3Template'
      }]
    }
  ])

  console.log('projectType', projectType.projectType)

  let projectName = await inquirer.prompt([
    {
      name: 'projectName',
      message: '请输入项目名称:',
      default: `${projectType.projectType}`
    }
  ])

  let author = await inquirer.prompt([
    {
      name: 'author',
      message: '请输入创建者:',
      default: 'admin'
    }
  ])

  return {
    projectType: projectType.projectType,
    projectName: projectName.projectName,
    author: author.author
  }
}
