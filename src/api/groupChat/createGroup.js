
import WebIM from '../../utils/WebIM'
import getGroups from './getGroups'
import { message } from '../../components/common/alert'
import i18next from "i18next";
const createGroup = (groupInfo, member, onClose) => {
    const { groupNameValue, groupDescriptionValue, groupPublicChecked, groupApprovalChecked, groupInviteChecked } = groupInfo

    if (groupNameValue.match(/^\s*$/)) {
        message.info(i18next.t('group name cannot be empty'))
        return;
    }
    let options = {
        data: {
            groupname: groupNameValue,
            desc: groupDescriptionValue,
            members: member,
            public: groupPublicChecked,
            approval: groupApprovalChecked,
            allowinvites: groupInviteChecked,
            inviteNeedConfirm: false
        },
    };
    WebIM.conn.createGroupNew(options).then((res) => {
        console.log('createGroupNew>>>', res)
        message.success(i18next.t('created success'))
        getGroups();
        onClose();
    })
}

export default createGroup;