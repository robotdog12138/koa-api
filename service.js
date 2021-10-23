var https = require("https");
let co = require("co"); //异步控制器
let qs = require("querystring");
const bent = require("bent");
const ys = require("./yushoujintie");
/**获取小芒商品基本信息 */
let getXiaomangGoodsInfo = async (ctx, next) => {
  let request = ctx.request;
  //let req_body = request.body;//从请求body中获取参数
  let req_query = request.query;
  if (!req_query.id) {
    ctx.body = { result: false, data: "请传入参数" };
    return;
  }
  //let postdata = JSON.stringify(req_body);//转换成字符串
  var content = "";
  var body_request = {
    hostname: "mgecom.api.mgtv.com",
    path:
      "/goods/info?goods_id=" +
      req_query.id +
      "&jd_province=&jd_city=&area_switch=0&preview=0",
    port: 443,
    method: "get",
    headers: {
      //"Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      //'Content-Length': Buffer.byteLength(postdata)//填写数据长度
    },
  };

  /***请求第三方接口***/
  function sendHttpRequest() {
    /*****创建promise函数****/
    return new Promise(function (resolve, reject) {
      /*****正常的发请求****/
      var req = https.request(body_request, (res) => {
        /*****设置编码****/
        res.setEncoding("utf-8");
        /*****合并返回数据****/
        res.on("data", (chunk) => {
          content += chunk;
        });
        /*****数据获取完成后 resolve提交****/
        res.on("end", () => {
          resolve({ result: true, data: content });
        });
      });
      /*****发送请求体*****/
      //req.write(postdata);
      /*****异常处理*****/
      req.on("error", function (err) {
        resolve({ result: false, errmsg: err.message });
      });
      /*****结束请求*****/
      req.end();
    });
  }

  let res = await co(function* () {
    //使用生成器函数并且掉用请求 res保存返回内容
    let req_res = yield sendHttpRequest();
    /**********/
    //todo
    /**********/
    return req_res;
  });
  /*****把接口返回的数据发送给前端*****/
  ctx.body = res;
  console.log(res);
};
/**发送bark推送 */
let pullBark = async (ctx, next) => {
  let request = ctx.request;
  //let req_body = request.body;//从请求body中获取参数
  let req_query = request.query;
  if (!req_query.token) {
    ctx.body = { result: false, data: "请传入Bark token" };
    return;
  }
  if (!req_query.title) {
    ctx.body = { result: false, data: "请传入Bark title" };
    return;
  }
  if (!req_query.content) {
    ctx.body = { result: false, data: "请传入Bark content" };
    return;
  }
  let postdata = JSON.stringify({
    title: req_query.title,
    body: req_query.content,
  }); //转换成字符串
  console.log(postdata);
  var content = "";
  var body_request = {
    hostname: "api.day.app",
    path: "/" + req_query.token,
    port: 443,
    method: "get",
    headers: {
      //"Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Content-Length": Buffer.byteLength(postdata), //填写数据长度
    },
  };

  /***请求第三方接口***/
  function sendHttpRequest() {
    /*****创建promise函数****/
    return new Promise(function (resolve, reject) {
      /*****正常的发请求****/
      var req = https.request(body_request, (res) => {
        /*****设置编码****/
        res.setEncoding("utf-8");
        /*****合并返回数据****/
        res.on("data", (chunk) => {
          content += chunk;
        });
        /*****数据获取完成后 resolve提交****/
        res.on("end", () => {
          resolve({ result: true, data: content });
        });
      });
      console.log(req);
      /*****发送请求体*****/
      req.write(postdata);
      /*****异常处理*****/
      req.on("error", function (err) {
        resolve({ result: false, errmsg: err.message });
      });
      /*****结束请求*****/
      req.end();
    });
  }

  let res = await co(function* () {
    //使用生成器函数并且掉用请求 res保存返回内容
    let req_res = yield sendHttpRequest();
    /**********/
    //todo
    /**********/
    return req_res;
  });
  /*****把接口返回的数据发送给前端*****/
  ctx.body = res;
  console.log(res);
};

