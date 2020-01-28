const shell = require('shelljs');
const { join } = require('path');
const { existsSync, readFile, writeFile } = require('fs')
module.exports = (argument, folderDirectory) => {
    shell.exec('npm init -y && npm i express react react-dom')
    //Babel Dependencies
    shell.exec('npm i -D @babel/polyfill @babel/core @babel/node @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react babel-loader file-loader')
    //Styling Dependencies
    shell.exec('npm i -D css-loader style-loader html-loader node-sass sass-loader less-loader')
    //Webpack, Execution Dependencies
    shell.exec('npm i -D npm-run-all clean-webpack-plugin html-webpack-plugin nodemon  webpack webpack-dev-server webpack-cli')

    shell.cp('-R', join(__dirname, '..', 'code-templates'), folderDirectory)

    const initialDirectory = join(folderDirectory, 'src');
    const moveThemToParent = ['webpack.config.js', '.babelrc']
    const finalSet = moveThemToParent.map(file => join(initialDirectory, file))

    shell.mv(finalSet, join(folderDirectory, '..'))
    shell.cp(join(__dirname, '..', '..', 'styling', `style.${argument.style ? argument.style : 'css'}`), initialDirectory)

    const acceptedStyles = ['sass', 'scss', 'less']
    if (acceptedStyles.includes(argument.style)) {
        filePath = join(initialDirectory, 'App.js')
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
