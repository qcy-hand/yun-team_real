// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "teamtest-q4g25"})
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
        Nowtime: event.Nowtime,
        didian_study: event.didian_study,
        id_study: event.id_study,
        id_mess: event.id_mess,
        beizhu: event.beizhu,
      }
    })
  } catch(e){
    console.log(e)
  }
}