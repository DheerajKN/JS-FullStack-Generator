const { join } = require('path');
const { readFile } = require('fs');

module.exports = (folderDirectory) => {
    return new Promise((resolve, reject) => {
        readFile(join(folderDirectory, 'package.json'), 'utf8', (err, content) => {
            content = JSON.parse(content).dependencies;
            if (content.hasOwnProperty('vue')) {
                resolve('vue')
            } else if (content.hasOwnProperty('react')) {
                resolve('react')
            }
        })
    })
}