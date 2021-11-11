

import WebIM from '../../utils/WebIM'
import getGroups from './getGroups'
const closeGroup = (groupId, type, onClose) => {
    let option = {
        groupId: groupId
    };

    if (type === "dissolve") {
        WebIM.conn.dissolveGroup(option).then((res) => {
            console.log(res)
            getGroups()
            onClose && onClose()
        })
    }else if(type === "quit"){
        WebIM.conn.quitGroup(option).then((res) => {
            console.log(res)
            getGroups()
            onClose && onClose()
        })
    }
}

export default closeGroup;