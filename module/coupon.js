module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "coupon",
    {
      id: {
        type: DataTypes.UUID,//数据类型
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true,//主键
        //allowNull: true,//not null约束
        //autoIncrement: true,//自动递增
        
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "url"
      },
      label: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name"
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "type",
        defaultValue:'api'
      },
    },
    {
      timestamps: false,
    }
  );
};
