//View Components
const vueViewComponent = require("./client-code-snippets/vue/scripts/index.js");
const reactViewComponent = require("./client-code-snippets/react/scripts/index.js");
const svelteViewComponent = require("./client-code-snippets/svelte/scripts/index.js");
//Server Components
const expressServerComponent = require("./server-code-snippets/express/scripts/index.js");
const nestServerComponent = require("./server-code-snippets/nest/scripts/index.js");
//Detect Project Setup
const detectFrontEndProject = require("./client-code-snippets/frontend-helper-functions/detectFrontendProjectType");
const detectServerProject = require("./server-code-snippets/server-helper-functions/detectServerProjectType");
//Resource, DB, Auth Functionality Import for Server Side Component
const resourceComponent = require('./server-code-snippets/server-helper-functions/resourceComponent');
const dbAndAuthComponent = require('./server-code-snippets/server-helper-functions/dbAndAuthComponent');
//Add Route to client And Update route component
const vueAddComponentAndUpdateRoute = require('./client-code-snippets/vue/scripts/updateRoute')
const reactAddComponentAndUpdateRoute = require('./client-code-snippets/react/scripts/updateRoute')
const svelteAddComponentAndUpdateRoute = require('./client-code-snippets/svelte/scripts/updateRoute')

module.exports = {
    vueViewComponent, reactViewComponent, expressServerComponent, nestServerComponent, detectFrontEndProject,
    detectServerProject, resourceComponent, dbAndAuthComponent, vueAddComponentAndUpdateRoute, reactAddComponentAndUpdateRoute,
    svelteViewComponent, svelteAddComponentAndUpdateRoute
}