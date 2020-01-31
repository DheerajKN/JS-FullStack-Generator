const pluralize = require('pluralize')

const createFileWithContent = require('./createFileAndAddContent');

module.exports.createControllerAndService = (fileDirectory, resource) => {
    createFileWithContent.createFileWithContent(`${fileDirectory}/server/src/controller/${resource}Controller.js`,
        controllerSyntax(resource, pluralize(resource)))
    createFileWithContent.createFileWithContent(`${fileDirectory}/server/src/service/${resource}Service.js`,
        serviceSyntax(resource))
}

controllerSyntax = (resource, pluralResource) => `import {Router} from 'express';
import ${resource}Service from '../service/${resource}Service';

const ${pluralResource} = Router();

${pluralResource}.get('/', ${resource}Service.all);
${pluralResource}.get('/:${resource}Id', ${resource}Service.single);

module.exports = ${pluralResource};`

serviceSyntax = (resource) => `module.exports = {
    single: (req, res) => {
        const ${resource} = req.params.${resource}Id;
        res.status(200).json({ ${resource} });
    },
    all: (req, res) => {
        res.status(200).json([{ ${resource}: "New York" },{ ${resource}: "Chicago" }]);
    }
};`