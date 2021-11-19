
import React, { useState } from 'react'
import i18next from "i18next";
import { Box, TextField, Switch, InputBase } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SelectGroupMemberDialog from './selectGroupMember'
import go_icon from '../../../../assets/go@2x.png'

const useStyles = makeStyles((theme) => {
    return ({
        inputBox: {
            borderRadius: '16px',
            background: '#F4F5F7',
            padding: '15px'
        },
        gNameBox: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #E6E6E6'
        },
        gNameText: {
            typeface: 'Ping Fang SC',
            fontWeight: '600',
            fontSize: '16px',
            character: '0',
            color: '#0D0D0D',
        },
        gDescriptionBox: {
            borderBottom: '1px solid #E6E6E6',
            marginBottom: '20px'
        },
        gDescription: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        gInputBaseWidth: {
            width: '360px'
        },
        gDescriptionLenth: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px',
            color: '#CCCCCC',
            fontSize: '14px',
            fontWeight: 'Regular(400)'
        },
        gInfoSetting: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        gMumberInput: {
            width: '180px',
        },
        gSetting: {
            height: '55px',
            display: 'flex',
            justifyContent: 'space-between',
            background: '#F4F5F7',
            borderradius: '16px',
            marginTop: '20px',
            padding: '0 15px',
            alignItems: 'center',
        },

        gInvite: {
            color: '#CCCCCC',
            display: ' flex',
            alignItems: 'center',
            marginTop: '20px',
            justifyContent: 'space-between',
            padding: '0 15px',
            background: '#F4F5F7',
            height: '55px',
            borderRadius: '16px'

        },
        gNext: {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '16px',
            cursor: 'pointer',
            color: '#CCCCCC',
            position: 'absolute',
            bottom: '20px',
            right: '20px'
        },
        gNextImg: {
            width: '20px',
            height: '20px'
        }
    })
});

const CreateGroup = () => {
    const classes = useStyles();
    const [groupNameValue, setGroupNameValue] = useState('')
    const [groupDescriptionValue, setGroupDescriptionValue] = useState('')
    const [groupMaximumValue, setGroupMaximumValue] = useState('')
    const [groupPublicChecked, setGroupPublicChecked] = useState(true);
    const [groupInviteChecker, setGroupInviteChecker] = useState(true);

    const [showSelectUserDialog, setShowSelectUserDialog] = useState(false)
    const [groupInfoData, setGroupInfoData] = useState({})


    // 群组名称
    const handleNameChange = (event) => {
        setGroupNameValue(event.target.value)
    }
    // 群组描述
    const handleDescriptionChange = (event) => {
        setGroupDescriptionValue(event.target.value)
    }
    // 群组人数
    const handleMaximumChange = (event) => {
        setGroupMaximumValue(event.target.value)
    }
    // 群组类别 公开/私有
    const handleGrooupPublicChange = (event) => {
        setGroupPublicChecked(event.target.checked);
    };
    // 群组是否允许成员邀请
    const handleGroupInviteChange = (event) => {
        setGroupInviteChecker(event.target.checked);
    };

    // 打开群组创建选择 member
    const handleSelectUserDialog = () => {
        setShowSelectUserDialog(true);
        setGroupInfoData({ groupNameValue, groupDescriptionValue, groupMaximumValue, groupPublicChecked, groupInviteChecker })
    }
    // 关闭群组创建选择 member
    const handleSelectUserDialogClose = () => {
        setShowSelectUserDialog(false);
    }

    return (
        <Box>
            {showSelectUserDialog ?
                <SelectGroupMemberDialog
                    groupInfoData={groupInfoData}
                    open={showSelectUserDialog} onClose={handleSelectUserDialogClose}
                />
                : <Box>
                    <Box className={classes.inputBox}>
                        <Box className={classes.gNameBox}>
                            <Typography className={classes.gNameText}>GroupName</Typography>
                            <InputBase
                                type="text"
                                className={classes.gInputBaseWidth}
                                placeholder={i18next.t('groupName')}
                                onChange={handleNameChange} />
                        </Box>
                        <Box className={classes.gDescriptionBox}>
                            <Box className={classes.gDescription}>
                                <Typography className={classes.gNameText}>Group Description</Typography>
                                <InputBase
                                    type="text"
                                    multiline={true}
                                    style={{
                                        height: '60px', 
                                        overflowX: 'hidden',
                                        overflowY: 'scroll'
                                    }}
                                    className={classes.gInputBaseWidth}
                                    placeholder={i18next.t('Not required')}
                                    onChange={handleDescriptionChange} />
                            </Box>
                            <Box className={classes.gDescriptionLenth}>
                                {groupDescriptionValue.length}/300
                            </Box>
                        </Box>
                        <Box >
                            <Box className={classes.gInfoSetting}>
                                <Typography className={classes.gNameText}>Maximum Mumber</Typography>
                                <InputBase
                                    type="number"
                                    placeholder={i18next.t('No More Than 2000')}
                                    onChange={groupMaximumValue} />
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.gSetting}>
                        <Typography className={classes.gNameText}>Set to a Public Group</Typography>
                        <Switch
                            checked={groupPublicChecked}
                            onChange={handleGrooupPublicChange}
                            color="primary"
                        />
                    </Box>
                    <Box className={classes.gInvite}>
                        <Typography >Allow Members to Invite</Typography>
                        <Switch
                            checked={groupInviteChecker}
                            onChange={handleGroupInviteChange}
                            color="primary"
                        />
                    </Box>
                    <Box className={classes.gNext} onClick={() => handleSelectUserDialog()}>
                        <Typography>{i18next.t('Next')}</Typography>
                        <img src={go_icon} alt="" className={classes.gNextImg} />
                    </Box>
                </Box>}
        </Box>
    )
}

export default CreateGroup;