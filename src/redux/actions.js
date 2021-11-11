

export const contactsAciton = (data) => {
    return { type: 'CONTACTS_ACTION', data };
};

export const groupListAciton = (data) => {
    return { type: 'GROUP_LIST_ACTION', data };
};

export const publicGroupsAciton = (data) => {
    return { type: 'PUBLIC_GROUPS_ACITON', data };
};


export const groupsInfoAction = (data) => {
    return { type: 'GROUPS_INFO_ACITON', data };
}

export const groupAdminsAction = (data) => {
    return { type: 'GROUP_ADMINS_ACITON', data };
}

export const groupMuteAction = (data, options) => {
    return { type: 'GROUP_MUTE_ACITON', data, options };
}

export const groupBlockAction = (data) => {
    return { type: 'GROUP_BLOCK_ACITON', data };
}

export const groupAllowAction = (data) => {
    return { type: 'GROUP_ALLOW_ACITON', data };
}

export const groupsNoticeAction = (data) => {
    return { type: 'GROUPS_NOTICE_ACITON', data };
}
// set user info
export const setMyUserInfo = (data) => {
    return { type: 'SET_MY_USER_INFO', data };
}

// set black list
export const setBlackList = (data) => {
    return { type: 'SET_BLACK_LIST', data };
}

// set requests
export const setRequests = (data) => {
    return { type: 'SET_REQUESTS', data };
}

// update request status
export const updateRequestStatus = (data) => {
    return { type: 'UPDATE_REQUEST_STATUS', data };
}

// Whether show loading
export const setFetchingStatus = (data) => {
    return { type: 'SET_FETCHING_STATUS', data };
}