const { sep } = require('path')
const dbComponent = require("../express/scripts/dbComponent");
const nestDBComponent = require("../nest/scripts/dbComponent");
const authComponent = require("../express/scripts/authComponent");
const nestAuthComponent = require("../nest/scripts/authComponent");

module.exports = (serverProjectType, arguement, appDirectory) => {
    if (serverProjectType === "express") {
        dbComponent.addDBComponent(appDirectory, process.cwd().split(sep).pop());
        if (arguement.hasOwnProperty("auth")) {
            authComponent.addAuthComponent(appDirectory);
        }
    } else if (serverProjectType === "nest") {
        nestDBComponent.addDBComponent(appDirectory, process.cwd().split(sep).pop());
        if (arguement.hasOwnProperty("auth")) {
            nestAuthComponent.addAuthComponent(appDirectory);
        }
    }
}