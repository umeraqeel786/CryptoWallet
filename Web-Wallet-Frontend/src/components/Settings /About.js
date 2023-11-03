import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



const About = () => {



    return (

        <div><Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '-610px', // Add left margin for spacing
                marginTop: '-27px', // Add top margin for spacing
            }}
        >
            <h4>About</h4>

            <p style={{ marginLeft: '85px' }}> MetaMask Version</p>
            <p style={{ marginLeft: '-10px',marginTop:'-10px' }}>1.1.0</p>


        </Box>

           


        </div>



    )
}

export default About;