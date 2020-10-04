var env = process.env.NODE_ENV || 'development'
var environment = require('./config.json')[env]

console.log(process.env.NODE_ENV)

export default environment
