// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"teamtest-q4g25"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const listcus = event.listcus//后端返回list
  return await db.collection('datas').where({
    type:"customize",
    openid:wxContext.OPENID,
  }).orderBy('Timestamp', 'desc')
  .limit(listcus) //限制返回数量为 list 条(后端取回list从而赋给前端)
  .get({
    success(res){
      console.log(res);
    }
  })
}