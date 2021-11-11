

import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { groupsNoticeAction } from '../../redux/actions'
export const updataGroupNotice = () => {
    let options = {
        groupId: 'groupId',                 // 群组id   
        announcement: 'announcement'        // 公告内容                        
    };
    WebIM.conn.updateGroupAnnouncement(options).then((res) => {
        console.log(res)
    })
}

export const getGroupNotice = (groupId) => {
    let options = {
        groupId           // 群组id                          
    };
    WebIM.conn.fetchGroupAnnouncement(options).then((res) => {
        store.dispatch(groupsNoticeAction(res.data.announcement))
    })
}