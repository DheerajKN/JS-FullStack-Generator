const fs = require('fs');

module.exports.fetchContent = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, oldContent) => {
            if (err) reject(err)
            resolve(oldContent);
        })
    })
}