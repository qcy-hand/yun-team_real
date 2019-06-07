// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"teamtest-q4g25"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const listcar = event.listcar//后端返回listcar
  return await db.collection('datas').where({
    type:"car",
    openid:wxContext.OPENID,
  }).orderBy('Timestamp', 'desc')
  .limit(listcar) //限制返回数量为 listcar 条(后端取回listcar从而赋给前端)
  .get({
    success(res){
      console.log(res);
    }
  })
}