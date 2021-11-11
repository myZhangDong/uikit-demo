
import React, { useState, useEffect } from 'react'
import i18next from "i18next";
import store from '../../../../redux/store'
import CommonDialog from '../../../common/dialog'
import createGroup from '../../../../api/groupChat/createGroup'
import { Box, Grid, List, Card, CardHeader, ListItem, ListItemText, ListItemIcon, Checkbox, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import rearch_icon from '../../../../assets/search@2x.png'
import back_icon from '../../../../assets/back@2x.png'
import create_icon from '../../../../assets/create@2x.png'

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            width: '880px',
            height: '680px',
            display: 'flex',
            overflow:'hidden'
        },
        gInfoText: {
            textAlign: 'center',
            width: '62%',
            margin: 'auto 0',
        },
        gNameText: {
            typeface: 'Ping Fang SC',
            fontweight: 'Semibold(600)',
            fontSize: '20px',
            character: '0',
            color: '#0D0D0D'
        },
        gAppIdText: {
            typeface: 'Ping Fang SC',
            fontWeight: 'Regular(400)',
            fontSize: '12px',
            character: '0',
            lineHeight: '20(1.667)',
            color: '#999999'
        },
        gDescriptionText: {
            typeface: 'Ping Fang SC',
            fontWeight: 'Regular(400)',
            fontSize: '12px',
            character: '0',
            lineHeight: '16(1.333)',
            color: '#000000'
        },
        gUserBox: {
            width: '100%',
            display: 'flex',
            padding:'10px'
        },
        gUsers: {
            height: '585px',
            overflowY: 'scroll',
            overflowX: 'hidden'
        },
        backBox: {
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            left: '20px',
            bottom: '20px',
            cursor: 'pointer',
            color: '#005FFF'
        },
        goBox: {
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            right: '20px',
            bottom: '20px',
            cursor: 'pointer',
            color: '#005FFF'
        },
        iconImg: {
            width: '20px',
            height: '20px'
        },
        contactsBox: {
            display: 'flex',
            alignItems: 'center',
            width:'100%'
        },
        contactsSearch: {
            width: '32px',
            height: '32px'
        }
    })
});


const intersection = (users, userData) => {
    return users.filter((value) => userData.indexOf(value) === -1);
}

const SelectGroupMemberDialog = ({ groupInfoData, open, onClose }) => {
    const { groupNameValue, groupDescriptionValue } = groupInfoData
    const state = store.getState();
    const contacts = state?.constacts;
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);

    const contactsChecked = intersection(checked, contacts);
    const groupMemberChecked = intersection(checked, groupMembers);


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
            // 将选中的user 添加到group Member
            setGroupMembers(groupMembers.concat(contacts[value]));
        } else {
            newChecked.splice(currentIndex, 1);
            // group Member 删除制定 user
            groupMembers.splice(value, 1)
            // 删除后的 group Member 
            setGroupMembers(groupMembers);
        }
        setChecked(newChecked);
    };

    const handleCheckedGroupMember = () => {
        setChecked(checked, contacts);
    };

    const handleCheckedContacts = () => {
        setChecked(checked, groupMembers);
    };

    useEffect(() => {
        if (contactsChecked.length !== 0) {
            handleCheckedGroupMember();
        } else if (groupMemberChecked.length !== 0) {
            handleCheckedContacts();
        }
    }, [contactsChecked.length, groupMemberChecked.length])



    const customList = (title, items) => (
        <Card >
            <CardHeader
                title={title}
            />
            <List className={classes.gUsers}>
                {items.map((val, key) => {
                    const labelId = `transfer-list-all-item-${key}-label`;
                    return (
                        <ListItem
                            key={key}
                            onClick={handleToggle(key)}
                        >
                            <ListItemText id={labelId} primary={val} />
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(key) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    const YourContacts = () => {
        return (
            <Box className={classes.contactsBox}>
                <InputBase type="search" placeholder="Your Contacts" className={classes.inputSearch} />
                <img src={rearch_icon} alt="" className={classes.contactsSearch} />
            </Box>
        )
    }
    const GroupsMembers = () => {
        return (
            <Box className={classes.contactsBox}>
                <Typography>{`Group Members(${groupMembers.length})`}</Typography>
            </Box>
        )
    }

    const renderMember = () => {
        return (
            <Box className={classes.root}>
                <Box className={classes.gInfoText}>
                    <Box>
                        <Typography className={classes.gNameText}>{groupNameValue}</Typography>
                        <Typography className={classes.gAppIdText}>AgoraID: supercalifragilisticexpialidocious</Typography>
                        <Typography className={classes.gDescriptionText}>{groupDescriptionValue}</Typography>
                    </Box>
                </Box>
                <Box className={classes.gUserBox}>
                    <Box style={{width:'260px'}}>
                        <Grid item>{customList(<YourContacts />, Array.from(new Set(contacts)))}</Grid>
                    </Box>
                    <Box style={{ width: '260px' }}>
                        <Grid item>{customList(<GroupsMembers />, Array.from(new Set(groupMembers)))}</Grid>
                    </Box>
                </Box>
                {/* 返回 */}
                <Box className={classes.backBox} onClick={() => onClose()}>
                    <img src={back_icon} alt="" className={classes.iconImg} />
                    <Typography>{i18next.t('Back')}</Typography>
                </Box>
                {/* 创建 */}
                <Box className={classes.goBox} onClick={() => createGroup(groupInfoData, groupMembers, onClose)}>
                    <Typography>{i18next.t('Create')}</Typography>
                    <img src={create_icon} alt="" className={classes.iconImg} />
                </Box>
            </Box>
        )
    }

    return (
        <CommonDialog
            open={open}
            onClose={onClose}
            title={i18next.t('Add a Group Chat')}
            content={renderMember()}
            maxWidth={880}
        ></CommonDialog>
    )
}

export default SelectGroupMemberDialog;