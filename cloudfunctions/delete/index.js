// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "teamtest-q4g25"
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('datas').where({
      _id: event.delid,
     
    }).remove()
  } catch(e) {
    console.error(e)
  }
}