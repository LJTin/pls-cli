#!/usr/bin/env node


const program = require('commander')

const version = require('../package.json').version

program.version(version)
	.usage('<command> [项目名称]')
	.command('init', '创建新项目') // .action(initAction)
	.parse(process.argv)

// program.usage('<project-name>').parse(process.argv)



