// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloundteam-zngfx"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.search !== '') {
    const _ = db.command
    const reg = event.search
    // const list = event.list
    const {
      currentPage
    } = event //=== const currentPage = event.currentPage
    return await db.collection('datas').where(_.or([{
          time: db.RegExp({
            regexp: reg,
            options: 'g',
          })
        },
        {
          beizhu: db.RegExp({
            regexp: reg,
            options: 'g',
          })
        },
        {
          id_mess: db.RegExp({
            regexp: reg,
            options: 'g',
          })
        },
        {
          nickname: db.RegExp({
            regexp: reg,
            options: 'g',
          })
        },
        {
          qidian: db.RegExp({
            regexp: reg,
            options: 'g',
          })
        },
        {
          zhongdian: db.RegExp({
            regexp: reg,
            options: 'g',
          })
        }
      ])).orderBy('Timestamp', 'desc')
      .limit(10)
      .skip(10 * currentPage)
      .get()
  } else {
    return await {
      data: []
    }
  }
}