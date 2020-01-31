const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

module.exports.createFileWithContent = (filePath, content) => {
    fs.writeFile(filePath, content, (err) => {
        if (err) throw err;
    })
}