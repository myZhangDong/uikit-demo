
import React, { useState, useEffect } from 'react'
import CommonDialog from '../../common/dialog'
import { useSelector } from 'react-redux'
import i18next from "i18next";
import { Box, Tabs, Tab } from '@material-ui/core';
import { TabPanel, a11yProps } from '../../common/tabs'
import { makeStyles } from '@material-ui/core/styles';
import AddedGroups from './addedGroup'
import CreateGroup from './createGroup'
import JoinGroup from './joinGroup'
import PublicGroup from './publicGroups'
import groupChatIcon from '../../../assets/groupchat@2x.png'

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            display: 'flex',
            width: '880px',
            height: '680px',
            overflow: 'hidden'
        },
        tabs: {
            background: '#FFFFFF',
            width: '45%'
        },
        menus: {
            color: '#000000',
            fontSize: '14px',
            fontWeight: '500',
            typeface: 'Ping Fang SC',
            textTransform: ' none',
            character:'0',
        },
        content: {
            background: '#EDEFF2',
            width: '100%',
            height: '100%'
        }
    })
});

const ChatGroupDialog = ({ open, onClose }) => {
    const classes = useStyles();
    const state = useSelector((state) => state);
    const groupList = state?.groups?.groupList || [];
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [groupCount, setGroupCount] = useState(0)
    useEffect(() => {
        setGroupCount(groupList.length)
    }, [groupList.length])

    const renderGroupContent = () => {
        return (
            <Box className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label={`Added Groups(${groupCount})`} {...a11yProps(0)} className={classes.menus} >
                        <img src={groupChatIcon} alt='new chat' style={{ width: '30px' }} />
                    </Tab>
                    <Tab label="New Group" {...a11yProps(1)} className={classes.menus} />
                    <Tab label="Join a Group" {...a11yProps(2)} className={classes.menus} />
                    <Tab label="Public Group" {...a11yProps(3)} className={classes.menus} />

                </Tabs>
                <TabPanel value={value} index={0} className={classes.content}>
                    <AddedGroups onClose={onClose}/>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.content}>
                    <CreateGroup onClose={onClose} />
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.content}>
                    <JoinGroup />
                </TabPanel>
                <TabPanel value={value} index={3} className={classes.content}>
                    <PublicGroup />
                </TabPanel>
            </Box>
        )
    }

    return (
        <CommonDialog
            open={open}
            onClose={onClose}
            title={i18next.t('Group Chat')}
            content={renderGroupContent()}
            maxWidth={880}
        ></CommonDialog>
    )
}

export default ChatGroupDialog;