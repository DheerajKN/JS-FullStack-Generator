#!/usr/bin/env node
const { cd, exec } = require("shelljs");
const mkdirp = require("mkdirp");
const { join, sep } = require("path");
const arguements = require("minimist");

let appDirectory = `${process.cwd()}`;

let arguement = arguements(process.argv.slice(2));

const vueViewComponent = require("./client-code-snippets/vue/scripts/index.js");
const reactViewComponent = require("./client-code-snippets/react/scripts/index.js");
const expressServerComponent = require("./server-code-snippets/express/scripts/index.js");
const nestServerComponent = require("./server-code-snippets/nest/scripts/index.js");
const expressAddResource = require("./server-code-snippets/express/scripts/generateResource.js");
const expressUpdateRoute = require("./server-code-snippets/express/scripts/getRouteFileAndUpdateContent.js");
const detectFrontEndProject = require("./client-code-snippets/frontend-helper-functions/detectFrontendProjectType");
const detectServerProject = require("./server-code-snippets/server-helper-functions/detectServerProjectType");
const nestCreateModule = require('./server-code-snippets/nest/scripts/nestCreateModule');
const reactAddResourceAndUpdateRoute = require("./client-code-snippets/react/scripts/updateRoute.js");
const vueAddResourceAndUpdateRoute = require("./client-code-snippets/vue/scripts/updateRouter");
const dbComponent = require("./server-code-snippets/express/scripts/dbComponent");
const nestDBComponent = require("./server-code-snippets/nest/scripts/dbComponent");
const authComponent = require("./server-code-snippets/express/scripts/authComponent");

const cdIntoApp = appDirectory => {
  return new Promise(resolve => {
    cd(appDirectory);
    mkdirp(join(appDirectory, "client"));
    mkdirp(join(appDirectory, "server"));
    resolve();
  });
};

if (Object.keys(arguement).some(r => ["resource", "route", "db", "auth"].includes(r))) {
  detectFrontEndProject(appDirectory).then(frontendProjectType => {
    detectServerProject(appDirectory).then(serverProjectType => {
      if (arguement.hasOwnProperty("resource")) {
        if (serverProjectType === 'express') {
          expressUpdateRoute
            .updateRouteText(
              `${appDirectory}/server/src/routes/index.js`,
              arguement.resource
            )
            .then(() =>
              expressAddResource.createControllerAndService(
                appDirectory,
                arguement.resource
              )
            );
        } else if (serverProjectType === 'nest') {
          nestCreateModule
            .createControllerAndService(
              appDirectory,
              arguement.resource
            )
        }
      }
      if (arguement.hasOwnProperty("route")) {
        if (frontendProjectType === "react") {
          reactAddResourceAndUpdateRoute(appDirectory, arguement.route);
        } else if (frontendProjectType === "vue") {
          vueAddResourceAndUpdateRoute(appDirectory, arguement.route);
        }
      }
      if (arguement.hasOwnProperty("db")) {
        if (serverProjectType === "express") {
          dbComponent.addDBComponent(appDirectory, process.cwd().split(sep).pop());
          if (arguement.hasOwnProperty("auth")) {
            authComponent.addAuthComponent(appDirectory);
          }
        } else if (serverProjectType === "nest") {
          nestDBComponent.addDBComponent(appDirectory, process.cwd().split(sep).pop());
          if (arguement.hasOwnProperty("auth")) {
            // authComponent.addAuthComponent(appDirectory);
          }
        }
      }
    });
  }).catch((err) => console.log('Package.json is missing make sure that your inside project directory to execute this command'))
}

else if (arguement._[0] !== undefined) {
  let folderName = arguement._[0];
  appDirectory = join(appDirectory, folderName);
  mkdirp.sync(appDirectory);
  cdIntoApp(appDirectory);
  exec('npm init -y')
  switch (arguement.view) {
    case "vue":
      vueViewComponent(arguement, join(appDirectory, "client"));
      break;
    case "react":
      reactViewComponent(arguement, join(appDirectory, "client"));
      break;
    default:
      reactViewComponent(arguement, join(appDirectory, "client"));
      break;
  }
  switch (arguement.server) {
    case "nest":
      nestServerComponent(arguement, folderName, join(appDirectory, "server"));
      break;
    case "express":
      expressServerComponent(arguement, folderName, join(appDirectory, "server"));
      break;
    default:
      expressServerComponent(arguement, folderName, join(appDirectory, "server"));
      break;
  }
} else {
  console.log('Please Add project name as an arguement')
}
