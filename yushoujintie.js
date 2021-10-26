const bent = require("bent");
const JD_API_HOST = "https://www.kmg-jd.com/api";
let appId = null;
let lkToken = null;
let authorization = null;
async function JdYushou(ck) {
  try {
    await getActiveInfo();
    await getToken(ck);
    return { result: true, data: authorization };
  } catch (error) {
    return error;
  }
}
async function getActiveInfo() {
  const get = bent("GET", "string", 200, {
    Accept: "application/json",
    "Content-Type": "text/html;charset=UTF-8",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    //'Content-Length': Buffer.byteLength(postdata)//填写数据长度
  });

  return new Promise(async function (resolve, reject) {
    try {
      const res = await get(
        "https://prodev.m.jd.com/mall/active/3QvpPkepEuB5hRgtQvWJ2bjRTCA8/index.html"
      );
      /*****把接口返回的数据发送给前端*****/
      const data = JSON.parse(
        res &&
          res.match(/window\.performance.mark\(e\)}}\((.*)\);<\/script>/)[1]
      );
      for (let key of Object.keys(data.codeFloors)) {
        let vo = data.codeFloors[key];
        if (vo.boardParams && vo.boardParams.appId) {
          appId = vo.boardParams.appId;
        }
      }
      resolve();
      console.log('getActiveInfo','success')
    } catch (error) {
      console.log('getActiveInfo',error)
      reject({ result: false, error: error });
    }
  });
}
async function getToken(ck) {
  const post = bent("POST", "string",200, {
    Host: "jdjoy.jd.com",
    Accept: "application/json, text/javascript, */*; q=0.01",
    Origin: "https://jdjoy.jd.com",
    Referer: "https://jdjoy.jd.com/",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-type":"application/json; charset=utf-8",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
    "Accept-Language": "zh-CN,zh-Hans;q=0.8",
    Cookie:ck,
  });

  return new Promise(async function (resolve, reject){
    try {
      const res = await post(
        `https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=${appId}`
      );
      let data = JSON.parse(res);
      if (data.success) {
        lkToken = data.data.lkToken;
        await verify(lkToken,ck);
        resolve();
      }else{
        reject({ result: false, error: data });
      }
      console.log('getToken','success')
    } catch (error) {
      console.log('getToken','error')
      reject({ result: false,errorMsg: '获取token失败，请稍等会再试~' });
    }
  });
}
function taskUrl(functionId, body, authorization,ck) {
  return {
    url: `${JD_API_HOST}/${functionId}`,
    body: JSON.stringify(body),
    headers: {
      Host: "www.kmg-jd.com",
      Accept: "application/json, text/plain, */*",
      Origin: "https://www.kmg-jd.com",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: authorization ? authorization : "null",
      Referer: "https://www.kmg-jd.com/presaleGift/index.html",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
      "Accept-Encoding": "gzip, deflate, br",
      Cookie:ck?ck:"",
    },
  };
}
function verify(lkToken,ck) {
  let bentUrl = taskUrl(`user/verify`, {
    parameters: { userId: "", lkToken: lkToken, username: "sdfas" },
  },null,ck);
  const post = bent("POST", "string",200, bentUrl.headers);

  return new Promise(async function (resolve,reject) {
    try {
      const res = await post(bentUrl.url, bentUrl.body);
      let data = JSON.parse(res);
      if (data.code === 200) {
        authorization = data.token;
        resolve()
      } else{
        reject({ result: false, error: data });
        console.log(`活动太火爆了，还是去买买买吧！！！`);
      }
    } catch (error) {
      reject({ result: false, error: error });
    }
  });
}
function getJdCoupon(authorization,url) {
  let bentUrl = taskUrl(
    `presaleGift/getCoupon`,
    {
      attributes: {
        activeId: "presaleGiftD9gBzawG",
        joinId: "1451224659812835330",
        lotteryForm: url,
      },
    },
    authorization,
    null
  );
  const post = bent("POST", "string", 200,bentUrl.headers);
  return new Promise(async function (resolve,reject) {
    try {
      const res = await post(bentUrl.url, bentUrl.body);
      let data = JSON.parse(res);
      resolve({result: true, data: data})
    } catch (error) {
      reject({ result: false, error: error });
    } 
  });
}
module.exports = {
  JdYushou,
  getJdCoupon,
};
