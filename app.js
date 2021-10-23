const Koa = require("koa");
const KoaRouter = require("koa-router");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser"); // 引入模块
const sendFile = require("koa-sendfile");
const path = require("path");
const api = require("./service");
const app = new Koa();
const router = new KoaRouter();

// Routes
router.get(`/`, async (ctx) => {
  await sendFile(ctx, path.join(__dirname, "index.html"));
});

router.get(`/hello`, async (ctx) => {
  ctx.body = {
    message: "Hello serverless",
  };
});
router.get(`/xiaomang`, async (ctx, next) => {
  await api.getXiaomangGoodsInfo(ctx, next);
});

router.get(`/bark`, async (ctx, next) => {
  await api.pullBark(ctx, next);
});

router.get(`/jd`, async (ctx, next) => {
  await api.getJdCoupon(ctx, next);
});
router.post(`/newjd`, async (ctx, next) => {
  await api.getNewJdCoupon(ctx, next);
});
router.get(`/jdtime`, async (ctx, next) => {
  await api.getJdTime(ctx, next);
});
router.post(`/yushouToken`, async (ctx, next) => {
  await api.yushouToken(ctx, next);
});
router.post(`/yushou`, async (ctx, next) => {
  await api.yushou(ctx, next);
});
app.use(cors());
app.use(bodyParser());
app.use(router.allowedMethods()).use(router.routes());

// Web 类型云函数，只能监听 9000 端口
app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
});
