// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"teamtest-q4g25"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const list = event.list//取回list
  return await db.collection('datas').where({
    type:"car",
  }).orderBy('Timestamp', 'desc')
  .limit(list) // 限制返回数量为 list 条(后端取回list从而赋给前端)
  .get({
    success(res){
      console.log(res);
    }
  })
}