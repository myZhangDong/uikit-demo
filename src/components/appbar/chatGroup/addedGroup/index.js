
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, InputBase, List, ListItem,Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { EaseApp } from 'es-uikit'
import GroupSettingsDialog from '../groupSettings'
import getGroupInfo from '../../../../api/groupChat/getGroupInfo'
import search_icon from '../../../../assets/search.png'

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            height: '100%',
            width: '100%'
        },
        inputBox: {
            display: 'flex',
            alignItems: 'center',
            background: '#F4F5F7',
            borderRadius: '23px',
            height: '36px',
            lineHeight: '36px',
        },
        inputSearch: {
            width: '100%',
            height: '22px',
            fontSize: '16px',
            lineHeight: '22px',
            cursor: 'pointer',
            padding: '6px 5px 7px 0'
        },
        searchImg: {
            width: '18px',
            height: '18px',
            paddingLeft: '8px'
        },
        gItem: {
            height: '580px',
            overflowY: 'scroll',
            overflowX: 'hidden',
        },
        gInfoBox: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
        },
        gAvatar: {
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            backgroundColor: '#FF9F4D',
        },
        gName: {
            // borderRadius: '16px',
            margin: '0 10px',
            width: '100%',
            textAlign: 'left',
            textTransform: 'none',
            fontSize: '16px',
            display: 'inherit',
        },
        gNameText: {            
            typeface: 'Ping Fang SC',
            fontWeight: 'Semibold (600)',
            fontSize: '16px',
            character: '0',
            color: '#0D0D0D',
            height: '48px',
            lineHeight: '48px',
            overflowX: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'pre-wrap',
            width: '400px'
        }
    })
});

const AddedGroups = ({ onClose }) => {
    const classes = useStyles();
    const state = useSelector((state) => state);
    const groupList = state?.groups?.groupList || [];
    const [showGroupSettings, setshowGroupSettings] = useState(false)
    const [currentGroupId, setCurrentGroupId] = useState('')

    const handleGroupInfo = (groupid) => {
        getGroupInfo(groupid)
        setshowGroupSettings(true)
        setCurrentGroupId(groupid)
    }

    const handleClickSession = (itemData) => {
        // uikit
        let session = {
            sessionType: "groupChat",
            sessionId: itemData,
        };
        EaseApp.onClickSession(session);
        onClose();
    }

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.inputBox}>
                    <img src={search_icon} alt="" className={classes.searchImg} />
                    <InputBase type="search" placeholder="Search" className={classes.inputSearch} />
                </Box>
                <List className={classes.gItem}>
                    {groupList.length > 0 && groupList.map((item, key) => {
                        return (
                            <ListItem className={classes.gInfoBox}  key={key}>
                                <Box className={classes.gAvatar} onClick={() => handleGroupInfo(item.groupid)}></Box>
                                <Box style={{ width: '100%' }} onClick={() => { handleClickSession(item.groupid)}}>
                                    <Button className={classes.gName}>
                                        <Typography className={classes.gNameText}>{item.groupname}</Typography>
                                    </Button>
                                </Box>
                            </ListItem>

                        )
                    })}
                </List>
            </Box>
            <GroupSettingsDialog
                open={showGroupSettings}
                onClose={() => setshowGroupSettings(false)}
                currentGroupId={currentGroupId}
            >
            </GroupSettingsDialog>
        </>
    )
}

export default AddedGroups;