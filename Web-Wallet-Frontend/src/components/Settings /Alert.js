import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



const Alert = () => {

    const [isOn, setIsOn] = useState(false);

    const [isApiOn, setApiOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const handleToggleApi = () => {
        setApiOn(!isApiOn);
    };
    
    return (

        <div><Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '-610px', // Add left margin for spacing
                marginTop: '-27px', // Add top margin for spacing
            }}
        >
            <h4>Alerts</h4>


        </Box>

            <Box display="flex" alignItems="center">
                <p style={{ marginRight: '10px' }}>Browsing a website with an unconnected account selected</p>

                <FormControlLabel
                    control={
                        <Box
                            component="div"
                            display="flex"
                            alignItems="center"
                            marginTop='-10px'
                            marginLeft='100px'
                            justifyContent={isOn ? 'flex-end' : 'flex-start'}
                            width={40}
                            height={20}
                            border={1}
                            borderColor="primary.main"
                            borderRadius={50}
                            onClick={handleToggle}
                            style={{ cursor: 'pointer' }}
                        >
                            <Box
                                component="div"
                                bgcolor="common.white"
                                width={16}
                                height={16}
                                borderRadius="50%"
                            />
                        </Box>
                    }

                />
                <p style={{ marginLeft: '-5px', marginBottom: '15px' }}>
                    {isOn ? 'ON' : 'OFF'}
                </p>
            </Box>

            <Box display="flex" alignItems="center">
                <p style={{ marginRight: '10px' }}>When a website tries to use the removed window.web3 API</p>

                <FormControlLabel
                    control={
                        <Box
                            component="div"
                            display="flex"
                            alignItems="center"
                            marginTop='-10px'
                            marginLeft='100px'
                            justifyContent={isApiOn ? 'flex-end' : 'flex-start'}
                            width={40}
                            height={20}
                            border={1}
                            borderColor="primary.main"
                            borderRadius={50}
                            onClick={handleToggleApi}
                            style={{ cursor: 'pointer' }}
                        >
                            <Box
                                component="div"
                                bgcolor="common.white"
                                width={16}
                                height={16}
                                borderRadius="50%"
                            />
                        </Box>
                    }

                />
                <p style={{ marginLeft: '-5px', marginBottom: '15px' }}>
                    {isApiOn ? 'ON' : 'OFF'}
                </p>
            </Box>

        </div>



    )
}

export default Alert;