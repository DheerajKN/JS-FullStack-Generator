const { exec, cp } = require('shelljs');
const { join } = require('path');
const commonStyleComponent = require('../../frontend-helper-functions/commonStyleComponent')

module.exports = (argument, folderDirectory) => {
    exec('npm i react react-dom react-router-dom')
    //Babel Dependencies
    exec('npm i -D babel-polyfill @babel/core @babel/node @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react babel-loader')
    //Styling Dependencies
    exec('npm i -D css-loader style-loader html-loader file-loader')
    //Webpack, Execution Dependencies
    exec('npm i -D npm-run-all clean-webpack-plugin html-webpack-plugin nodemon webpack-assets-manifest webpack webpack-dev-server webpack-cli')
    //Electron Dependencies
    exec('npm i electron-is-dev && npm i -D electron electron-builder concurrently cross-env wait-on')

    cp('-R', join(__dirname, '..', 'code-templates'), folderDirectory)
    const initialDirectory = join(folderDirectory, 'src');

    commonStyleComponent(folderDirectory, argument, join(initialDirectory, 'components', 'Home.js'), initialDirectory)
}
