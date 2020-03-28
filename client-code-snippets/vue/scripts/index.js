const { exec, cp } = require('shelljs');
const { join } = require('path');
const commonStyleComponent = require('../../frontend-helper-functions/commonStyleComponent')

module.exports = (argument, folderDirectory) => {
    exec('npm i vue vue-router')
    //Babel Dependencies
    exec('npm i -D babel-polyfill @babel/core @babel/node @babel/preset-env babel-loader file-loader')
    //Styling and Vue Loader Dependencies
    exec('npm i -D vue-loader vue-template-compiler css-loader html-loader')
    //Webpack, Execution Dependencies
    exec('npm i -D npm-run-all clean-webpack-plugin html-webpack-plugin nodemon webpack webpack-dev-server webpack-cli')
    //Electron Dependencies
    exec('npm i electron-is-dev && npm i -D electron electron-builder concurrently cross-env wait-on')

    cp('-R', join(__dirname, '..', 'code-templates'), folderDirectory)

    const initialDirectory = join(folderDirectory, 'src');
    commonStyleComponent(folderDirectory, argument, join(initialDirectory, 'App.vue'), initialDirectory)
}
