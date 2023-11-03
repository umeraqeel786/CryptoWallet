import Header from "../Header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MetaTab from "../Tabs/Tab";
import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";
import send from "./send.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SendTo from "./SendTo";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import round from "../../assets/round.png";
import React, { useEffect } from "react";
import userDetails from "../../services/userDetails";
import { useDispatch, useSelector } from "react-redux";
import { addUserAccounts } from "../../store/slices/UserSlices";

const Send = () => {
  const accounts = useSelector((state) => state.user.accounts[0]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToDashboard = () => {
    // Use history.push to navigate to a specific route (e.g., '/component2')
    navigate("/dashboard");
  };

  const goSentTo = (e) => {
    //e.preventDefault();
    console.log("haha", e.target.innerText);
    let str = e.target.innerText.trim();
    const add = str.substring(10);
    console.log(add);
    navigate("/sendTo", {state: add});
  };

  function PartiallyHiddenText({ text, visibleChars }) {
    console.log("hi", text);
    if (text) {
      const truncatedText = text.substring(0, visibleChars);
      const ellipsis = text.length > visibleChars ? "..." : "";

      return (
        <span className='partially-hidden-text'>
          {truncatedText}
          {ellipsis}
        </span>
      );
    }
  }

  console.log("accounts", accounts);
  return (
    <div className='App'>
      <Header />
      <Container fixed>
        <Box
          sx={{
            bgcolor: "#1b1e22",
            height: "150vh",
            width: "90vh",
            flexGrow: 1,
          }}
        >
          <Nav />

          <div style={{ marginLeft: "190px", marginTop: "15px" }}>
            <Box
              sx={{
                bgcolor: "#282c34",
                height: "100vh",
                width: "50vh",
                flexGrow: 1,
              }}
            >
              <Box display='flex' alignItems='center'>
                <p style={{ marginLeft: "100px" }}>Send To</p>
                <Button
                  onClick={goToDashboard}
                  style={{ marginLeft: "100px" }}
                  color='primary'
                >
                  Cancel
                </Button>
              </Box>

              <Box
                display='flex'
                alignItems='center'
                border='1px solid silver'
                padding='3px'
                marginTop='10px'
                marginLeft='20px'
                width='320px'
                borderRadius='10px' // Adding border radius to make the borders round
              >
                <SearchIcon />
                <InputBase
                  placeholder='Enter Public Address...'
                  inputProps={{ "aria-label": "search" }}
                  sx={{ color: "silver" }} // Changing the placeholder text color to silver
                />
              </Box>

              <Box display='flex' alignItems='center'>
                <h4 style={{ marginLeft: "20px" }}>Your Accounts</h4>
              </Box>
              {accounts.map((account, index) => (
                <Box
                  display='flex'
                  alignItems='center'
                  src={round}
                  onClick={goSentTo}
                  value={account.address}
                  sx={{
                    marginLeft: "20px", // Add left margin for spacing
                    color: "white", // Set the initial text color
                    "&:hover": {
                      color: "blue", // Change text color on hover
                    },
                  }}
                >
                  <img
                    src={round}
                    alt='Image Description'
                    style={{ width: "33px", height: "33px" }}
                  />
                  <Box
                    src={round}
                    onClick={goSentTo}
                    value={account.address}
                    href='#'
                    style={{
                      textDecoration: "none", // Remove underline from the link
                    }}
                    sx={{ marginLeft: "15px" }}
                  >
                    <h4>Account {index + 1}</h4>
                    {account.address}
                  </Box>
                </Box>
              ))}
            </Box>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Send;
