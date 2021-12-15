import WebIM from '../../utils/WebIM'

const loginChat = () => {
    let options = {
        user: 'lizg2',
        pwd: '1',
        appKey: WebIM.config.appkey
    };
    WebIM.conn.open(options)
}

export const getToken = (agoraId, nickName) => {
    return postData('https://a41.easemob.com/app/chat/user/login', { "userAccount": agoraId, "userNickname": nickName })
}

export const loginWithToken = (agoraId, agoraToken) => {
    console.log('1234', agoraId, agoraToken)
    let options = {
        user: agoraId,
        agoraToken: agoraToken
    };

    WebIM.conn.open(options)
}

export function postData(url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
    })
        .then(response => response.json())
}

export function logout() {
    WebIM.conn.close()
}


export default loginChat;
