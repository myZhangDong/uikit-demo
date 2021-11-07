
import React, { useState } from 'react'
import i18next from "i18next";
import { Box, TextField, Switch } from '@material-ui/core';
// import Switch from '@mui/material/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SelectGroupMemberDialog from './selectGroupMember'
import go_icon from '../../../../assets/go@2x.png'

const useStyles = makeStyles((theme) => {
    return ({
        gName: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
        },
        gNameText: {
            Typeface: 'Ping Fang SC',
            fontWeight: 'Semibold (600)',
            fontSize: '16px',
            Character: '0',
            corlor: '#0D0D0D',
            marginRight: '25px'
        },
        gDescription:{
            display:'flex',
            justifyContent:'space-between',
        },
        gDescriptionLenth: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px'
        },
        gInfoSetting: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        },
        gMumberInput: {
            width: '180px',
        },
        gInvite: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            color: '#CCCCCC'
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
        setGroupInfoData({ groupNameValue, groupDescriptionValue, groupMaximumValue, groupPublicChecked, groupInviteChecker})
    }
    // 关闭群组创建选择 member
    const handleSelectUserDialogClose= () => {
        setShowSelectUserDialog(false);
    }

    return (
        <Box>
            {showSelectUserDialog ? 
                <SelectGroupMemberDialog 
                    groupInfoData={groupInfoData}
                    open = { showSelectUserDialog } onClose={handleSelectUserDialogClose}
                />
            : <Box>
                <Box >
                    <Box className={classes.gName}>
                        <Typography className={classes.gNameText}>GroupName</Typography>
                        <TextField
                            label="groupName" variant="outlined" fullWidth type="text"
                            value={groupNameValue}
                            onChange={handleNameChange} />
                    </Box>
                    <Box>
                            <Box className={classes.gDescription}>
                            <Typography className={classes.gNameText}>Group Description</Typography>
                            <TextField
                                multiline
                                variant="outlined" type="text"
                                value={groupDescriptionValue}
                                onChange={handleDescriptionChange}
                                placeholder="Not required"
                            />
                        </Box>
                        <Box className={classes.gDescriptionLenth}>
                            <Typography>{groupDescriptionValue.length}/300</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.gInfoSetting}>
                        <Typography>Maximum Mumber</Typography>
                        <TextField
                            multiline
                            variant="outlined" type="number"
                            value={groupMaximumValue}
                            onChange={handleMaximumChange}
                            placeholder="No More Than 2000"
                            className={classes.gMumberInput}
                        />
                    </Box>
                </Box>
                <Box className={classes.gInfoSetting}>
                    <Typography>Set to a Public Group</Typography>
                    <Switch
                        checked={groupPublicChecked}
                        onChange={handleGrooupPublicChange}
                        color="primary"
                    />
                </Box>
                <Box className={classes.gInvite}>
                    <Typography>Allow Members to Invite</Typography>
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