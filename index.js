#!/usr/bin/env node
const { cd, exec } = require("shelljs");
const mkdirp = require("mkdirp");
const { join } = require("path");
const arguements = require("minimist");
const { backendFrameworks, frontendFrameworks } = require('./supportedTypes')

const {
  vueViewComponent, reactViewComponent, expressServerComponent, nestServerComponent, detectFrontEndProject,
  detectServerProject, resourceComponent, dbAndAuthComponent, vueAddComponentAndUpdateRoute, reactAddComponentAndUpdateRoute,
  svelteViewComponent, svelteAddComponentAndUpdateRoute} = require('./exports')

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
  detectFrontEndProject(appDirectory).then(frontendFramework => {
    detectServerProject(appDirectory).then(backendFramework => {
      if (arguement.hasOwnProperty("resource")) {
        resourceComponent(backendFramework, arguement, appDirectory)
      }
      if (arguement.hasOwnProperty("route")) {
        dynamicSwitch(frontendFramework, [
          { key: frontendFrameworks.REACT, fn: () => reactAddComponentAndUpdateRoute(appDirectory, arguement.route.toLowerCase()) },
          { key: frontendFrameworks.VUE, fn: () => vueAddComponentAndUpdateRoute(appDirectory, arguement.route.toLowerCase()) },
          { key: frontendFrameworks.SVELTE, fn: () => svelteAddComponentAndUpdateRoute(appDirectory, arguement.route.toLowerCase()) }
        ])
      }
      if (arguement.hasOwnProperty("db")) {
        dbAndAuthComponent(backendFramework, arguement, appDirectory)
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
  dynamicSwitch(arguement.view === undefined ? "react" : arguement.view.toLowerCase(), [
    { key: frontendFrameworks.REACT, fn: () => reactViewComponent(arguement, join(appDirectory, "client")) },
    { key: frontendFrameworks.VUE, fn: () => vueViewComponent(arguement, join(appDirectory, "client")) },
    { key: frontendFrameworks.SVELTE, fn: () => svelteViewComponent(arguement, join(appDirectory, "client")) },
  ])

  dynamicSwitch(arguement.server === undefined ? "express" : arguement.server.toLowerCase(), [
    { key: backendFrameworks.EXPRESS, fn: () => expressServerComponent(arguement, folderName, join(appDirectory, "server")) },
    { key: backendFrameworks.NEST, fn: () => nestServerComponent(arguement, folderName, join(appDirectory, "server")) },
  ])

} else {
  console.log('Please Add project name as an arguement')
}
