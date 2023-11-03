import Header from "../Header/Header";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Nav from "../Nav/Nav";
import SendDetails from "./SendDetails";
import { useLocation } from "react-router-dom";

const SendTo =(props) =>{
  const location = useLocation();
  console.log("2",location.state);
    return (
        <div className="App">
      <Header />
      <Container fixed>
            <Nav />

            <SendDetails value={location.state}></SendDetails>
            
      </Container>
    </div>
    )
}

export default SendTo;