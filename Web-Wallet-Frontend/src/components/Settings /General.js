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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';



const General = () => {

  const currentTime = new Date().toString(); // Get the current time
  const [selectedValue, setSelectedValue] = useState('ETH'); // Set the default selected value

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '-610px', // Add left margin for spacing
          marginTop: '-27px', // Add top margin for spacing
        }}
      >
        <h4>General</h4>
        <p style={{ marginLeft: '85px' }}> Currency conversion</p>
        <p style={{ marginLeft: '395px', marginTop: '-10px' }} >{currentTime}</p>
      </Box>


      <Box sx={{ border: '1px solid silver', borderRadius: '4px', width: '250px', backgroundColor: 'transparent' }}>
        <Select
          labelId="currency-label"
          id="currency"
          defaultValue="USD" // Set the default selected currency
          sx={{
            width: '100%',
            height: '30px',
            color: 'white'
          }}
          style={{ backgroundColor: 'transparent' }} // Prevent background color change
        >
          <MenuItem value="USD">USD - United States Dollar</MenuItem>
          <MenuItem value="EUR">EUR - Euro</MenuItem>
          <MenuItem value="GBP">GBP - British Pound</MenuItem>
          <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
          {/* Add more currencies as needed */}
        </Select>
      </Box>


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '-610px', // Add left margin for spacing
          marginTop: '-7px', // Add top margin for spacing
        }}
      >
        <p style={{ marginLeft: '65px' }}>Primary currency</p>
        <p style={{ marginLeft: '500px', marginTop: '-10px' }}>Select native to prioritize displaying values in the native currency of the chain.</p>


      </Box>

      <Box>
        <FormControlLabel
          value="Eth"
          control={
            <Radio
              checked={selectedValue === 'Eth'}
              onChange={handleChange}
              sx={{
                color: 'primary.main', // Customize the radio button color
                marginLeft: '-300px',  // Adjust left margin
              }}
            />
          }
          label="Eth"
          sx={{ marginTop: '-5px' }}
        />
        <FormControlLabel
          value="Fiat"
          control={
            <Radio
              checked={selectedValue === 'Fiat'}
              onChange={handleChange}
              sx={{
                color: 'primary.main', // Customize the radio button color
                marginLeft: '-230px',  // Adjust left margin
              }}
            />
          }
          label="Fiat"
          sx={{ marginTop: '-5px' }}
        />
      </Box>


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '-610px', // Add left margin for spacing
          marginTop: '-10px', // Add top margin for spacing
        }}
      >
        <p style={{ marginLeft: '80px' }}>Current Language</p>
        <p style={{ marginLeft: '5px' ,marginTop: '-10px' }}>English</p>

      </Box>

      <Box sx={{ border: '1px solid silver', borderRadius: '4px', width: '250px', backgroundColor: 'transparent' }}>
        <Select
          labelId="Language-label"
          id="Language"
          defaultValue="Eng" // Set the default selected Language
          sx={{
            width: '100%',
            height: '30px',
            color: 'white'
          }}
          style={{ backgroundColor: 'transparent' }} // Prevent background color change
        >
          <MenuItem value="Eng">English</MenuItem>
          <MenuItem value="Ur">Urdu</MenuItem>
          <MenuItem value="Ar">Arabic</MenuItem>
          {/* Add more Language as needed */}
        </Select>
      </Box>

    </div>


  )
}

export default General;