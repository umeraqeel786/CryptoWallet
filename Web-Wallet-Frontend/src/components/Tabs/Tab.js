import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import plusMath from '../../assets/plus-math.png';
import refresh from '../../assets/refresh.svg';
import help from '../../assets/help.png';
import metaSvg from '../../assets/no-nfts.svg';
import Activity from './Activity';

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MetaTab = (props) => {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        
        <Box sx={{  bgcolor: '#282c34',  width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab style={{ color: 'white' }} label="Token" {...a11yProps(0)} />
                    <Tab style={{ color: 'white' }} label="Nfts" {...a11yProps(1)} />
                    <Tab style={{ color: 'white' }} label="Activity" {...a11yProps(2)} />
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                <text style={{ color: '#a8aaad' }}>Import Token</text>
                <br></br><br></br> <br></br><br></br><br></br> <br></br><br></br><br></br>
                <div align="left" style={{ marginTop: "20px" }}>
                    <img width="13" height="13" src={plusMath} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Import NFTs</text>

                </div>
                <div align="left" style={{ marginTop: "15px" }}>
                    <img width="13" height="13" src={refresh} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Refresh list</text>

                </div>
                <div align="left" style={{ marginTop: "15px" }}>
                    <img width="13" height="13" src={help} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Metamask support</text>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <img src={metaSvg} alt='svg'></img>
                <div>
                    <text style={{ color: '#a8aaad' }}>No NFTs yet</text>
                </div>
                <div>
                    <a href='a' style={{ color: '#1098fc' }}>Learn more</a>
                </div>
                <br></br><br></br>
                <div align="left" style={{ marginTop: "20px" }}>
                    <img width="13" height="13" src={plusMath} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Import NFTs</text>

                </div>
                <div align="left" style={{ marginTop: "15px" }}>
                    <img width="13" height="13" src={refresh} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Refresh list</text>

                </div>
                <div align="left" style={{ marginTop: "15px" }}>
                    <img width="13" height="13" src={help} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Metamask support</text>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>

            <Activity></Activity>
               
                <div align="left" style={{ marginTop: "20px" }}>
                    <img width="13" height="13" src={plusMath} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Import NFTs</text>

                </div>
                <div align="left" style={{ marginTop: "15px" }}>
                    <img width="13" height="13" src={refresh} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Refresh list</text>

                </div>
                <div align="left" style={{ marginTop: "15px" }}>
                    <img width="13" height="13" src={help} alt='svg'></img>
                    <text style={{ color: '#1098fc', textAlign: "left" }}> Metamask support</text>
                </div>
            </CustomTabPanel>
            </Box>
        </Box>
    );
};


export default MetaTab;