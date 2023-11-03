import Send from "./Send";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MetaTab from "../Tabs/Tab";
import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";
import SendDetailsFinal from "./SendDetailsFinal";
import { useLocation } from "react-router-dom";

const SendFinal = (props) => {
  const location = useLocation();
  console.log(location);
  return (
    <div className='App'>
      <Header />
      <Container fixed>
        <Nav />

        <SendDetailsFinal value={location.state.balance} addr={location.state.address}></SendDetailsFinal>
      </Container>
    </div>
  );
};

export default SendFinal;
