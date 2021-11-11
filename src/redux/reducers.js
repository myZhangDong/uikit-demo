import _ from 'lodash'

let defaultState = {
    constacts: [],
    groups: {
        groupList: [],
        publicGroups: [],
        groupsInfo: [],
        groupAdmins: [],
        groupMuteList: [],
        groupBlockList: [],
        groupAllowList: [],
        groupNotices: '',
    },
    sessionList: [],
    requests: { group: [{ name: 'zdzd', group: '123456', status: 'pedding', time: '', type: 'apply' }], contact: [{ name: 'zdzd', status: 'pedding', time: '' }] },
    blackList: [],
    myUserInfo: {
        agoraId: null,
        nickName: null,
        avatarIndex: null
    },
    isFetching: false
};

const reducer = (state = defaultState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'CONTACTS_ACTION': {
            return {
                ...state,
                constacts: data
            }
        }
        case 'GROUP_LIST_ACTION':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    groupList: data
                }
            }
        case 'PUBLIC_GROUPS_ACITON':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    publicGroups: data
                }

            }
        case 'GROUPS_INFO_ACITON':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    groupsInfo: data
                }
            }
        case 'GROUP_ADMINS_ACITON':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    groupAdmins: data
                }
            }
        case 'GROUP_MUTE_ACITON':
            let muteType = action.options?.type
            let newMuteList = []
            if (muteType === 'make') {
                newMuteList = _.concat(state.groups.groupMuteList, data)
            } else if (muteType === 'move') {
                newMuteList = data
            }
            return {
                ...state,
                groups: {
                    ...state.groups,
                    groupMuteList: newMuteList
                }
            }
        case 'GROUP_BLOCK_ACITON':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    groupBlockList: data
                }
            }
        case 'GROUP_ALLOW_ACITON':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    groupAllowList: data
                }
            }
        case 'GROUPS_NOTICE_ACITON':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    groupNotices: data
                }
            }
        case 'SET_SESSION_LIST':
            return {
                ...state,
                sessionList: data
            }
        case 'SET_REQUESTS':
            return {
                ...state,
                requests: data
            }
        case 'UPDATE_REQUEST_STATUS':
            let requests = state.requests
            let newRequests = {}
            if (data.type === 'contact') {
                let updatedReq = requests.contact.map(value => {
                    if (value.name === data.name) {
                        value.status = data.status
                    }
                    return value
                })
                newRequests = { ...requests, contact: updatedReq }
            } else {
                let updatedReq = requests.group.map(value => {
                    if (value.name === data.name) {
                        value.status = data.status
                    }
                    return value
                })
                newRequests = { ...requests, group: updatedReq }
            }
            debugger
            return {
                ...state,
                requests: newRequests
            }
        case 'SET_MY_USER_INFO':
            let myUserInfo = { state }
            return {
                ...state,
                myUserInfo: { myUserInfo, ...data }
            }
        case 'SET_BLACK_LIST':
            return {
                ...state,
                blackList: data
            }
        case 'SET_FETCHING_STATUS':
            return {
                ...state,
                isFetching: data
            }
        default:
            break;
    }
}

export default reducer;

