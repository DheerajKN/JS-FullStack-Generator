const { join } = require('path');
const { readFile } = require('fs');
const { frontendFrameworks } = require('../../supportedTypes')

module.exports = (folderDirectory) => {
    return new Promise((resolve, reject) => {
        readFile(join(folderDirectory, 'package.json'), 'utf8', (err, content) => {
            if (err) {
                reject(err)
            } else {
                content = JSON.parse(content).dependencies;
                if (content.hasOwnProperty('vue')) {
                    resolve(frontendFrameworks.VUE)
                } else if (content.hasOwnProperty('react')) {
                    resolve(frontendFrameworks.REACT)
                } else if (content.hasOwnProperty('svelte')) {
                    resolve(frontendFrameworks.SVELTE)
                }
            }
        })
    })
}