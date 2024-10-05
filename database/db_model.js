import { Sequelize, DataTypes } from 'sequelize'

class dbModel {
  constructor(db_config) {
    if(db_config.sequelize == undefined) {
      this.sequelize = new Sequelize(db_config.name, db_config.username, db_config.pass, {
        host: db_config.hostname,
        dialect: 'mysql',
        logging: false // log
      });
    }else {
        /**
        * @type {Sequelize}
        */
      this.sequelize = db_config.sequelize
    }
  }

  async init() {

    // Table: spna_verifying 
    this.spna_verifying = this.sequelize.define('spna_verifying', {
      number: {type: DataTypes.STRING},
      code: {type: DataTypes.STRING},
      device_id: {type: DataTypes.STRING, unique: true},
      ban_lvl: {type: DataTypes.INTEGER},
      createdAt: {type: DataTypes.BIGINT, allowNull: false}, 
    }, {
      timestamps: false
    });

    // Use the following command to create tables once : 
    await this.sequelize.sync({ force: false });  // update change db
  }

}




export default dbModel