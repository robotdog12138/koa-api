"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coupon.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true,//主键 
      },
      url: {
        type: DataTypes.TEXT
      },
      name: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      modelName: "coupon",
    }
  );
  return coupon;
};
