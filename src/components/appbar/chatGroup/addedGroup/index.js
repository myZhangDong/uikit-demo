
import React from 'react'
import { useSelector } from 'react-redux'
import i18next from "i18next";
import { Box, InputBase, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import WebIM from '../../../../utils/WebIM'
import store from '../../../../redux/store'
import search_icon from '../../../../assets/search.png'


const useStyles = makeStyles((theme) => {
    return ({
        root: {
            height:'100%',
            width:'100%'
        },
        inputBox:{
            display:'flex',
            alignItems:'center',
            background:'#F4F5F7',
            borderRadius:'23px',
            height:'36px',
            lineHeight:'36px',
        },
        inputSearch:{
            width:'100%',
            height:'22px',
            fontSize:'16px',
            lineHeight: '22px',
            cursor: 'pointer',
            padding:'6px 5px 7px 0'
        },
        searchImg: {
            width: '18px',
            height: '18px',
            paddingLeft: '8px'
        },
        gItem: {
            height: '580px',
            marginTop: '25px',
            overflowY: 'scroll',
            overflowX: 'hidden',
        },
        gInfoBox:{
            display:'flex',
            alignItems:'center'
        },
        gAvatar: {
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            backgroundColor: '#FF9F4D',
            cursor: 'pointer',
        },
        gName: {
            borderRadius: '16px',
            margin: '0 10px',
        },
        gNameText: {
            Typeface: 'Ping Fang SC',
            fontWeight: 'Semibold (600)',
            fontSize: '16px',
            Character: 0,
            color: '#0D0D0D',
            cursor: 'pointer',
            height: '48px',
            lineHeight: '48px'
        }
    })
});


const AddedGroups = () => {
    const classes = useStyles();
    const state = useSelector((state) => state);
    // const state = store.getState();
    const groupList = state?.groupList || [];
    return (
        <Box className={classes.root}>
            <Box className={classes.inputBox}>
                <img src={search_icon} alt="" className={classes.searchImg} />
                <InputBase type="search" placeholder="Search" className={classes.inputSearch} />
            </Box>
            <Box className={classes.gItem}>
                {groupList.length > 0 && groupList.map((item, key) => {
                    return (
                        <Box className={classes.gInfoBox}>
                            <Box className={classes.gAvatar}></Box>
                            <Box key={key} className={classes.gName}>
                                <Typography className={classes.gNameText}>{item.groupname}</Typography>
                            </Box>
                        </Box>
                        
                    )
                })}
            </Box>
        </Box>

    )
}

export default AddedGroups;