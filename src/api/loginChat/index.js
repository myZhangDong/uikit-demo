import WebIM from '../../utils/WebIM'

const loginChat = () => {
    let options = {
        user: 'lizg2',
        pwd: '1',
        appKey: WebIM.config.appkey
    };
    WebIM.conn.open(options)
}

export default loginChat;
