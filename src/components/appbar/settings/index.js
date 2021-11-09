import React, { useState } from "react";
import CommonDialog from "../../common/dialog";
import i18next from "i18next";
import { Avatar, Box, Button, TextField, Checkbox, List, ListItem, ListItemAvatar, Menu, MenuItem } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import editIcon from '../../../assets/white@2x.png'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { IconButton, Icon } from '@material-ui/core';
import deleteContactIcon from '../../../assets/deletecontact@2x.png'
import avater1 from '../../../assets/avatar1.png'
import avater2 from '../../../assets/avatar2.png'
import avater3 from '../../../assets/avatar3.png'
import CheckIcon from '@material-ui/icons/Check';
const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: "flex",
            alignItems: "center",
            width: '680px',
            minHeight: theme.spacing(30),
            // paddingBottom: theme.spacing(4),
            // margin: "16px 24px",
        },
        gridItem: {
            display: "flex",
            alignItems: "center",
        },

        settingInfoBox: {
            width: '280px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '10px',
            '& div:nth-last-child(2)': {
                marginTop: '-12px',
                fontSize: '20px',
                fontWeight: '600'
            },
            '& div:nth-last-child(1)': {
                color: '#999999',
                fontSize: '12px'
            }
        },

        settingMenuBox: {
            display: 'flex',
            flexDirection: 'column'
        },

        tabsInfo: {
            height: '462px'
        },
        avatarEditIcon: {
            position: 'relative',
            top: '-60px',
            width: '24px',
            height: '24px',
            cursor: 'pointer'
        },

        infoPanel: {
            width: '100%',
            height: '450px',
            backgroundColor: '#EDEFF2',
            padding: '6px 8px',
            display: 'flex'
        },
        infoItem: {
            backgroundColor: '#F4F5F7',
            borderRadius: '16px',
            height: '55px',
            width: '100%',
            lineHeight: '55px',
            padding: '0 16px',
            boxSizing: 'border-box',
            position: 'relative',
            '& span:nth-child(3)': {
                color: '#005FFF',
                position: 'absolute',
                right: '8px',
                cursor: 'pointer'
            },
            '& span:nth-child(2)': {
                fontSize: '16px',
                marginLeft: '16px'
            }
        },


        privacyItemInfo: {
            display: 'flex',
            alignItems: 'center'
        },

        aboutItem: {
            background: '#F4F5F7',
            height: '50px',
            lineHeight: '50px',
            margin: '2px 0',
            padding: '0 8px'
        }
    };
});

