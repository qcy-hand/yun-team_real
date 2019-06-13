// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "teamtest-q4g25"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID
  } = cloud.getWXContext()
  const currentPage = event.currentPage
  const getKind = event.getKind
  if (getKind === 0) {
    return await db.collection('datas').where({
        type: "customize",
        openid: OPENID,
      }).orderBy('Timestamp', 'desc')
      .limit(10) //限制返回数量为 10 条
      .skip(10 * currentPage)
      .get({
        success(res) {
          console.log(res);
        }
      })
  }
  return await db.collection('datas').where({
      type: "customize",
    }).orderBy('Timestamp', 'desc')
    .limit(10) //限制返回数量为 10 条
    .skip(10 * currentPage)
    .get({
      success(res) {
        console.log(res);
      }
    })
}