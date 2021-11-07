

// 获取好友
export const contactsAciton = (data) => {
    return { type: 'CONTACTS_ACTION', data };
};

// 已加入的群组
export const groupListAciton = (data) => {
    return { type: 'GROUP_LIST_ACTION', data };
};

// 公共群组
export const publicGroupsAciton = (data) => {
    return { type: 'PUBLIC_GROUPS_ACITON', data };
};