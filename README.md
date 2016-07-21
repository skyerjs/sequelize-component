# skyer-sequelize-component

[![npm version](https://badge.fury.io/js/skyer-sequelize-component.svg)](https://badge.fury.io/js/skyer-sequelize-component)

> Skyer sequelize component.

## Install

[![NPM](https://nodei.co/npm/skyer-sequelize-component.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/skyer-sequelize-component/)

```bash
$ npm i --save skyer-sequelize-component
```

## Register

/app/components/sequelize.component.js

```js
module.exports = require('skyer-sequelize-component');
```

Or

> Register component by config/components.js file.


## Usage

```js
const sequelize = skyer.component.get('sequelize');

const UserModel = sequelize.model('User');

console.log(sequelize.isDefined('User'));

const user = yield UserModel.create({
  name: 'jerry wu',
  organization: 'skyer-team'
});
```

## Options

See `Sequelize` [options](http://docs.sequelizejs.com/en/latest/api/sequelize/#class-sequelize)

## Example

See [skyer-example](https://github.com/skyerjs/skyer-example)

## Licences

[MIT](LICENSE)