/**领取jd */
let getJdCoupon = async (ctx, next) => {
  let request = ctx.request;
  //let req_body = request.body;//从请求body中获取参数
  let req_query = request.query;
  if (!req_query.key) {
    ctx.body = { result: false, data: "请传入key" };
    return;
  }
  if (!req_query.roleId) {
    ctx.body = { result: false, data: "请传入roleId" };
    return;
  }
  let postdata = JSON.stringify({}); //转换成字符串
  console.log(postdata);
  var content = "";
  var body_request = {
    hostname: "api.m.jd.com",
    path:
      '/client.action?functionId=newBabelAwardCollection&client=wh5&body={"activityId":"2QwmJao59JSGzjWtEWsT5zgxk291","scene":1,"args":"key=' +
      req_query.key +
      ",roleId=" +
      req_query.roleId +
      ',strengthenKey=C225838DC1351F9ACA8548E3171FF8A4A79652C3B40AA10EA6208B56F12A9AF708B8A2FA5F5B50B95A49BC155D64D3A4_babel"}',
    port: 443,
    method: "get",
    headers: {
      //"Accept": "application/json",
      "Content-Type": "text/html;charset=UTF-8",
      cookie:
        '__jdu=16303812703771854567980; shshshfpa=511a34c1-79f4-a8fd-602c-3197eb410524-1630381272; shshshfpb=g0JXQWFri3R3CcgkcbuzjdA%3D%3D; jcap_dvzw_fp=MZ1StCi3jLUxWO8IWTbmryL0hJV-k1G5FMveWnBCSQXdnJ5XbF_37I3NSAU0JBbOlTxvMg==; whwswswws=; user-key=3970f774-48af-46bd-bbb5-083e3c0b4316; warehistory="100021263758,"; pinId=WUWezK8NyRdIejjTVegY0A; pin=18790576744; unick=%E9%A3%8E%E5%B0%98%E5%B7%B2%E8%BD%A9; _tp=99Bd2Mk%2BK43%2FwVOOZysAcQ%3D%3D; _pst=18790576744; ipLocation=%u6cb3%u5357; cn=17; autoOpenApp_downCloseDate_auto=1633488909271_1800000; unpl=V2_ZzNtbUBfS0B2XEQEekoPBWIKF19KUxFGc1hGAXIQW1c0AxdVclRCFnUURlVnGFsUZwcZXkRcQBJFCEdkexhdBGYKGlRKVXMVcQ8oVRUZVQAJbUZZSldLHHEJQAcrGVtQMgMibUFXcxRFCEFWehtVBWQFE19EUUMccQ1CU30RVQRXMxJVRmdDFHQJR1x%2bH1UMYgYiiuv5lZnT3P%2f%2brKveNWMFEVtGVkIUdjhHZHopCmtnAhNcQ1ZFEnAKC1R8G10HbgMRW0NVRRN1AUJRfx5aDW4CIlxyVA%3d%3d; __jdv=122270672|www.linkstars.com|t_1000089893_156_0_184__e59198507ba16dd1|tuiguang|399d2e3a0bb1484395cb7a1d886cb149|1633505247600; areaId=1; ipLoc-djd=1-72-55653-0; shshshfp=38e909b82dcadec46600e2cef24d7536; PCSYCityID=CN_110000_110100_0; CNZZDATA1256793290=1005715857-1631680441-%7C1633751979; TrackID=1RAQtozR9-d0ECauuNN1L2APJq6PWMa9YG-sJtS-WZ4TI5x-1XFlWq9HW_6S6G23VA4wkEyAA9DjhM_muIkmo34ZGSRip06yhCIcFJtU5sNs; thor=1C5B2CC7B26A34612C11F98D482FCA1E20B4376B3807F034ACF6BEF628DCCEBA0FAD1A47C0A213BA430B70A2AD12B93BC43536B7360925FE31D2F7589BF5B3590C01E23529747C42E77DE91603CE9358E2472536E70A22CE5F56E1B38848E7C5D2958950106831A1C55C916CF0F0B031762FC6B479D66D46E8983A99DBF96DDE19D701BE853E19C49D2B79C1A43588C4; ceshi3.com=201; __jda=76161171.16303812703771854567980.1630381270.1633684479.1633759665.39; __jdb=76161171.5.16303812703771854567980|39.1633759665; __jdc=76161171; shshshsID=53f4d8f8877fcdd29073f6dcdf615fc9_3_1633759721973; 3AB9D23F7A4B3C9B=7TYG542RUFXKX4P2HWAJEJMLAVZENY4Q4HQNM34LBSKQRZLSJQZ3QSDKCLC34NJAT5BOSUF33VZT6AMQ45V7BGIMLQ; UM_distinctid=17c63ab39e39e-0aefb10c40aa9-b7a1b38-1fa400-17c63ab39e4ad7',
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
      //'Content-Length': Buffer.byteLength(postdata)//填写数据长度
    },
  };

  /***请求第三方接口***/
  function sendHttpRequest() {
    /*****创建promise函数****/
    return new Promise(function (resolve, reject) {
      /*****正常的发请求****/
      var req = https.request(body_request, (res) => {
        /*****设置编码****/
        res.setEncoding("utf-8");
        /*****合并返回数据****/
        res.on("data", (chunk) => {
          content += chunk;
        });
        /*****数据获取完成后 resolve提交****/
        res.on("end", () => {
          resolve({ result: true, data: content });
        });
      });
      console.log(req);
      /*****发送请求体*****/
      req.write(postdata);
      /*****异常处理*****/
      req.on("error", function (err) {
        resolve({ result: false, errmsg: err.message });
      });
      /*****结束请求*****/
      req.end();
    });
  }

  let res = await co(function* () {
    //使用生成器函数并且掉用请求 res保存返回内容
    let req_res = yield sendHttpRequest();
    /**********/
    //todo
    /**********/
    return req_res;
  });
  /*****把接口返回的数据发送给前端*****/
  ctx.body = res;
  console.log(res);
};
/**领取jd */
let getJdTime = async (ctx, next) => {
  //let request = ctx.request;
  //let req_body = request.body;//从请求body中获取参数
  const get = bent("GET", "json", 200, {
    "Content-Type": "text/html;charset=UTF-8",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
  });
  const res = await get(
    "https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5"
  );
  /*****把接口返回的数据发送给前端*****/
  ctx.body = res;
  console.log(res);
};

