
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { groupBlockAction } from '../../redux/actions'
import getGroupInfo from './getGroupInfo'

export const getGroupBlock = (groupId) => {
    let option = {
        groupId: groupId
    };
    WebIM.conn.getGroupBlacklistNew(option).then((res) => {
        console.log(res)
        store.dispatch(groupBlockAction(res.data));
        getGroupInfo(groupId, 'block')
    })
}

export const onChangeGroupBlock = (groupId, userName, type) => {
    let options = {
        groupId: groupId,
        username: userName
    };
    if (type === "move") {
        WebIM.conn.removeGroupBlockSingle(options).then((res) => {
            console.log(res)
            getGroupBlock(groupId)
        })
    } else if (type === "make") {
        WebIM.conn.groupBlockSingle(options).then((res) => {
            console.log(res)
            getGroupBlock(groupId)
        })
    }
}
