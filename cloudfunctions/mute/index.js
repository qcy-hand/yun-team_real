// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "cloundteam-zngfx" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.type === 0){
    return await db.collection('counters').where({
      openid: wxContext.OPENID,
      mute: 1
    }).get()
  }
  if (event.type === 1) {
    return await db.collection('counters').where({
      nickName: event.nickName
    }).update({
      data: {
        mute: 1,
        mutetime: 1,
        now: event.now
      }
    })
  }
  if (event.type === 2) {
    return await db.collection('counters').where({
      nickName: event.nickName,
    }).update({
      data: {
        mute: 1,
        mutetime: 2,
        now: event.now
      }
    })
  }
  if (event.type === 3) {
    return await db.collection('counters').where({
      nickName: event.nickName,
    }).update({
      data: {
        mute: 1,
        mutetime: 3,
        now: event.now
      }
    })
  }
  if (event.type === 4) {
    return await db.collection('counters').where({
      openid: event.openid,
    }).update({
      data: {
        mute: 0
      }
    })
  }
  if (event.type === 5) {
    return await db.collection('counters').where({
      openid: wxContext.OPENID,
    }).update({
      data: {
        mute: 0
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