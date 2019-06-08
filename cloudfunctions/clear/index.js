// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "teamtest-q4g25" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command
  if(event.radio === '1'){
    return await db.collection('datas').where({
      Timestamp: _.lte(event.date - 604800000)
    }).remove()
  }
  if(event.radio === '2'){
    return await db.collection('datas').where({
      Timestamp: _.lte(event.date - 1296000000)
    }).remove()
  }
  if(event.radio === '3'){
    return await db.collection('datas').where({
      Timestamp: _.lte(event.date - 2592000000)
    }).remove()
  }

}