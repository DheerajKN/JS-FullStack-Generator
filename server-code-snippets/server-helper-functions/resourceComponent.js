const expressAddResource = require("../express/scripts/generateResource.js");
const expressUpdateRoute = require("../express/scripts/getRouteFileAndUpdateContent.js");
const nestCreateModule = require('../nest/scripts/nestCreateModule');

module.exports = (serverProjectType, arguement, appDirectory) => {
    dynamicSwitch(serverProjectType, [
        {
            key: "express", fn: () => {
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
                    )
            }
        },
        {
            key: "nest", fn: () => {
                nestCreateModule
                    .createControllerAndService(
                        appDirectory,
                        arguement.resource
                    )
            }
        },
    ])
}