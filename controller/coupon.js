const db = require("../config/db");
const Sequelize = db.sequelize;
const DataTypes = db.DataTypes;
const coupon = require("../models/coupon")(Sequelize, DataTypes);
//coupon.sync({ force: true });
class couponModule {
  static async couponCeate(data) {
    return await coupon.create({
      name: data.label,
      url: data.value,
      type:data.type
    });
  }
  static async getCouponByValue(value) {
    return await coupon.findOne({
      where: {
        url: value,
      },
    });
  }
  static async getCouponList() {
    return await coupon.findAll();
  }
  static async removeCoupon(id) {
    return await coupon.destroy({
      where: {
        id: id,
      },
    });
  }
}
class couponController {
  static async create(ctx) {
    console.log(ctx);
    const req = ctx.request.body;
    if (req.value && req.label) {
      try {
        const query = await couponModule.getCouponByValue(req.value);
        if (query) {
          ctx.response.status = 200;
          return (ctx.body = {
            code: -1,
            desc: "优惠券已存在",
            result: false,
          });
        } else {
          const param = {
            label: req.label,
            value: req.value,
            type:req.type
          };
          const data = await couponModule.couponCeate(param);
          ctx.response.status = 200;
          return (ctx.body = {
            code: 0,
            desc: "添加成功",
            result: true,
          });
        }
      } catch (error) {
        ctx.response.status = 403;
        return (ctx.body = {
          code: -1,
          desc: "请正确传入参数",
          result: false,
        });
      }
    }
  }
  static async getCouponList(ctx) {
    const req = ctx.request.body;
    const list = await couponModule.getCouponList();
    ctx.response.status = 200;
    return (ctx.body = {
      code: 0,
      data: list,
      desc: "获取成功",
      result: true,
    });
  }
  static async remove(ctx) {
    const req = ctx.request.body;
    if (req.id) {
      try {
        const query = await couponModule.removeCoupon(req.id);
        if (query) {
          ctx.response.status = 200;
          return (ctx.body = {
            code: 0,
            desc: "删除成功",
            result: true,
          });
        } else {
          ctx.response.status = 200;
          return (ctx.body = {
            code: -1,
            desc: "删除失败",
            result: true,
          });
        }
      } catch (error) {
        ctx.response.status = 403;
        return (ctx.body = {
          code: -1,
          desc: "请正确传入参数",
          result: false,
        });
      }
    }
  }
}
module.exports = couponController;
