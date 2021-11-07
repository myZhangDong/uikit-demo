
import WebIM from '../../utils/WebIM'
const createGroup = (groupInfo, member, onClose) => {
    const { groupNameValue, groupDescriptionValue, groupPublicChecked, groupInviteChecker } = groupInfo
    let options = {
        data: {
            groupname: groupNameValue,          // 群组名
            desc: groupDescriptionValue,       // 群组描述
            members: member,     // 用户名组成的数组
            public: groupPublicChecked,                    // pub等于true时，创建为公开群
            approval: true,                  // approval为true，加群需审批，为false时加群无需审批
            allowinvites: groupInviteChecker,      // true：允许群成员邀请人加入此群，false：只有群主才可以往群里加人 注意公开群（public：true),则不允许群成员邀请别人加入此群
            inviteNeedConfirm: false         // 邀请加群，被邀请人是否需要确认。true 为需要被邀请者同意才会进群
        },
        success(res) { 
            console.log('success>>>',res);
            onClose();
        },
        error(err) { },
    };
    WebIM.conn.createGroupNew(options).then((res) => {
        console.log(res)
    })
}

export default createGroup;