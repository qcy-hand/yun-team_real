// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "cloundteam-zngfx" })
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.find === 1){
    return await db.collection('notice').where({
      _id: "96561f06-6463-448c-9b60-5dcf484a14c0"
    }).update({
      data: {
        showNotice: event.showNotice
      }
    })
  }
  if(event.find === 2){
    console.log(event.text)
    return await db.collection('notice').where({
      _id: "96561f06-6463-448c-9b60-5dcf484a14c0"
    }).update({
      data: {
        text: event.text
      }
    })
  }
  if(event.find === 3){
    return await db.collection('notice').where({
      _id: "96561f06-6463-448c-9b60-5dcf484a14c0"
    }).get()
  }
}