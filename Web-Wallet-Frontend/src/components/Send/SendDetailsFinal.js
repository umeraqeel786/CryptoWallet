import "../../App.css";
import Boldplus from "../../assets/Boldplus.png";
import arrow from "../../assets/arrow.png";
import swap from "../../assets/swap-36.png";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import round from "../../assets/round.png";
import Typography from "@mui/material/Typography";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import SendTransaction from "../../services/SendTransaction";
import { addTx } from "../../store/slices/UserSlices";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import CircularProgress from "@mui/material/CircularProgress";

const SendDetailsFinal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useSelector((state) => state.user.value);
  const id = useSelector((state) => state.user.id);

  const [data, setData] = React.useState(false);

  const bal = useSelector((state) => state.user.bal);

  const goToDashboard = () => {
    // Use history.push to navigate to a specific route (e.g., '/component2')
    navigate("/dashboard");
  };

  const sendTx = async () => {
    setData(true);
    console.log(address, props.value, props.addr, id);
    try {
      navigate("/dashboard");
      const data = await SendTransaction.sendTx(
        address,
        props.value,
        props.addr,
        id
      );
      console.log(data.data);
      if (data.data === "Insufficient Balance") {
        toast.error("Insufficient Balance!", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        dispatch(addTx(data.data));
        navigate("/dashboard");
        // toast.success("Transaction Successfull.", {
        //   autoClose: 3000,
        // });

        // setTimeout(() => {
        //   navigate("/dashboard");
        // }, 1000);
      }
    } catch (e) {
      if (!e?.response) {
        toast.error("Error No Server Response!", {
          autoClose: 20000,
        });
      } else if (e.response?.status === 409) {
        toast.error("Error!", {
          autoClose: 20000,
        });
      } else {
        toast.error("Transaction Failed!", {
          autoClose: 20000,
        });
      }
    }
  };

  const textStyle = {
    fontSize: "16px", // Customize font size
    fontWeight: "bold", // Make text bold
    color: "gold", // Customize text color
  };

  console.log(address, bal, props.value, props.addr);
  return (
    <>
      <Container fixed>
        {data && <Toaster />}
        <Box
          sx={{
            bgcolor: "#282c34",
            height: "80vh",
            width: "50vh",
            flexGrow: 1,
          }}
        >
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            marginTop='10px' // Add space from the top
          >
            {/* First Button */}
            <Button
              onClick={() => window.history.back()}
              style={{ marginRight: "390px", width: "130px" }}
            >
              Edit
            </Button>
          </Box>

          <div>
            <Box
              border={2}
              borderColor='silver'
              padding={0} // Add padding to create space inside the border
              marginLeft={3} // Add margin to create space from the left side
              marginTop={0} // Add margin to create space from the top
              width={180} // Set the width to your desired value (e.g., 200px)
            >
              <p style={{ fontSize: "15px" }}>SENDING GOERLIETH</p>
            </Box>
          </div>

          <div>
            <Box
              borderColor='silver'
              marginLeft={1} // Add margin to create space from the left side
              marginTop={1} // Add margin to create space from the top
              width={200} // Set the width to your desired value (e.g., 200px)
            >
              <span style={{ fontSize: "20px" }}>{props.value}</span>
            </Box>
          </div>

          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            border='1px solid #ccc'
            borderRadius='8px'
            padding='12px'
            width='460px' // Customize the width of the box
            margin='20px auto' // Add space from top and center horizontally
          >
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1' style={textStyle}>
                {" "}
                Gas (estimated)
              </Typography>
              <Typography variant='body1' style={textStyle}>
                Likely in 30 seconds
              </Typography>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1' style={textStyle}>
                0.0000315 GoerliETH
              </Typography>
              <Typography variant='body1' style={textStyle}>
                Max fee: 0.0000315 GoerliETH
              </Typography>
            </Box>
          </Box>

          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            border='1px solid #ccc'
            borderRadius='8px'
            padding='12px'
            width='460px' // Customize the width of the box
            margin='20px auto' // Add space from top and center horizontally
          >
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1' style={textStyle}>
                {" "}
                Total
              </Typography>
              <Typography variant='body1' style={textStyle}>
                Amount + gas fee
              </Typography>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1' style={textStyle}>
                0.0000315 GoerliETH
              </Typography>
              <Typography variant='body1' style={textStyle}>
                Max amount: 0.0000315 GoerliETH
              </Typography>
            </Box>
          </Box>

          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            marginTop='40px' // Add space from the top
          >
            {/* First Button */}

            <Button
              onClick={goToDashboard}
              variant='contained'
              style={{
                marginRight: "100px",
                width: "130px",
                color: "black",
                background: "silver",
              }}
            >
              Reject
            </Button>

            {/* Second Button */}
            <Button
              variant='contained'
              onClick={sendTx}
              style={{
                marginLeft: "0px",
                width: "130px",
                color: "black",
                background: "blue",
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SendDetailsFinal;
