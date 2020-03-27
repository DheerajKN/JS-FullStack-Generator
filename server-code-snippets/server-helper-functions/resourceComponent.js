const expressAddResource = require("../express/scripts/generateResource.js");
const expressUpdateRoute = require("../express/scripts/getRouteFileAndUpdateContent.js");
const nestCreateModule = require('../nest/scripts/nestCreateModule');
const dynamicSwitch = require('../../dynamicSwitch')
const { backendFrameworks } = require('../../supportedTypes')

module.exports = (serverProjectType, arguement, appDirectory) => {
    dynamicSwitch(serverProjectType, [
        {
            key: backendFrameworks.EXPRESS, fn: () => {
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
            key: backendFrameworks.NEST, fn: () => {
                nestCreateModule
                    .createControllerAndService(
                        appDirectory,
                        arguement.resource
                    )
            }
        },
    ])
}