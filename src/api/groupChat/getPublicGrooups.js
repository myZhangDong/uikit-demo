
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { publicGroupsAciton } from '../../redux/actions'
const getPublicGroups = () => {
    let limit = 200,
        cursor = 1;
    let options = {
        limit: limit,                                            // 预期每页获取的记录数
        cursor: cursor,                                          // 游标
    };
    WebIM.conn.listGroups(options).then((res) => {
        store.dispatch(publicGroupsAciton(res.data))
    })
}

export default getPublicGroups;




