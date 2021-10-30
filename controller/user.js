const db = require("../config/db");
const Sequelize = db.sequelize;
const DataTypes = db.DataTypes;
const user = require("../module/user")(Sequelize, DataTypes);
//user.sync({ force: true });
class userModule {
  static async userRegist(data) {
    return await user.create({
      password: data.password,
      mobileNo: data.mobileNo,
    });
  }
  static async getUserInfo(mobileNo) {
    return await user.findOne({
      where: {
        mobileNo,
      },
    });
  }
}
class userController {
  static async create(ctx) {
    const req = ctx.request.body;
    if (req.mobileNo && req.password) {
      try {
        const query = await userModule.getUserInfo(req.mobileNo);
        if (query) {
          ctx.response.status = 200;
          return ctx.body = {
            code: -1,
            desc: "用户名已存在",
            result: false,
          };
        } else {
          const param = {
            password: req.password,
            mobileNo: req.mobileNo,
            userName: req.mobileNo,
          };
          const data = await userModule.userRegist(param);
          ctx.response.status = 200;
          return ctx.body = {
            code: 0,
            desc: "注册成功",
            result: true,
          };
        }
      } catch (error) {
        ctx.response.status = 403;
        return ctx.body = {
          code: -1,
          desc: "请正确传入参数",
          result: false,
        };
      }
    }
  }
}
module.exports = userController;
