const getFileContent = require('../../frontend-helper-functions/getFileContent.js')
const createFileAndAddContent = require('../../frontend-helper-functions/updateFileContent')
const pluralize = require('pluralize')
const { join } = require('path')

module.exports = (projectDirectory, route) => {
    const mainRouterFile = join(projectDirectory, 'client', 'src', 'App.js')
    const capitalizedRoute = route.charAt(0).toUpperCase() + route.slice(1)
    getFileContent.fetchContent(mainRouterFile).then(oldContent => {
        let newContent = oldContent.replace(/import Home from (.*)/, `import Home from './components/Home.js'\nimport ${capitalizedRoute} from './components/${capitalizedRoute}.js'`);
        newContent = newContent.replace(/<Route path="\/" exact component=(.*)/, `<Route path="/${pluralize(route)}" component={${capitalizedRoute}} />
        <Route path="/" exact component={Home} />`);

        createFileAndAddContent.createFileWithContent(mainRouterFile, newContent);
        createFileAndAddContent.createFileWithContent(join(projectDirectory, 'client', 'src', 'components', `${capitalizedRoute}.js`), reactClassTemplate(capitalizedRoute))
    })

    const routingFile = join(projectDirectory, 'client', 'src', 'components', 'Home.js')
    getFileContent.fetchContent(routingFile).then(oldContent => {
        let newContent = oldContent.replace(/<Link to="\/addresses">(.*)/, `<Link to="/addresses">See More addresses</Link>{" | "}\n                <Link to="/${pluralize(route)}">${pluralize(route)}</Link>{" | "}`);
        newContent = newContent.replace(/<Route path="\/" exact component=(.*)/, `<Route path="/${pluralize(route)}" component={${capitalizedRoute}} />
        <Route path="/" exact component={Home} />`);

        createFileAndAddContent.createFileWithContent(routingFile, newContent);
    })
}

reactClassTemplate = (route) => `import React, { Component } from 'react'
import {fetchAPI} from '../api/fetchAPI';

export default class ${route} extends Component {
    render() {
        return (
            <div>
                <h1>${route}</h1>
            </div>
        )
    }
}`