// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "cloundteam-zngfx" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('counters').where({
    openid: wxContext.OPENID,
    admin: 1
  }).get()
}