/**领取jd */
let getNewJdCoupon = async (ctx, next) => {
  let request = ctx.request;
  let req_body = request.body; //从请求body中获取参数
  if (!req_body.url) {
    ctx.body = { result: false, data: "请传入网址" };
    return;
  }
  if (!req_body.ck) {
    ctx.body = { result: false, data: "请传入ck" };
    return;
  }
  if (req_body.ck == "pre-start-up") {
    ctx.body = { result: true, data: "pre-start-up is already" };
    return;
  }
  const post = bent("GET", "json", 200, {
    //"Accept": "application/json",
    "Content-Type": "text/html;charset=UTF-8",
    cookie: req_body.ck,
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
    //'Content-Length': Buffer.byteLength(postdata)//填写数据长度
  });
  const res = await post(req_body.url);

  /*****把接口返回的数据发送给前端*****/
  ctx.body = res;
  console.log(res);
};

/**领取jd */
let yushouToken = async (ctx, next) => {
  let request = ctx.request;
  let req_body = request.body; //从请求body中获取参数
  if (!req_body.ck) {
    ctx.body = { result: false, data: "请传入ck" };
    return;
  }
  try {
    const res = await ys.JdYushou(req_body.ck);
    console.log(res,'res')
    ctx.body = res;
  } catch (error) {
    ctx.body = error;
    console.log(error,'error')
  }
};
/**领取jd */
let yushou = async (ctx, next) => {
  let request = ctx.request;
  let req_body = request.body; //从请求body中获取参数
  if (!req_body.token) {
    ctx.body = { result: false, data: "请传入token" };
    return;
  }
  if (!req_body.url) {
    ctx.body = { result: false, data: "请传入url" };
    return;
  }
  try {
    const res = await ys.getJdCoupon(req_body.token,req_body.url);
    ctx.body = res;
  } catch (error) {
    ctx.body = error;
  }
};
module.exports = {
  getXiaomangGoodsInfo,
  pullBark,
  getJdCoupon,
  getNewJdCoupon,
  getJdTime,
  yushouToken,
  yushou,
};
