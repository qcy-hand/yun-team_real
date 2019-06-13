// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "teamtest-q4g25" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  return await db.collection('counters').add({//向数据库添加缓存数据
    data: {
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      openid: wxContext.OPENID,
    }
  })
}