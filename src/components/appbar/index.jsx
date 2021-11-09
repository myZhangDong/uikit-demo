import React, { useState, useEffect } from 'react'
import './index.css'

import { Menu, MenuItem, Typography } from '@material-ui/core';
import AddFriendDialog from './addFriend'
import ChatGroupDialog from './chatGroup'
import SettingsDialog from './settings'
import WebIM, { initIMSDK } from '../../utils/WebIM'
import initListen from '../../utils/WebIMListen'
import loginChat from '../../api/loginChat/index.js'
import ContactDialog from './contactList'
import RequestDialog from './request'

import newChatIcon from '../../assets/newchat@2x.png'
import groupChatIcon from '../../assets/groupchat@2x.png'
import addContactIcon from '../../assets/addcontact@2x.png'
import requestsIcon from '../../assets/requests@2x.png'
import settingsIcon from '../../assets/settings@2x.png'
import logoutIcon from '../../assets/logout@2x.png'

export default function Header() {

    const [addEl, setAddEl] = useState(null)

    const [showAddFriend, setShowAddFriend] = useState(false)
    const [showChatGroup, setShowChatGroup] = useState(false);
    const [showUserSetting, setShowUserSetting] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const [showRequest, setShowRequest] = useState(false)

    useEffect(() => {
        initIMSDK();
        initListen();
    }, [])

    useEffect(() => {
        if (WebIM.conn.logOut) {
            loginChat()
        }
    }, [WebIM])

    const handleClickMore = (e) => {
        setAddEl(e.currentTarget)
    }

    function handleAddFriendDialogClose() {
        setShowAddFriend(false)
    }

    function addFriend() {
        setShowAddFriend(true)
    }

    function createGroupDialog() {
        setShowChatGroup(true);
    }
    function handleCreateGroupDialogClose() {
        setShowChatGroup(false);
    }


    return (
        <>
            <div className='chatlist-header'>
                <div className='chatlist-header-avatar'></div>
                <div className='chatlist-header-title'>AgoraChat</div>
                <div className='chatlist-header-more' onClick={handleClickMore}>...</div>

                <Menu
                    id="simple-menu"
                    anchorEl={addEl}
                    keepMounted
                    open={Boolean(addEl)}
                    onClose={() => setAddEl(null)}
                >

                    <MenuItem onClick={() => setShowContact(true)}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={newChatIcon} alt='new chat' style={{ width: '30px' }} />
                            New Chat
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={createGroupDialog}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={groupChatIcon} alt='new chat' style={{ width: '30px' }} />
                            Add a Group Chat
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={addFriend}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={addContactIcon} alt='new chat' style={{ width: '30px' }} />
                            Add Contact
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => setShowRequest(true)}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={requestsIcon} alt='new chat' style={{ width: '30px' }} />
                            Requests
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => setShowUserSetting(true)}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={settingsIcon} alt='new chat' style={{ width: '30px' }} />
                            Settings
                    </Typography>
                    </MenuItem>
                    <MenuItem >
                        <Typography variant="inherit" noWrap style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logoutIcon} alt='new chat' style={{ width: '30px' }} />
                            Log out
                    </Typography>
                    </MenuItem>
                </Menu>


            </div>
            <AddFriendDialog
                open={showAddFriend}
                onClose={handleAddFriendDialogClose} />

            <ChatGroupDialog
                open={showChatGroup}
                onClose={handleCreateGroupDialogClose}
            />

            <SettingsDialog
                open={showUserSetting}
                onClose={() => setShowUserSetting(false)}
            ></SettingsDialog>

            <ContactDialog
                open={showContact}
                onClose={() => setShowContact(false)}
            >
            </ContactDialog>

            <RequestDialog
                open={showRequest}
                onClose={() => setShowRequest(false)}
            >
            </RequestDialog>
        </>
    )
}