const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

module.exports.createFileWithContent = (filePath, content) => {
    mkdirp(getDirName(filePath)).then((err) => {
        if (err) console.log(err);
        fs.writeFile(filePath, content, (err) => {
            if (err) throw err;
        })
    })

}