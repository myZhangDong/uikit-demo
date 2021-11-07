
import WebIM from './WebIM'
import getContacts from '../api/contactsChat/getContacts'
import getGroups from '../api/groupChat/getGroups'
import getPublicGroups from '../api/groupChat/getPublicGrooups'
const initListen = () => {
    WebIM.conn.listen({
        onOpened: () => {
            console.log('onOpened>>>');
            getContacts();
            getGroups();
            getPublicGroups();
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
                case 'joinPublicGroupSuccess':{
                    getGroups();
                }
                    break;
            
                default:
                    break;
            }
        },
    })
}

export default initListen;