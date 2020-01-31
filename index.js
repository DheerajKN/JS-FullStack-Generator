const { cd } = require('shelljs')
const mkdirp = require('mkdirp')
const { join } = require('path')
const arguements = require('minimist')

let appDirectory = `${process.cwd()}`

let arguement = arguements(process.argv.slice(2));

const vueViewComponent = require('./client-code-snippets/vue/scripts/index.js')
const reactViewComponent = require('./client-code-snippets/react/scripts/index.js')
const expressServerComponent = require('./server-code-snippets/express/scripts/index.js')
const expressAddResource = require('./server-code-snippets/express/scripts/generateResource.js')
const expressUpdateRoute = require('./server-code-snippets/express/scripts/getFileAndUpdateContent.js')

const cdIntoApp = (appDirectory) => {
    return new Promise(resolve => {
        cd(appDirectory)
        mkdirp(join(appDirectory, 'client'))
        mkdirp(join(appDirectory, 'server'))
        resolve()
    })
}

let folderName = arguement._[0];
if (folderName) {
    appDirectory = join(appDirectory, folderName)
    mkdirp.sync(appDirectory);
    cdIntoApp(appDirectory);
    switch (arguement.view) {
        case 'vue':
            vueViewComponent(arguement, join(appDirectory, 'client'))
            break;
        case 'react':
            reactViewComponent(arguement, join(appDirectory, 'client'))
            break;
        default:
            break;
    }
    expressServerComponent(arguement, join(appDirectory, 'server'))
} else {
    if (arguement.hasOwnProperty('resource')) {
        expressUpdateRoute.updateRouteText(`${appDirectory}/server/src/routes/index.js`, arguement.resource)
            .then(() => expressAddResource.createControllerAndService(appDirectory, arguement.resource))
    }
    if (arguement.hasOwnProperty('route')) {

    }
    if (arguement.hasOwnProperty('db')) {
        if (arguement.hasOwnProperty('auth')) {

        }
    }
}