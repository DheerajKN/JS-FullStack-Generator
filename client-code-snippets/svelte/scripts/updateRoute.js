const getFileContent = require("../../frontend-helper-functions/getFileContent.js");
const createFileAndAddContent = require("../../frontend-helper-functions/updateFileContent");
const pluralize = require("pluralize");
const { join } = require("path");

module.exports = (projectDirectory, route) => {
  const mainRouterFile = join(
    projectDirectory,
    "client",
    "src",
    "routes.js"
  );
  const capitalizedRoute = route.charAt(0).toUpperCase() + route.slice(1);
  getFileContent.fetchContent(mainRouterFile).then(oldContent => {
    let newContent = oldContent.replace(
      /export default (.*)/,
      `import ${capitalizedRoute} from "./components/${capitalizedRoute}.svelte";
export default [\n  {
    path: "/${pluralize(route)}",
    name: "${capitalizedRoute}",
    component: ${capitalizedRoute}
  },`
    );
    createFileAndAddContent.createFileWithContent(mainRouterFile, newContent);
    createFileAndAddContent.createFileWithContent(
      join(
        projectDirectory,
        "client",
        "src",
        "components",
        `${capitalizedRoute}.svelte`
      ),
      svelteTemplate(capitalizedRoute)
    );

    const routingFile = join(projectDirectory, 'client', 'src', 'components', 'Home.svelte')
    getFileContent.fetchContent(routingFile).then(oldContent => {
      let capitalizedPluralRoute = pluralize(route).charAt(0).toUpperCase() + pluralize(route).slice(1)
      let newContent = oldContent.replace(/<\/RouterLink>/, `</RouterLink> |\n<RouterLink to="/${pluralize(route)}">${capitalizedPluralRoute}</RouterLink>`);

      createFileAndAddContent.createFileWithContent(routingFile, newContent);
    })
  });
};

svelteTemplate = route => `<h1>This is the ${route} Page</h1>`;