
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { groupAllowAction } from '../../redux/actions'
export const getGroupWrite = (groupId) => {
    let options = {
        groupId: groupId  // 群组id
    }
    WebIM.conn.getGroupWhitelist(options).then((res) => {
        console.log('res>>>', res)
        store.dispatch(groupAllowAction(res.data))
    })
}

export const rmGroupWhiteUser = (groupId, userName) => {
    let options = {
        groupId: groupId,          // 群组id
        userName: userName  // 成员id列表
    };
    WebIM.conn.rmUsersFromGroupWhitelist(options).then((res) => {
        console.log('move mute success>>>', res);
        getGroupWrite(groupId)
    })
}

export const addGroupWhiteUser = (groupId, userName) => {
    let options = {
        groupId: groupId,          // 群组id
        users: [userName]     // 成员id列表
    };
    WebIM.conn.addUsersToGroupWhitelist(options).then((res) => {
        console.log('make mute success>>>', res);
        getGroupWrite(groupId)
    })
}