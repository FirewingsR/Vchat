/**
 * @author WilliamRong firewings_82
 * @date :8/6/2020 7:21 PM
 **/

const db = require('../utils/database');

let activity = db.model("activity", {
    userId: String, // 用户id
    content: String, // 活动内容
    picUrls: String, // 图片链接
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
    /**
     * id
     * userId 用户id
     * content 活动内容
     * picUrls 图片链接
     */
});

const addActivity = (params, callback) => { // 新增
    const json = JSON.parse(params);
    console.log(json);
    activity.create(json).then(r => {
        if (r['_id']) {
            callback({code: 0, data: r['_id']});
        } else {
            callback({code: -1, data: '添加失败'});
        }
    }).catch(err => {
        callback({code: -1, data: '添加失败'});
    })
};

/**
 "userName":"Fire",
 "userHeadUrl":"https://assets-store-cdn.48lu.cn/assets-store/103fd8505699461da8abe28dc8221dec.jpg",
 "userAutograph":"Fire1"
 * @param user
 * @param param
 * @param callback
 */
const queryAll = (host, param, callback) => {
    // activity.find().skip(Number(param.start)).limit(Number(param.length)).then(r => {
    //     callback({code: 0, data: r});
    // }).catch(err => {
    //     console.log(err);
    //     callback({code: -1})
    // })

    activity.aggregate([
            // { $addFields: {uid : {"$toString":{"$toLong":"$userId"}}}},
            {$project: {"userName": 0, "userHeadUrl": 0, "userAutograph": 0}},
            {
                // $lookup: {
                //     from: "users",
                //     localField: "uid",
                //     foreignField: "code",
                //     as: "user"
                // },

                $lookup: {
                    from: "users",
                    let: {uid: {"$toString": {"$toLong": "$userId"}}},
                    pipeline: [
                        {$match: {$expr: {$eq: ["$$uid", "$code"]}}},
                        {
                            $project: {
                                code: "$code",
                                userName: "$nickname",
                                userHeadUrl: "$photo",
                                userAutograph: "$signature"
                            }
                        },
                    ],
                    as: "user"
                }
            },
            {$unwind: "$user"},
            {
                $set: {
                    userName: "$user.userName",
                    userHeadUrl: { $concat: ["http://", host, "$user.userHeadUrl" ] },
                    signature: "$user.userAutograph"
                }
            },
            {$unset: ["user"]}
        ]
    ).skip(Number(param.start)).limit(Number(param.length)).then(r => {
        callback({code: 0, data: r});
    }).catch(err => {
        console.log(err);
        callback({code: -1})
    })
}

module.exports = {
    addActivity,
    queryAll
};