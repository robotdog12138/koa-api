module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,//数据类型
        primaryKey: true,//主键
        allowNull: true,//not null约束
        autoIncrement: true,//自动递增
        field: "id" //映射到数据库中的名称
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "phone"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password"
      },
    },
    {
      timestamps: false,
    }
  );
};
