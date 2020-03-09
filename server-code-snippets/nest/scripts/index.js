const { exec, cp, mv } = require('shelljs');
const { join } = require('path');
const { writeFile, readFileSync } = require('fs');
const setPackageJson = require('../../server-helper-functions/setPackageJson')

module.exports = (argument, folderName, folderDirectory) => {
    exec('npm i @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata rxjs')

    exec('npm i -D @nestjs/cli @nestjs/serve-static')

    cp('-R', join(__dirname, '..', 'code-snippets'), folderDirectory)

    var content = JSON.parse(readFileSync(join(folderDirectory, '..', 'package.json')).toString());

    content = setPackageJson(content, argument, folderName)

    //Nest Values
    content.scripts.server = "nest start";
    content.scripts.start = "npm-run-all --parallel start:client start:electron start:dev";
    content.scripts['start:dev'] = "nest start --watch";
    content["rootDir"] = "src";

    writeFile(join(folderDirectory, '..', 'package.json'), JSON.stringify(content, null, "  "), () => { });

    //Move critical files to top level
    const moveThemToParent = ['nest-cli.json', 'tsconfig.build.json', 'tsconfig.json']
    const finalSet = moveThemToParent.map(file => join(folderDirectory, file))

    mv(finalSet, join(folderDirectory, '..'))
}
