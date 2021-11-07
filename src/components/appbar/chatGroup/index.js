
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import CommonDialog from '../../common/dialog'
import { useSelector } from 'react-redux'
import i18next from "i18next";
import { Box, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import store from '../../../redux/store';
import AddedGroups from './addedGroup'
import CreateGroup from './createGroup'
import JoinGroup from './joinGroup'
import PublicGroup from './publicGroups'

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            display: 'flex',
            width: '880px',
            height: '680px',
            overflow:'hidden'
        },
        tabs: {
            background: '#FFFFFF',
            width: '30%'
        },
        menus: {
            color: '#000000',
            fontSize: '14px',
            fontWeight: 'Medium(500)',
            typeface: 'Ping Fang SC'
        },
        content: {
            background: '#EDEFF2',
            width: '100%',
            height: '100%'
        }
    })
});


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ChatGroupDialog = ({ open, onClose }) => {
    const classes = useStyles();
    const state = useSelector((state) => state);
    const groupList = state?.groupList || [];
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [groupCount, setGroupCount] = useState(0)
    useEffect(() => {
        console.log('groupList>>>', groupList);
        setGroupCount(groupList.length)
    }, [groupList])


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
                    <Tab label={`Added Groups(${groupCount})`} {...a11yProps(0)} className={classes.menus} />
                    <Tab label="New Group" {...a11yProps(1)} className={classes.menus} />
                    <Tab label="Join a Group" {...a11yProps(2)} className={classes.menus} />
                    <Tab label="Public Group" {...a11yProps(3)} className={classes.menus} />

                </Tabs>
                <TabPanel value={value} index={0} className={classes.content}>
                    <AddedGroups />
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