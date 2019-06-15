// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "cloundteam-zngfx"})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  try{
    return await db.collection('datas').add({
      data:{
        type: event.type,
        time: event.time,
        qidian: event.qidian,
        zhongdian: event.zhongdian,
        id_mess: event.id_mess,
        beizhu: event.beizhu,
        Nowtime: event.Nowtime,
        nickname:event.nickname,
        touxiang:event.touxiang,
        Timestamp:event.Timestamp,
        openid:wxContext.OPENID,
      }
    })
  } catch(e){
    console.log(e)
  }
}