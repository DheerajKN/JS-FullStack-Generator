const {createFileWithContent} = require('../../express/scripts/createFileAndAddContent')
const shell = require('shelljs')
const fs = require('fs');

module.exports.addDBComponent = (folderDirectory, tableName) => {
    shell.exec('npm i mongoose @nestjs/mongoose && npm i -D @types/express && npx nest g mo user && npx nest g co user --no-spec && npx nest g s user --no-spec', () => {
        let processFile = `${folderDirectory}/server/src/app.module.ts`
        if (fs.existsSync(processFile)) {
            fs.readFile(processFile, 'utf8', (err, oldContent) => {
                let newContent = oldContent.replace(/@Module\({(.|\n)*imports: \[/g, `import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/${tableName}'),`);
                fs.writeFile(processFile, newContent, (err) => {
                    if (err) throw err;
                })
            })
        const userSchema = `import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        // validate: [validateEmail, 'Please fill a valid email address'],
        match: [
            /^[A-Za-z0-9.+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}$/,
            'Please fill a valid email address',
        ],
    },
    password: {
        type: String,
        required: true,
    },
});`

        createFileWithContent(folderDirectory + '/server/src/user/user.schema.ts', userSchema)

        let processedFile = `${folderDirectory}/server/src/user/user.module.ts`
        if (fs.existsSync(processedFile)) {
            fs.readFile(processedFile, 'utf8', (err, oldContent) => {
                let newContent = oldContent.replace(/@Module\({/g, `import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],`);
                    fs.writeFile(processedFile, newContent, (err) => {
                        if (err) throw err;
                    })
                })
            }
        }
    })
}