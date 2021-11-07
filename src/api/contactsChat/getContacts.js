import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { contactsAciton } from '../../redux/actions'
const getContacts = () => {
    WebIM.conn.getRoster().then((res) => {
        console.log('getContacts>>>',res);
        store.dispatch(contactsAciton(res.data))
    });
}

export default getContacts;
