/**
 * Created by wyw on 2018/9/27.
 */
const db = require('../utils/database');
let accountBase = db.model("accountBase", {
    code: String,
    status: String, // 1 已使用 0 未使用
    special: String,
    type: String, // 1 用户 2 群聊
    random: Number
});
/**
  {
     "id":1904302216391616,
     "name":"我的名字可以九个字",
     "password":"44ba52c2043b76c25291f0654a262c6e",
     "salt":"oK85gmcvbhymxK1IIltNjMPmNUmwTBTd",
     "age":null,
     "phone":"17323138363",
     "headUrl":"http://we-chat-manager.oss-cn-beijing.aliyuncs.com/file/2005131653471627.png",
     "createAt":1556633799,
     "updateAt":1591608972,
      "remark":null,
      "dr":1,
     "autograph":"一个人，总要看很多陌生人的电影，听很多陌生的歌，走很多陌生的路，然后在某个不经意思瞬间发现，原本费尽心机想要忘记的人，真的就那么忘了。",
     "backImg":"http://we-chat-manager.oss-cn-beijing.aliyuncs.com/file/2006081736123961.png"
  }
 */
let users = db.model("users", { // Schema
    name: {type: String, unique: true},
    pass: String,
    salt: String,
    code: {type: String, unique: true}, // 唯一的code // id
    photo: {type: String, default: '/img/picture.png'}, // 默认头像 // headUrl userHeadUrl
    signature: { type: String, default: '这个人很懒，暂时没有签名哦！' }, // autograph userAutograph
    nickname: { type: String, default: ''}, // userName
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    province: { type: Object, default: {name: "北京市", value: "110000"} }, // 省
    city: { type: Object, default: {name: "市辖区", value: "110100"} }, // 市
    town: { type: Object, default: {name: "海淀区", value: "110108"} }, // 县
    sex: { type: String, default: '3' }, // 0 男 1 女 3 保密
    age: { type: String, default: '18' }, // 默认 18
    bubble: { type: String, default: 'vchat' }, // 气泡
    chatColor: { type: String, default: '#ffffff' }, // 聊天文字颜色
    bgOpa: { type: Number, default: 0.2 }, // 聊天框透明度
    projectTheme: { type: String, default: 'vchat' }, // 项目主题
    wallpaper: { type: String, default: '/img/wallpaper.jpg' }, // 聊天壁纸
    signUpTime: { type: Date, default: Date.now() }, // 注册时间 // createAt
    lastLoginTime: { type: Date, default: Date.now() }, // 最后一次登录 // updateAt
    conversationsList: Array, // 会话列表 * name 会话名称 * photo 会话头像 * id 会话id * type 会话类型 group/ frend
    cover: { type: Array, default: ['/img/cover.jpg', '/img/cover1.jpg'] }, // 封面展示 // backImg
    emoji: Array // 表情包
});
module.exports = {
    accountBase,
    users
};