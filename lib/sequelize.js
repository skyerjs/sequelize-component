'use strict';

const debug = require('debug')('skyer:components:sequelize');

class SequelizeComponent extends Skyer.Component {
  constructor( options ) {
    super(options);

    this.sequelize = null;
    this.models    = null;
  }

  _defaultOptions() {
    return {
      config_key: 'sequelize',
      model_path: '',
      connection: {
        username: 'root',
        password: '',
        database: 'skyer',

        options: {
          host: 'localhost',
          port: 3306,
          dialect: 'mysql',
          dialectOptions: {
            charset: 'utf8'
          }
        }
      }
    };
  }

  _getConfig() {
    const confKey    = this.options.config_key;
    const connection = this.skyer.config.get(confKey) || {};

    return Skyer._.extend(this.options.connection, connection);
  }

  _build() {
    super._build();

    const Sequelize = require('sequelize');

    this.sequelize = new Sequelize(this.config.database, this.config.username, this.config.password, this.config.options);

    this._loadModels();
    this._bindEvents();

    return this.sequelize;
  }

  _loadModels() {
    const modelPath = this.config.model_path || this.skyer.options.model_path + '/sequelize';

    // todo: /**/*.model.js ?
    const pattern = `${modelPath}/**/*.js`;
    const files   = Skyer.glob.sync(pattern);

    files.forEach(modelFile => {
      try {
        const model = sequelize['import'](modelFile);
        this._decorateModel(model);

        this.models[model.name] = model;
      } catch ( e ) {
        debug('invalid model file:%s', modelFile);
        debug(e);
      }
    });
  }

  _decorateModel( model ) {
    model.deleteById = ( id, transaction ) => {
      const options = {
        where: { id: id },
        limit: 1,
        transaction
      };

      return model.destroy(options);
    };

    model.updateById = ( id, values, transaction ) => {
      const options = {
        where: { id: id },
        limit: 1,
        transaction
      };

      return model.update(values, options);
    };
  }

  _bindEvents() {
    // todo:
  }

  shutdown() {
    super.shutdown();

    if ( this.sequelize ) {
      this.sequelize.close && this.sequelize.close();
    }
  }
}

module.exports = SequelizeComponent;
