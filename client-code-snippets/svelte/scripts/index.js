const { exec, cp } = require('shelljs');
const { join } = require('path');
const commonStyleComponent = require('../../frontend-helper-functions/commonStyleComponent')

module.exports = (argument, folderDirectory) => {
    exec('npm i extract-css-chunks-webpack-plugin svelte svelte-loader && npm i -D @spaceavocado/svelte-router')
    //Babel Dependencies
    exec('npm i -D @babel/core @babel/node @babel/preset-env babel-loader')
    //Styling and Svelte Styling and Image Loader Dependencies
    exec('npm i -D svelte-preprocess svg-sprite-loader svg-sprite-webpack-plugin svgo svgo-loader css-loader html-loader')
    //Webpack, Execution Dependencies
    exec('npm i -D npm-run-all clean-webpack-plugin copy-webpack-plugin html-webpack-plugin nodemon webpack webpack-dev-server webpack-cli')
    //Electron Dependencies
    exec('npm i electron-is-dev && npm i -D electron electron-builder concurrently cross-env wait-on')

    cp('-R', join(__dirname, '..', 'code-templates'), folderDirectory)

    const initialDirectory = join(folderDirectory, 'src');
    commonStyleComponent(folderDirectory, argument, join(initialDirectory, 'App.svelte'), initialDirectory, ['template.config.js'])
}
