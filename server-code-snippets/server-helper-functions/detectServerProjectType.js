const { join } = require('path');
const { readFile } = require('fs');
const { backendFrameworks } = require('../../supportedTypes')

module.exports = (folderDirectory) => {
    return new Promise((resolve, reject) => {
        readFile(join(folderDirectory, 'package.json'), 'utf8', (err, content) => {
            content = JSON.parse(content).dependencies;
            if (content.hasOwnProperty('express')) {
                resolve(backendFrameworks.EXPRESS)
            } else if (content.hasOwnProperty('@nestjs/common')) {
                resolve(backendFrameworks.NEST)
            }
        })
    })
}