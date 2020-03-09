const shell = require('shelljs');
const { join } = require('path');
const { writeFile, readFile } = require('fs');
const setPackageJson = require('../../server-helper-functions/setPackageJson')

module.exports = (argument, folderName, folderDirectory) => {
    shell.exec('npm i express')
    shell.cp('-R', join(__dirname, '..', 'code-snippets'), folderDirectory)

    var content = JSON.parse(readFileSync(join(folderDirectory, '..', 'package.json')).toString());

    content = setPackageJson(content, argument, folderName)

    writeFile(join(folderDirectory, '..', 'package.json'), JSON.stringify(content, null, "  "), () => { });
}
