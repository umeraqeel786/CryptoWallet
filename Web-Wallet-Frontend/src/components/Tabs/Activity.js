import Box from "@mui/material/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import round from "../../assets/round.png";
import right from "../../assets/right.png";
import userDetails from "../../services/userDetails";
import { useSelector } from "react-redux";

const Activity = () => {
  const id = useSelector((state) => state.user.id);
  const address = useSelector((state) => state.user.value);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isTx, setTx] = useState([]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    console.log("Closing the dialog");
    setPopupOpen(false);
    console.log("closed");
  };

  useEffect(() => {
    console.log("Activity", id, address);
    const fetchData = async () => {
      // const data = await userDetails.getUserTxById(id);
      const data = await userDetails.getUserTxByAddress(address);
      console.log("cc", data.data.length);
      if(data.data.length > 0){
        console.log("FromData", data.data);
        setTx(data.data);
      }
      else{
        const dataTo = await userDetails.getUserTxByToAddress(address);
        console.log("ToData", dataTo.data);
        setTx(dataTo.data);
      }
    
    };

    fetchData().catch(console.error);
  }, [isPopupOpen, id, address]);

  console.log("is", isTx);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "-20px", // Add left margin for spacing
        }}
      >
        <p style={{ marginLeft: "10px" }}>{formattedDate}</p>
      </Box>

      <div>
        {isTx.map((tx, index) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px", // Add left margin for spacing
              marginTop: "0px", // Add top margin for spacing
              cursor: "pointer",
            }}
            onClick={openPopup}
          >
            <ArrowDownwardIcon />
            <div>
              <h3>
                <b>{tx.from === address ? "Send" : "Received"}</b>
                <br></br>
                <p
                  style={{
                    color: "green",
                    marginTop: "-5px",
                    marginLeft: "10px",
                  }}
                >
                  {tx.status}
                </p>
              </h3>
            </div>
            <p style={{ marginLeft: "850px" }}>
              {tx.value ? tx.value + " Goerli Eth" : "0 Goerli Eth"}
            </p>
          </Box>
        ))}
      </div>
      <div>
        {isTx.map((tx, index) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px", // Add left margin for spacing
              marginTop: "0px", // Add top margin for spacing
              cursor: "pointer",
            }}
            onClick={openPopup}
          >
            {tx.to === address ? (
              <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "0px", // Add left margin for spacing
              marginTop: "0px", // Add top margin for spacing
              cursor: "pointer",
            }}
            onClick={openPopup}
          >
            <ArrowUpwardIcon />
            <div>
              <h3>
                <b>Received</b>
                <br></br>
                <p
                  style={{
                    color: "green",
                    marginTop: "-5px",
                    marginLeft: "10px",
                  }}
                >
                  {tx.status}
                </p>
              </h3>
            </div>
            <p style={{ marginLeft: "850px" }}>
              {tx.value ? tx.value + " Goerli Eth" : "0 Goerli Eth"}
            </p>
          </Box>
            ) : ""}
          </Box>
        ))}
      </div>

      <Dialog
        open={isPopupOpen}
        onClose={closePopup}
        sx={{ width: "400px", margin: "auto" }}
      >
        <DialogTitle>Receive</DialogTitle>
        <IconButton
          aria-label='close'
          onClick={closePopup}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ width: "330px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Status</p>
            <p>
              <a href='your-link-here' style={{ color: "blue" }}>
                View on explorer
              </a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-28px",
            }}
          >
            <p style={{ color: "green" }}>Confirmed</p>
            <p style={{ color: "blue" }}>Copy transaction ID</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-28px",
            }}
          >
            <p style={{ color: "black" }}>From</p>
            <p style={{ color: "black" }}>To</p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "-22px",
            }}
          >
            <img
              src={round}
              alt='Image Description'
              style={{ width: "23px", height: "23px", marginLeft: "1px" }}
            />
            <p style={{ color: "black", marginLeft: "10px" }}>0x..fc5</p>
            <img
              src={right}
              alt='Image Description'
              style={{ width: "33px", height: "33px", marginLeft: "40px" }}
            />
            <img
              src={round}
              alt='Image Description'
              style={{ width: "23px", height: "23px", marginLeft: "50px" }}
            />
            <p style={{ color: "black", marginLeft: "10px" }}>0x..vg7</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-18px",
            }}
          >
            <h4 style={{ color: "black" }}>Transaction</h4>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-28px",
            }}
          >
            <p style={{ color: "black" }}>Nonce</p>
            <p style={{ color: "black" }}>11</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-28px",
            }}
          >
            <p style={{ color: "black" }}>Amount</p>
            <p style={{ color: "black" }}>0.08456611 ETH</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-28px",
            }}
          >
            <p style={{ color: "black" }}>Gas Limit (Units)</p>
            <p style={{ color: "black" }}>21000</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-28px",
            }}
          >
            <p style={{ color: "black" }}>Gas price</p>
            <p style={{ color: "black" }}>1.500160562</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "-28px",
            }}
          >
            <p style={{ color: "black" }}>Total</p>
            <p style={{ color: "black" }}>0.08459761 ETH</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Activity;
