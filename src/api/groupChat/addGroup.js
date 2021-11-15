
import WebIM from '../../utils/WebIM'
const addGroup = (groupId) => {
    let options = {
        groupId: groupId,         // 群组ID
        message: "I am Tom"         // 请求信息
    };
    WebIM.conn.joinGroup(options).then((res) => {
        console.log('joinGroup>>>', res)
    })
}

export default addGroup;