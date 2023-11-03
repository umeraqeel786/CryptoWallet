import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

import round from '../../assets/round.png';
import eth from '../../assets/eth.png';
import goreli from '../../assets/goreli.png';
import sepolia from '../../assets/sepolia.png';
import linea from '../../assets/linea.png';
import lineaEth from '../../assets/lineaEth.png';
import polygon from '../../assets/polygon.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Network = () => {

  const navigate = useNavigate();

  const [showAddNetwork, setShowAddNetwork] = useState(false);

  function handleClick() {
    setShowAddNetwork(true);
    // Add the desired functionality to be executed when the button is clicked
    console.log('Button clicked!'); // Example: Log a message to the console
  }


  return (
    <div> 
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: '20px',
          marginTop: '10px',
          position: 'relative', // Set the position to relative to contain the pseudo-element
        }}
      >
        <h4>Network</h4>
        
          <button
          style={{
            backgroundColor: '#1098fc',
            color: 'white',
            padding: '5px 20px',
            marginLeft: '430px',
            marginTop: '1px',
            borderRadius: '20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          
          onClick={handleClick}
        >
          Add Network
        </button>
        <div
          style={{
            position: 'absolute',
            width: '100%', // Full width of the row
            height: '1px', // Custom height for the border
            background: 'white', // White color for the border
            bottom: '0',
            left: '0',
            right: '0',
          }}
        />
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'relative', // Set the position to relative
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <InputBase
              placeholder="Search networks"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                color: 'silver',
                border: '1px solid #1098fc',
                marginTop: '10px',
                width: '90%',
                borderRadius: '5px',
                height: '35px',
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={eth} // Replace with your image URL
              style={{
                width: '25px', // Custom width
                height: '25px', // Custom height
                marginLeft: '-80px', // Add custom space to the right of the image
              }}
            />
            <h4 style={{ marginLeft: '12px' }}>Ethereum Mainnet</h4> {/* Add custom space to the left of the <p> element */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '-15px',
            }}
          >
            <img
              src={linea} // Replace with your image URL
              style={{
                width: '25px', // Custom width
                height: '25px', // Custom height
                marginLeft: '-110px', // Add custom space to the right of the image
              }}
            />
            <h4 style={{ marginLeft: '12px' }}>Linea Mainnet</h4> {/* Add custom space to the left of the <p> element */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '-15px',
            }}
          >
            <img
              src={polygon} // Replace with your image URL
              style={{
                width: '25px', // Custom width
                height: '25px', // Custom height
                marginLeft: '-80px', // Add custom space to the right of the image
              }}
            />
            <h4 style={{ marginLeft: '12px' }}>Polygon Mainnet</h4> {/* Add custom space to the left of the <p> element */}
          </Box>

          <Box
            sx={{
              marginLeft: '-150px', // Add custom left space
              marginTop: '-10px', // Add custom top space
              color:'#1098fc',
            }}
          >
            <p>Test networks</p>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '-19px',
            }}
          >
            <img
              src={goreli} // Replace with your image URL
              style={{
                width: '25px', // Custom width
                height: '25px', // Custom height
                marginLeft: '-90px', // Add custom space to the right of the image
              }}
            />
            <h4 style={{ marginLeft: '12px' }}>Goreli Network</h4> {/* Add custom space to the left of the <p> element */}
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '-15px',
            }}
          >
            <img
              src={sepolia} // Replace with your image URL
              style={{
                width: '25px', // Custom width
                height: '25px', // Custom height
                marginLeft: '-80px', // Add custom space to the right of the image
              }}
            />
            <h4 style={{ marginLeft: '12px' }}>Sepolia Network</h4> {/* Add custom space to the left of the <p> element */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '-19px',
            }}
          >
            <img
              src={lineaEth} // Replace with your image URL
              style={{
                width: '25px', // Custom width
                height: '25px', // Custom height
                marginLeft: '-70px', // Add custom space to the right of the image
              }}
            />
            <h4 style={{ marginLeft: '12px' }}>LineaEth Network</h4> {/* Add custom space to the left of the <p> element */}
          </Box>
        </Box>



        <Box>
          
{/* Add coulumn 2 code here */}

        </Box>

        {/* Add the white border */}
        <div
          style={{
            position: 'absolute',
            width: '1px', // Adjust the width of the border as needed
            height: '100%', // The height covers the entire column height
            background: 'white', // White color for the border
            left: '50%', // Position in the middle
            transform: 'translateX(-50%)', // Center the border horizontally
          }}
        />
        
      </Box>

      

    </div>
    

  )
}

export default Network;