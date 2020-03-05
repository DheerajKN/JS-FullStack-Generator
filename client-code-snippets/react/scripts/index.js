const { exec, mv, cp } = require('shelljs');
const { join } = require('path');
const { existsSync, readFile, writeFile } = require('fs')
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
    const moveThemToParent = ['webpack.config.js', '.babelrc']
    const finalSet = moveThemToParent.map(file => join(initialDirectory, file))

    mv(finalSet, join(folderDirectory, '..'))

    cp(join(__dirname, '..', '..', 'styling', `style.${argument.style ? argument.style : 'css'}`), initialDirectory)

    const acceptedStyles = ['sass', 'scss', 'less']
    if (acceptedStyles.includes(argument.style)) {
        if (argument.style === 'less') {
            exec('npm i -D less less-loader')
        } else {
            exec('npm i -D node-sass sass-loader')
        }
        filePath = join(initialDirectory, 'components', 'Home.js')
        if (existsSync(filePath)) {
            readFile(filePath, 'utf8', (err, oldContent) => {
                let newContent = oldContent.replace(/css(.*)/g, `${argument.style}'`);

                writeFile(filePath, newContent, (err) => {
                    if (err) throw err;
                })
            })
        }
    }

}
