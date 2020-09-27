const { sh, cli } = require('tasksfile')

function hello(options, name = 'Mysterious') {
  console.log(`Hello ${name}!`)
}

cli({
  hello,
})
