import _ from 'lodash'

let defaultState = {
    constacts: [],
    groups:{
        groupList: [],
        publicGroups: [],
        groupsInfo: [],
        groupAdmins: [],
        groupMuteList:[],
        groupBlockList:[],
        groupAllowList:[],
        groupNotices: '',
    }
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
                groups:{
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
            return{
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
            return{
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
        default:
            break;
    }
}

export default reducer;