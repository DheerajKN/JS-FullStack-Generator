# Express-View-Generator

Simple Express ES7 generator that creates

    Model and Controller Part via Express Directly

    and

    Seperate View Component using React and Vue powered by Webpack through --view flag

    Along with creating MERN and MEVN stacks with has css precompiler through --style flag

## Usage

    [directory-where-you-want-create-boilerplate] $ node express-view-generator/index.js <project-name> --style=scss --view=react

## Arguements during creation

- Style [Supported]: CSS, SASS, SCSS, LESS
- View [Supported]: React.js, Vue.js

## Functionalities that can be used after creation

- --resource: This would create an entry in routes/index.js and create subsequent controller and service files.

> [inside-folder-where-boilerplate-is-created] \$ node express-view-generator/index.js --resource=phone

- --route: This would create an entry in router and create file along with mapping based on file type in client/src.

> [inside-folder-where-boilerplate-is-created] \$ node express-view-generator/index.js --route=phone

## NPM Commands

- Development: `npm start` that runs view Component on webpack-dev-server for live reload and hot reload functionality in 3000 along with Express at 8080
- Production: `npm run build` that runs view Component on Express Server at 8080

## Other Functionality (in development)

- --db: This would download mongoose and create initial setup files for connection with database along with sample user table with validation fields

> [directory-where-you-want-create-boilerplate] \$ node express-view-generator/index.js <project-name> --db

- --auth: This would automatically create config files for authentication using JWT and uses created User table fields

> [directory-where-you-want-create-boilerplate] \$ node express-view-generator/index.js <project-name> --db --auth
