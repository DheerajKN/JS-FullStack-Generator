const pluralize = require('pluralize')

const {createFileWithContent} = require('./createFileAndAddContent');

module.exports.createControllerAndService = (fileDirectory, resource) => {
    createFileWithContent(`${fileDirectory}/server/src/controller/${resource}Controller.js`,
        controllerExpressSyntax(resource, pluralize(resource)))
    createFileWithContent(`${fileDirectory}/server/src/service/${resource}Service.js`,
        serviceExpressSyntax(resource))
}

controllerExpressSyntax = (resource, pluralResource) => `import {Router} from 'express';
import {param} from 'express-validator';

import ${resource}Service from '../service/${resource}Service';

const ${pluralResource} = Router();

${pluralResource}.get('/', ${resource}Service.all);
${pluralResource}.get('/:${resource}Id', param(["${resource}Id"]).isInt({min:1}), ${resource}Service.single);

export default ${pluralResource};`

serviceExpressSyntax = (resource) => `import {validationResult} from 'express-validator';
export default {
    single: (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const ${resource} = req.params.${resource}Id;
        return res.status(200).json({ ${resource} });
    },
    all: (req, res) => {
        return res.status(200).json([{ ${resource}: "New York" },{ ${resource}: "Chicago" }]);
    }
};`