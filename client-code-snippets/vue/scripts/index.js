const shell = require('shelljs');
const { join } = require('path');
const { existsSync, readFile, writeFile } = require('fs')
module.exports = (argument, folderDirectory) => {
    shell.exec('npm init -y && npm i express vue vue-router')
    //Babel Dependencies
    shell.exec('npm i -D babel-polyfill @babel/core @babel/node @babel/plugin-proposal-class-properties @babel/preset-env babel-loader file-loader')
    //Styling and Vue Loader Dependencies
    shell.exec('npm i -D vue-loader vue-template-compiler css-loader html-loader')
    //Webpack, Execution Dependencies
    shell.exec('npm i -D npm-run-all clean-webpack-plugin html-webpack-plugin nodemon webpack webpack-dev-server webpack-cli')
    //Electron Dependencies
    shell.exec('npm i electron-is-dev && npm i -D electron electron-builder concurrently cross-env wait-on')

    shell.cp('-R', join(__dirname, '..', 'code-templates'), folderDirectory)

    const initialDirectory = join(folderDirectory, 'src');
    const moveThemToParent = ['webpack.config.js', '.babelrc']
    const finalSet = moveThemToParent.map(file => join(initialDirectory, file))

    shell.mv(finalSet, join(folderDirectory, '..'))
    shell.cp(join(__dirname, '..', '..', 'styling', `style.${argument.style ? argument.style : 'css'}`), initialDirectory)

    const acceptedStyles = ['sass', 'scss', 'less']
    if (acceptedStyles.includes(argument.style)) {
        if (argument.style === 'less') {
            shell.exec('npm i -D less less-loader')
        } else {
            shell.exec('npm i -D node-sass sass-loader ')
        }
        filePath = join(initialDirectory, 'App.vue')
        if (existsSync(filePath)) {
            readFile(filePath, 'utf8', (err, oldContent) => {
                let newContent = oldContent.replace(/css/g, `${argument.style}`);

                writeFile(filePath, newContent, (err) => {
                    if (err) throw err;
                })
            })
        }
    }

}