const AVATARS = [avater1, avater2, avater3]
export default function Setting({ open, onClose }) {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(1)
    const [editStatus, setEditStatus] = useState(false)
    const [nickName, setNickName] = useState('')
    const [avatarIndex, setAvatarIndex] = useState(null)

    const [addEl, setAddEl] = useState(null)
    const handleClose = () => {
        onClose();
    };

    const handleMenuClick = (e) => {
        console.log(e.target.innerHTML)
        if (e.target.innerHTML === 'info') {
            setTabIndex(1)
        } else if (e.target.innerHTML === 'privacy') {
            setTabIndex(2)
        } else if (e.target.innerHTML === 'about') {
            setTabIndex(3)
        }
    }

    const handleEditClick = () => {
        setEditStatus(true)
    }
    const handleEditBlur = () => {
        setEditStatus(false)
    }
    const handleEditChange = (e) => {
        console.log(e.target.value)
        setNickName(e.target.value)
    }

    const handlePrivacyItemMoreClick = (e) => {
        setAddEl(e.currentTarget)
    }

    const unblockContact = (value) => {

    }

    const deleteContact = (value) => {

    }

    const handleCheckAvatar = (index) => {
        setAvatarIndex(index)
    }

    function tabs() {
        const avatarUrl = avatarIndex > -1 ? AVATARS[avatarIndex] : null
        return (
            <div className={classes.tabsInfo}>
                <div className={classes.settingInfoBox}>
                    <Avatar style={{ width: 100, height: 100, marginTop: '36px' }} src={avatarUrl}>

                    </Avatar>
                    <img src={editIcon} alt='edit' className={classes.avatarEditIcon} onClick={() => setTabIndex(0)} />
                    <div>{nickName}</div>
                    <div>AgoraID: 1234414312</div>
                </div>
                <div className={classes.settingMenuBox} onClick={handleMenuClick}>
                    <Button key={0} style={{ justifyContent: 'start' }} >info</Button>
                    <Button key={1} style={{ justifyContent: 'start' }} >privacy</Button>
                    <Button key={2} style={{ justifyContent: 'start' }}>about</Button>
                </div>
            </div>
        )
    }

    function switchTabPanels() {
        if (tabIndex === 0) {
            return avatarTabPaner()
        } else if (tabIndex === 1) {
            return infoTabPanel()
        } else if (tabIndex === 2) {
            return privacyTabPanel()
        } else if (tabIndex === 3) {
            return aboutTabPanel()
        }
    }

    function infoTabPanel() {
        return (
            < div className={
                classes.infoPanel
            } >
                {editStatus ?
                    (<TextField
                        onBlur={handleEditBlur}
                        onChange={handleEditChange}
                        id="filled-helperText"
                        label="NickName"
                        defaultValue={nickName}
                        variant="filled"
                        fullWidth
                    />) :
                    (<div className={classes.infoItem}>
                        <span>NickName</span>
                        <span>{nickName}</span>
                        <span onClick={handleEditClick}>Edit</span>
                    </div>)
                }
            </div >
        )
    }

    function aboutTabPanel() {
        return (
            <div className={
                classes.infoPanel
            }>
                <div style={{ flex: 1 }}>
                    <div className={classes.aboutItem}>SDK version: 4.0.0</div>
                    <div className={classes.aboutItem}>UIKIT version: 0.0.1</div>
                </div>
            </div>
        )
    }

    function privacyTabPanel() {
        return (
            <div className={classes.infoPanel}>
                <List dense sx={{ width: '400px' }} style={{ width: '100%' }}>
                    {[1, 2, 3, 4].map((value) => {
                        const labelId = `label-${value}`;
                        return (
                            <ListItem
                                fullWidth
                                key={value}
                            >
                                <Button fullWidth style={{
                                    display: 'flex',
                                    'justify-content': 'space-between'
                                }}>
                                    <div className={classes.privacyItemInfo}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°${value + 1}`}
                                            />
                                        </ListItemAvatar>
                                        <span>123</span>
                                    </div>
                                    <IconButton onClick={handlePrivacyItemMoreClick}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Button>
                            </ListItem>
                        )
                    })}
                </List>

                <Menu
                    id="simple-menu"
                    anchorEl={addEl}
                    keepMounted
                    open={Boolean(addEl)}
                    onClose={() => setAddEl(null)}
                >
                    <MenuItem onClick={unblockContact}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', 'align-items': 'center' }}>
                            <RemoveCircleOutlineIcon style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                            Unblock
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={deleteContact}>
                        <Typography variant="inherit" noWrap style={{ display: 'flex', 'align-items': 'center', color: '#FF14CC' }}>
                            <img src={deleteContactIcon} alt='deleteContact' style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                            Delete Contact
                        </Typography>
                    </MenuItem>
                </Menu>
            </div>
        )
    }

    function avatarTabPaner() {
        return (
            <div className={classes.infoPanel}>
                {AVATARS.map((value, index) => {
                    return (<div style={{ width: '117px', height: '117px', margin: '5px', borderRadius: '4px', overflow: 'hidden' }} onClick={() => { handleCheckAvatar(index) }} key={value}>
                        <img src={value} alt='avatar1' style={{ width: '100%' }} />
                        {avatarIndex === index ? <CheckIcon style={{ fontSize: 50, color: '#fff', position: 'relative', top: '-80px', right: '-40px' }} /> : null}
                    </div>)
                })}
            </div>
        )
    }


    function renderContent() {
        return (
            <div className={classes.root}>
                {tabs()}
                {switchTabPanels()}
            </div>
        );
    }

    return (
        <CommonDialog
            open={open}
            onClose={handleClose}
            title={i18next.t("Settings")}
            content={renderContent()}
            maxWidth={700}
        ></CommonDialog>
    );
}
