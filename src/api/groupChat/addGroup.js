
import WebIM from '../../utils/WebIM'
import getGroups from './getGroups'
import { message } from '../../components/common/alert'
import i18next from "i18next";

const addGroup = (groupId) => {
    let options = {
        groupId: groupId,
        message: "I am Tom"
    };
    WebIM.conn.joinGroup(options).then((res) => {
        console.log('joinGroup>>>', res)
        message.success(`${i18next.t('addGroup succes')}`)
        getGroups();
    })
}

export default addGroup;