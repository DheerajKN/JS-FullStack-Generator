#!/usr/bin/env node
const { cd, exec } = require("shelljs");
const mkdirp = require("mkdirp");
const { join } = require("path");
const arguements = require("minimist");
const {
  vueViewComponent, reactViewComponent, expressServerComponent, nestServerComponent, detectFrontEndProject,
  detectServerProject, resourceComponent, dbAndAuthComponent
} = require('./exports')

let appDirectory = `${process.cwd()}`;

let arguement = arguements(process.argv.slice(2));

const dynamicSwitch = require('./dynamicSwitch')

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
        resourceComponent(serverProjectType, arguement, appDirectory)
      }
      if (arguement.hasOwnProperty("route")) {
        dynamicSwitch(frontendProjectType, [
          { key: "react", fn: () => reactAddResourceAndUpdateRoute(appDirectory, arguement.route) },
          { key: "vue", fn: () => vueAddResourceAndUpdateRoute(appDirectory, arguement.route) },
        ])
      }
      if (arguement.hasOwnProperty("db")) {
        dbAndAuthComponent(serverProjectType, arguement, appDirectory)
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
  dynamicSwitch(arguement.view, [
    { key: "react", fn: () => reactViewComponent(arguement, join(appDirectory, "client")) },
    { key: "vue", fn: () => vueViewComponent(arguement, join(appDirectory, "client")) },
  ])

  dynamicSwitch(arguement.server, [
    { key: "express", fn: () => expressServerComponent(arguement, folderName, join(appDirectory, "server")) },
    { key: "nest", fn: () => nestServerComponent(arguement, folderName, join(appDirectory, "server")) },
  ])

} else {
  console.log('Please Add project name as an arguement')
}
