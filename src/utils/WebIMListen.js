
import WebIM from './WebIM'
import getContacts, { getBlackList } from '../api/contactsChat/getContacts'
import getGroups from '../api/groupChat/getGroups'
import getPublicGroups from '../api/groupChat/getPublicGrooups'
import { createHashHistory } from 'history'
import store from '../redux/store'
import { setRequests, setFetchingStatus } from '../redux/actions'
const history = createHashHistory()
const initListen = () => {
    WebIM.conn.listen({
        onOpened: () => {
            console.log('onOpened>>>');
            getContacts();
            getGroups();
            getPublicGroups();
            getBlackList()
            history.push('/main')
            store.dispatch(setFetchingStatus(false))
        },
        onClosed: () => {
            console.log('onClosed>>>');
        },
        onOnline: (network) => {
            console.log('onOnline>>>', network);
        },
        onOffline: (network) => {
            console.log('onOffline>>>', network);
        },
        onError: (err) => {
            console.log('onError>>>', err);
        },
        onTextMessage: (message) => {
            console.log('onTextMessage>>>', message);
        },
        onPictureMessage: (message) => {
            console.log('onPictureMessage>>>', message);
        },
        onCmdMessage: (message) => {
            console.log('onCmdMessaeg>>>', message);
        },
        onPresence: (message) => {
            console.log('onPresence>>>', message);
            const { type } = message;
            switch (type) {
                case 'joinPublicGroupSuccess':
                    getGroups();
                    break;
                default:
                    break;
            }
        },
        onContactInvited: (msg) => {
            console.log('onContactInvited', msg)
        }
    })

    WebIM.conn.addEventHandler('REQUESTS', {
        onContactInvited: (msg) => {
            console.log('onContactInvited', msg)
            let { requests } = store.getState()
            let contactRequests = requests.contact
            let data = {
                name: msg.from,
                status: 'pedding',
                time: Date.now()
            }
            contactRequests.unshift(data)
            let newRequests = { ...requests, contact: contactRequests }
            store.dispatch(setRequests(newRequests))
        },
        onGroupChange: (msg) => {
            console.log('onGroupChange', msg)
            if (msg.type === 'joinGroupNotifications') {
                let { requests } = store.getState()
                let groupRequests = requests.group
                let data = {
                    name: msg.from,
                    status: 'pedding',
                    time: Date.now()
                }
                groupRequests.unshift(data)
                let newRequests = { ...requests, group: groupRequests }
                store.dispatch(setRequests(newRequests))
            }
        }
    })

}

export default initListen;