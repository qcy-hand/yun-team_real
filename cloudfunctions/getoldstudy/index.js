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
  const {
    currentPage,
    getKind
  } = event //=== const currentPage = event.currentPage   //后端返回currentPage
  console.log(OPENID, currentPage);
  if (getKind === 0) {

    return await db.collection('datas').where({
        type: "study",
        openid: OPENID,
      }).orderBy('Timestamp', 'desc')
      .limit(10)
      .skip(10 * currentPage) //skip跳过
      .get({
        success(res) {
          console.log(res);
        }
      })
  }
  return await db.collection('datas').where({
      type: "study",
    }).orderBy('Timestamp', 'desc')
    .limit(10)
    .skip(10 * currentPage) //skip跳过
    .get({
      success(res) {
        console.log(res);
      }
    })
}