// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "teamtest-q4g25" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.authorize === 1) {
    return await db.collection('counters').where({
      nickName: event.nickName
    }).update({
      data: {
        admin: 1
      }
    })
  }
  if (event.authorize === 0) {
    return await db.collection('counters').where({
      nickName: event.nickName,
      admin: 1
    }).update({
      data: {
        admin: 0
      }
    })
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}