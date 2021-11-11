import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { contactsAciton, setBlackList, updateRequestStatus } from '../../redux/actions'
const getContacts = () => {
    WebIM.conn.getRoster().then((res) => {
        store.dispatch(contactsAciton(res.data))
    });
}

export const addContact = (userId, message) => {
    debugger
    WebIM.conn.addContact(userId, message);
}

export const getBlackList = () => {
    WebIM.conn.getBlacklist().then((res) => {
        console.log('>>>>>>获取黑名单成功', res);  // res.data > ['user1', 'user2']
        store.dispatch(setBlackList(res.data))
    })
}

export const removeFromBlackList = (userId) => {
    WebIM.conn.removeFromBlackList({
        name: [userId]
    });
    let { blackList } = store.getState()
    blackList = blackList.filter((v) => v !== userId)
    store.dispatch(setBlackList(blackList))
}

export const deleteContact = (userId) => {
    WebIM.conn.deleteContact(userId);
    let { blackList } = store.getState()
    blackList = blackList.filter((v) => v !== userId)
    store.dispatch(setBlackList(blackList))
}

export const acceptContactRequest = (userId) => {
    WebIM.conn.acceptInvitation(userId)
    store.dispatch(updateRequestStatus({ type: 'contact', name: userId, status: 'accepted' }))
}

export const declineContactRequest = (userId) => {
    WebIM.conn.declineInvitation(userId)
    store.dispatch(updateRequestStatus({ type: 'contact', name: userId, status: 'ignored' }))
}

export default getContacts;
