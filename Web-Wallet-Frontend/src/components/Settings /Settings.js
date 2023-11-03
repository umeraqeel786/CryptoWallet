import Header from '../Header/Header';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import MetaTab from '../Tabs/Tab';
import Nav from '../Nav/Nav';
import Cart from '../Cart/Cart';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import General from './General';
import Snaps from './Snaps';
import Alert from './Alert';
import About from './About';
import { useLocation, useNavigate } from "react-router-dom";
import Network from './Network';


const Settings = () => {
    const buttonLabels = ['General', 'Snaps', 'Alerts','Network', 'About'];
    const [secondColumnContent, setSecondColumnContent] = useState(<General></General>);

    const handleButtonClick = (label) => {
        let content = null;

        if (label === 'General') {
            content = <General></General>;
        }
        else if (label === 'Snaps') {
            content = <Snaps></Snaps>;
        }
        else if (label === 'Alerts') {
            content = <Alert></Alert>;
        }
        else if (label === 'Network') {
            content = <Network></Network>;
        }
        else if (label === 'About') {
            content = <About></About>;
        }

        // Set the content for the second column
        setSecondColumnContent(content);
    };
    const navigate = useNavigate();

    const goToDashboard = () => {
        // Use history.push to navigate to a specific route (e.g., '/component2')
        navigate("/dashboard");
    };

    return (
        <div className="App">
            <Header />
            <Container fixed>
                <Box sx={{ bgcolor: '#282c34', height: '80vh', width: '110vh', flexGrow: 1 }}>
                    <Nav />

                    <Box display="flex" alignItems="center">
                        {/* Paragraph */}
                        <h3 style={{ marginLeft: '20px' }}>Settings</h3>

                        {/* Search Bar */}
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                            style={{ marginLeft: '130px', backgroundColor: 'white', borderRadius: '10px' }}
                        />

                        {/* Cross Button */}
                        <IconButton
                            onClick={goToDashboard}
                            edge="end"
                            aria-label="clear"
                            size="small"
                            style={{ marginLeft: '200px', color: 'orange' }}
                        >
                            <ClearIcon />
                        </IconButton>
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        sx={{
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                width: '15%',
                                padding: '1px',
                                border: '0px solid #ccc',
                            }}
                        >
                            {buttonLabels.map((label, index) => (
                                <Button
                                    key={index}
                                    color="primary"
                                    style={{ marginBottom: '5px', width: '100%', color: 'silver' }}
                                    onClick={() => handleButtonClick(label)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                        <div
                            style={{
                                width: '85%',
                                padding: '16px',
                                border: '0px solid #ccc',
                            }}
                        >
                            {secondColumnContent}
                        </div>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Settings;