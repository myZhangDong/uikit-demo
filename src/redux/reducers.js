
let defaultState = {
    constacts: [],
    groupList: [],
    publicGroups: []
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
                groupList: data
            }
        case 'PUBLIC_GROUPS_ACITON':
            return {
                ...state,
                publicGroups: data
            }
        default:
            break;
    }
}

export default reducer;