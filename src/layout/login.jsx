import React, { useState } from 'react'
import './login.css'
import i18next from "i18next";
import { getToken, loginWithToken } from '../api/loginChat'
// import { createHashHistory } from 'history';
// import { useHistory } from 'react-router-dom'

import store from '../redux/store'
import { setMyUserInfo, setFetchingStatus } from '../redux/actions'

export default function Login() {
    // const history = useHistory()
    const [notice, setNotice] = useState({
        show: false,
        text: ''
    })

    const [values, setValues] = useState({
        agoraId: '',
        nickName: '',
    });

    const login = () => {
        console.log('values', values)
        if (!values.agoraId) {
            return setNotice({ show: true, text: 'agoraId is required' })
        } else if (!values.nickName) {
            return setNotice({ show: true, text: 'nickName is required' })
        } else {
            setNotice({
                show: false
            })
        }
        getToken(values.agoraId, values.nickName).then((res) => {
            const { accessToken } = res
            console.log(accessToken)
            loginWithToken(values.agoraId, accessToken)
            store.dispatch(setMyUserInfo({ agoraId: values.divagoraId, nickName: values.nickName }))
            store.dispatch(setFetchingStatus(true))
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [buttonText, setButtonText] = useState(i18next.t('login-Login'))
    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='login-form-icon'></div>
                <div className='login-form-AC'></div>
                {notice.show ? <div className='login-form-notice'>
                    {notice.text}
                </div> : null}
                <input className='login-form-input' placeholder='AgoraID' onChange={handleChange('agoraId')}></input>
                <input className='login-form-input' placeholder={i18next.t('login-NickName')} onChange={handleChange('nickName')}></input>
                <input type='button' className='login-form-input button' value={buttonText} onClick={login} />
            </div>
            <div className='login-copyright'>
                © 2021 Agora
            </div>
        </div>
    )
}


