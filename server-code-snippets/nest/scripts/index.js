const { exec, cp } = require('shelljs');
const { join } = require('path');
const { writeFile, readFile } = require('fs');
const os = require('os');

module.exports = (argument, folderName, folderDirectory) => {
    exec('npm i @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata rxjs')

    exec('npm i -D @nestjs/cli @nestjs/serve-static')

    cp('-R', join(__dirname, '..', 'code-snippets'), folderDirectory)

    readFile(join(folderDirectory, '..', 'package.json'), 'utf8', (err, content) => {
        content = JSON.parse(content);

        //Electron Values
        content.main = "client/src/electron.js";
        content.author = os.userInfo().username;
        content.description = folderName;

        //Electron-Builder Values
        content['build'] = "";
        content.build['appId'] = `${argument.view}.electron`
        content.build = {
            "dmg": {
                "contents": [
                    {
                        "x": 110,
                        "y": 150
                    },
                    {
                        "x": 240,
                        "y": 150,
                        "type": "link",
                        "path": "/Applications"
                    }
                ]
            },
            "linux": {
                "target": [
                    "AppImage",
                    "deb"
                ]
            },
            "win": {
                "icon": "build/assets/logo.png"
            },
            "directories": {
                "buildResources": "build"
            },
            "files": [
                "./build",
                "./node_modules",
                "./client/src/electron.js"
            ]
        }

        //Build Script Values
        content.scripts['build:client'] = "webpack --env.ELECTRON_PROD=false --mode production";
        content.scripts['build:electron'] = "webpack --env.ELECTRON_PROD=true --mode production && electron-builder"
        content.scripts.start = "npm-run-all --parallel start:client start:electron server";
        content.scripts['start:client'] = "cross-env BROWSER=none webpack-dev-server --env.ELECTRON_PROD=false --mode development --devtool inline-source-map --hot";
        content.scripts['start:electron'] = "wait-on http://localhost:3000 && electron ."
        content.scripts.server = "nest start";
        content.scripts.build = "npm-run-all --parallel build:client server";
        content.scripts['start:dev'] = "nest start --watch";

        //Nest Values
        content["rootDir"] = "src";
        writeFile(join(folderDirectory, '..', 'package.json'), JSON.stringify(content, null, "  "), () => { });

        //Move critical files to top level
        const initialDirectory = join(folderDirectory, 'src');
        const moveThemToParent = ['nest-cli.json', 'tsconfig.build.json', 'tsconfig.json']
        const finalSet = moveThemToParent.map(file => join(initialDirectory, file))

        mv(finalSet, join(folderDirectory, '..'))
    })
}
