const { exec } = require('shelljs')
const {createFileWithContent} = require('../../express/scripts/createFileAndAddContent');

module.exports.createControllerAndService = (fileDirectory, resource) => {
    exec(`cd server/src/ && npx nest g mo ${resource} && npx nest g co ${resource} --no-spec && npx nest g s ${resource} --no-spec && cd ../..`);

    const capitalizedResource = resource.charAt(0).toUpperCase() + resource.slice(1)

    createFileWithContent(`${fileDirectory}/server/src/${resource}/${resource}.controller.ts`,
        controllerNestSyntax(resource, capitalizedResource))
    createFileWithContent(`${fileDirectory}/server/src/${resource}/${resource}.service.ts`,
        serviceNestSyntax(resource, capitalizedResource))
}

controllerNestSyntax = (resource, capitalizedResource) => `import { Controller, Get, Param } from "@nestjs/common";
import { ${capitalizedResource}Service } from './${resource}.service'

@Controller('${resource}')
export class ${capitalizedResource}Controller {
    constructor(private readonly ${resource}Service: ${capitalizedResource}Service) {}
    
      @Get(':id')
      getSingular(@Param() id: string): any {
        return this.${resource}Service.getSingular(id);
      }

      @Get()
      getAll(): any {
        return this.${resource}Service.getAll();
      }
}`

serviceNestSyntax = (resource, capitalizedResource) => `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${capitalizedResource}Service {
    getSingular(${resource}: string): any {
        return { ${resource} };
    }

    getAll(): any {
        return [{ ${resource}: "New York" },{ ${resource}: "Chicago" }];
    }
}`