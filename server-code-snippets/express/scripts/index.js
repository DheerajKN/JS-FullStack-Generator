const shell = require('shelljs');
const { join } = require('path');
const { writeFile, readFile } = require('fs');

module.exports = (argument, folderDirectory) => {
    shell.cp('-R', join(__dirname, '..', 'code-snippets'), folderDirectory)

    readFile(join(folderDirectory, '..', 'package.json'), 'utf8', (err, content) => {
        content = JSON.parse(content);

        content.scripts['build:client'] = "webpack --watch --mode production";
        content.scripts.start = "npm-run-all --parallel start:client server";
        content.scripts['start:client'] = "webpack-dev-server --mode development --devtool inline-source-map --hot";
        content.scripts.server = "nodemon --exec babel-node server/src/index.js";
        content.scripts.dev = "npm-run-all --parallel build:client server";

        writeFile(join(folderDirectory, '..', 'package.json'), JSON.stringify(content, null, "  "), () => { });
    })
}
