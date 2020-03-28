# JS-FullStack-Generator

Simple Full Stack Project Generator based on ES6 syntax for both front-end and back-end that creates

    Model and Controller Part handled by Backend written on JS with Express and TS using Nest

    and

    Seperate View Component using React and Vue powered by Webpack through --view flag

    Along with creating MERN and MEVN etc.. stacks it has css precompilers through --style flag

## Initial Setup

> After cloning the project. Execute `npm i && npm link`

## Usage Default

    [directory-where-you-want-create-boilerplate] $ js-fullStack <project-name>

## Usage customizable

    [directory-where-you-want-create-boilerplate] $ js-fullStack <project-name> --style=scss --view=vue --server=nest

## Arguements during creation

- Style [Supported]: CSS [Default], SASS, SCSS, LESS
- View [Supported]: React.js [Default], Vue.js
- Server [Supported]: Express.js [Default], Nest.js

## Functionalities that can be used after creation

- --resource: This would create an entry in routes/index.js and create subsequent controller and service files.

> [inside-folder-where-boilerplate-is-created] \$ js-fullStack --resource=phone

- --route: This would create an entry in router and create file along with mapping based on file type in client/src.

> [inside-folder-where-boilerplate-is-created] \$ js-fullStack --route=phone

- --db: This would download mongoose and create initial setup files for connection with database along with sample user table with validation fields

> [directory-where-you-want-create-boilerplate] \$ js-fullStack <project-name> --db

- --auth: This would automatically create config files for authentication using JWT and uses created User table fields

> [directory-where-you-want-create-boilerplate] \$ js-fullStack <project-name> --db --auth

## NPM Commands

- Development: `npm start` that runs view Component on webpack-dev-server for live reload and hot reload functionality in 3000 along with Electron App and Express at 8080
- Production: `npm run build` that runs view Component on Express Server at 8080
- Electron: Electron app will run along side react on dev mode but on Production it requires seperate command to execute `npm run build:electron`

## Considerations

- If you want to dispatch electron apps across MacOS, Windows, Linux go to `package.json` and update `build:electron` to `webpack --env.ELECTRON_PROD=true --mode production && electron-builder -mwl` and remember MacOS is possible with current executed OS is of Mac.
- If you had to run `npm run build:electron` and `npm run build` it is advisable to follow this procedure:
  - Open terminal execute: `npm run build:electron` and after it is completed delete the terminal, open new one and execute this: `npm run build` as there is `permission execute issue` occuring after `npm build:client`
- If facing with `process cannot access the file` just close the ide, open it and delete build and dist folders and run the prev. command again.

## Require Community's help

- Also electron-builder providing only platform-specific build rather than building apps across Operating Systems.
- Also building webpack-test enviroment with some sample cases for React and Vue.

## Further Development

- Nest.js Server options for --auth (combined with mongo user)
- Better Support for PWA for all frontend frameworks