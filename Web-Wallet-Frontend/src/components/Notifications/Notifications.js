import Header from '../Header/Header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MetaTab from '../Tabs/Tab';
import Nav from '../Nav/Nav';
import Cart from '../Cart/Cart';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


const Notifications = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        console.log('Go back clicked');
        navigate('/dashboard');
      };

      const handleMarkAll = () => {
        console.log('MarkAll clicked');
      };

    return (
        <div className="App">
            <Header />
            <Container fixed>
                <Box sx={{ bgcolor: '#282c34', height: '80vh', width: '120vh', flexGrow: 1 }}>
                    <Nav />

                    
                    <div>
      <Box display="flex" alignItems="center" ml={2} mt={2}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <button 
            onClick={handleGoBack}
            style={{
              color: 'blue',       // Text color
              background: 'none',  // No background
              border: 'none',      // No border
              cursor: 'pointer',   // Change cursor to a pointer
              marginRight: '10px',  // Add spacing between buttons
            }}
          >
            <ArrowBackIcon />
          </button>
          
          <h2 style={{ flex: 1, textAlign: 'center' }}>Notifications</h2>

          <button
            onClick={handleMarkAll}
            style={{
              color: 'blue',       // Text color
              background: 'none',  // No background
              border: 'none',      // No border
              cursor: 'pointer',   // Change cursor to a pointer
              marginLeft: '10px',  // Add spacing from the left to the "Cancel" button
            }}
          >
            Mark All
          </button>
        </div>
      </Box>
    </div>
    <Divider variant="fullWidth" sx={{ backgroundColor: 'silver' }} />

    <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            fontSize: '20px',  // Adjust the font size
            marginLeft: '15px', // Add spacing from the left
            color: 'dimgray',  // Change the text color
            mt: '150px',         // Add spacing from the top
          }}
        >
          There are no notifications yet
        </Typography>

                </Box>
            </Container>


        </div>


    )
}

export default Notifications;