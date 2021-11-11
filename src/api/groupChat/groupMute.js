
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { groupMuteAction } from '../../redux/actions'

export const getGroupMuted = (groupId,type) => {
    let options = {
        groupId: groupId                // 群组ID
    };
    WebIM.conn.getMuted(options).then((res) => {
        console.log(res)
        let data = res.data || []
        store.dispatch(groupMuteAction(data, { type: type}))
    })
}

export const onChangeGroipMute = (groupId,userName,type) => {
    let options = {
        username: userName,                      // 成员用户名
        muteDuration: 886400000,               // 禁言的时长，单位是毫秒
        groupId: groupId
    };
    if (type === 'make') {
        WebIM.conn.mute(options).then((res) => {
            console.log('make mute success>>>',res)
            getGroupMuted(groupId, type)
        })
    }else if (type === 'move') {
        WebIM.conn.removeMute(options).then((res) => {
            console.log('move mute success>>>', res)
            getGroupMuted(groupId, type)
        })
    }
}

