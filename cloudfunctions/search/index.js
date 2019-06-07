// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "teamtest-q4g25" })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.search !== '') {
    const _ = db.command
    const reg = event.search
    const list = event.list
    return await db.collection('datas').where(_.or([
      {
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
      .limit(list).get()
  }else{
    return await {data:[]}
  }
}