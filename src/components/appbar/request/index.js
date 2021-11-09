import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Button, Tabs, Tab, Typography, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import CommonDialog from '../../common/dialog'
import i18next from "i18next";
import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '620px',
        height: theme.spacing(75),
        backgroundColor: 'rgba(206, 211, 217, .15)',
        boxSizing: 'border-box',
        overflowY: 'auto',
        flex: '1',
    },
    itemBox: {
        marginBottom: '15px'
    },
    header: {
        height: theme.spacing(13),
        borderBottom: '1px solid #f2f2f2',
        background: '#fff',
        lineHeight: theme.spacing(13),
        paddingLeft: '16px'
    },
    content: {
        height: theme.spacing(27.5),
        background: '#fff',
        display: 'flex',
        width: '100%',
        padding: '0 16px',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    msgBox: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        '& span:last-child': {
            marginLeft: '12px'
        }
    },
    btnBox: {
        '& button': {
            margin: '0 5px'
        }
    },
    noData: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        color: 'rgba(0,0,0,.15)',
        fontSize: '28px',
        height: '80vh'
    },

    requestItemBox: {
        height: '102px',
        backgroundColor: '#F7F7F7',
        flex: 1,
        width: '385px',
        borderRadius: '16px',
        margin: '5px',
        display: 'flex',
        padding: '8px',
        boxSizing: 'border-box',
        position: 'relative'
    },

    acceptButton: {
        width: '72px',
        height: '28px',
        borderRadius: '17.5px',
        fontSize: '14px',
        color: '#fff',
        marginRight: '10px'
    }
}))

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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


// Want to join the
function RequestItem() {
    const classes = useStyles();
    return (
        <div className={classes.requestItemBox}>
            <Avatar style={{ width: '50px', height: '50px', marginRight: '11px' }} />
            <div style={{ margin: '0 5px' }}>
                <div>
                    <div>zd1</div>
                    <div style={{ fontSize: '14px' }}>Sent you a friend request.</div>
                </div>
            </div>
            <div style={{ position: 'relative', right: '-72px' }}>now</div>
            <div style={{ position: 'absolute', bottom: '12px', right: '14px' }}>
                <Button color="primary" variant="contained" className={classes.acceptButton}>{i18next.t('accept')}</Button>
                <IconButton style={{ width: '28px', height: '28px' }}><ClearIcon /></IconButton>
            </div>
        </div >
    )
}

function Notice(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { open, onClose, history, location } = props
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function renderContent() {
        return (
            <div className={classes.root}>
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 590 }}
                    style={{ width: '100%' }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="New Friends" {...a11yProps(0)} />
                        <Tab label="Group Requests" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0} style={{ overflowY: 'auto', flex: '1', backgroundColor: '#EDEFF2' }}>
                        <RequestItem />
                        <RequestItem />
                        <RequestItem />
                        <RequestItem />
                        <RequestItem />
                        <RequestItem />
                        <RequestItem />
                        <RequestItem />
                    </TabPanel>
                    <TabPanel value={value} index={1} style={{ overflowY: 'auto', flex: '1', backgroundColor: '#EDEFF2' }}>
                        <RequestItem />
                        <RequestItem />
                        <RequestItem />
                        <RequestItem />
                    </TabPanel>
                </Box>
            </div>
        )
    }

    return (
        <CommonDialog
            open={open}
            onClose={onClose}
            title={i18next.t("Request")}
            content={renderContent()}
            maxWidth={700}
        ></CommonDialog>
    );

}

export default memo(Notice)