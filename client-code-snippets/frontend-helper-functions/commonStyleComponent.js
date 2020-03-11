const { existsSync, readFile, writeFile } = require('fs')
const { join } = require('path')
const { mv, cp, exec } = require('shelljs')

module.exports = (folderDirectory, argument, filePath, initialDirectory) => {
    const moveThemToParent = ['webpack.config.js', '.babelrc']
    const finalSet = moveThemToParent.map(file => join(initialDirectory, file))
    const style = argument.style.toLowerCase();

    mv(finalSet, join(folderDirectory, '..'))

    cp(join(__dirname, '..', 'styling', `style.${style ? style : 'css'}`), initialDirectory)

    const acceptedStyles = ['sass', 'scss', 'less']
    if (acceptedStyles.includes(style)) {
        if (style === 'less') {
            exec('npm i -D less less-loader')
        } else {
            exec('npm i -D node-sass sass-loader')
        }

        if (existsSync(filePath)) {
            readFile(filePath, 'utf8', (err, oldContent) => {
                let newContent = oldContent.replace(/css/g, style);

                writeFile(filePath, newContent, (err) => {
                    if (err) throw err;
                })
            })
        }
    }
}