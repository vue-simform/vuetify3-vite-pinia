![Logo](https://www.simform.com/wp-content/uploads/2022/12/logo.svg)

# Vue 3 + Vuetify 3 + Vite + Pinia Boilerplate

This boilerplate is starting point of any project that uses Vuetify, Pinia and Vite with all batteries included. you can directly start development without spending time on project setup.

The stack of this boilerplate is focused on web app front end, therefore I’ll keep it simple and mainly focuses on following technologies - Vue 3, Vuetify 3, Vite, Pinia

# Things to update before start

- update readme file to remove/add project related documenation.
- update `name` key in `package.json` file
- update git remote using `git remote set-url origin new.git.url/here` command
- [Demo](#demo) section from this file
- remove unnecessary files.

## Tech Stack

**Client:** [Vue3](https://vuejs.org/), [Javascript](https://www.javascript.com/), [Vite](https://vitejs.dev/), [Vuetify3](https://vuetifyjs.com/en/),  [Vue router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/)

**Code Formatter** [Eslint](https://eslint.org/)

## Documentation

### Project Setup

`Clone URL : https://github.com/trishant-kumar/vuetify3-boilerplate.git`

Clone repo using HTTP or SSH method.

To use SSH method, please [Follow this tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

To use HTTP method, developer has to pass username in git clone url like this `https://{username}@github.com:trishant-kumar/vuetify3-boilerplate.git`
It will promte for application password that you can generate from [here](https://github.com/settings/tokens)

run `npm i` command

copy `.env.example` to `.env`. update `.env` file variables. make sure in this process you don't rename/delete `.env.example` file.

run `npm run dev` command to start development server.

### Other useful scripts

- `npm run build` to build a project
- `npm run preview` to run build preview
- `npm run lint` to check linting issues
- `npm run lint:fix` to fix linting issues

## Demo

Demo - https://6476cdb27536585724735df7--funny-moonbeam-1a79ab.netlify.app/

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
