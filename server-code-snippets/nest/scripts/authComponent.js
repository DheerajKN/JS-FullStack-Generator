const { exec, cp } = require('shelljs')
const { join } = require('path')
module.exports.addAuthComponent = folderDirectory => {
    exec('npm i @nestjs/jwt @nestjs/passport passport passport-local passport-jwt bcrypt && npx nest g mo auth')
    cp('-R', join(__dirname, 'auth'), join(folderDirectory, 'server', 'src'))
}