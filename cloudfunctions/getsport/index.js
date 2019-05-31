// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"teamtest-q4g25"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
return await db.collection('datas').where({
  type:"sport"
}).orderBy('Timestamp', 'desc')
.skip(10) // 跳过结果集中的前 10 条，从第 11 条开始返回
  .limit(10) // 限制返回数量为 10 条
  .get({
  success(res){
    console.log(res);
  }
})
}