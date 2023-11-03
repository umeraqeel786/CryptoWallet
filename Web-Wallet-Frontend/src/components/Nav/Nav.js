import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import InputBase from "@mui/material/InputBase";
import round from "../../assets/round.png";
import UserDetails from "../../services/userDetails";
import registerUser from "../../services/auth.registerUser";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress, addUserBalance } from "../../store/slices/UserSlices";
import eth from "../../assets/eth.png";
import goreli from "../../assets/goreli.png";
import sepolia from "../../assets/sepolia.png";
import linea from "../../assets/linea.png";
import lineaEth from "../../assets/lineaEth.png";
import polygon from "../../assets/polygon.png";
import { Switch } from "@mui/material";
import { Spinner } from "react-bootstrap";
import ReactLoading from "react-loading";



const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Nav = (props) => {
  const addresses = useSelector((state) => state.user.addresses);

  const id = useSelector((state) => state.user.id);
  const [opened, setOpen] = useState(false);
  const [addForBal, setAddForBal] = useState([]);
  const [getBal, setBal] = useState([]);
  const [bal, isBal] = useState(false);
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const navigate = useNavigate();
  const [show1, setShow1] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getOn, setOn] = React.useState(null);
  const open = Boolean(anchorEl);
  const openDot = Boolean(getOn);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {};
    fetch();
  });

  const handleOpenDialog = async () => {
    setOpen(true);
    const res = await UserDetails.getUserAccount(id);
    console.log(res.data);
    
    const bal = await UserDetails.getUserBalanceByAddresses(res.data);
    console.log("accBalance", bal);
    setBal(bal);
    setAddForBal(res.data);
    isBal(true);

    setDone(true);
  };

  const addAccount = async () => {
    const data = await registerUser.addAccount(id);
    console.log("Account Added", data);
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClickDot = (event) => {
    setOn(event.currentTarget);
  };

  const handleCloseDot = () => {
    setOn(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickSetting = () => {
    navigate("/settings");
  };

  const [openNetwork, setNetworkOpen] = useState(false);

  const handleOpenNetworkDialog = () => {
    setNetworkOpen(true);
  };

  const handleCloseNetworkDialog = () => {
    setNetworkOpen(false);
  };
  const [showTestNetworks, setShowTestNetworks] = useState(false);

  const handleToggle = () => {
    setShowTestNetworks(!showTestNetworks);
  };

  const networks = ["Ethereum Mainnet", "Linea Mainnet", "Polygon"];

  const testNetworks = ["Goreli", "Sepolia", "Linea Goreli"];

  const networkImages = [eth, linea, polygon];
  const testNetworkImages = [goreli, sepolia, lineaEth];

  const handleValue = async (e) => {
    console.log(e.target.value);
    console.log("UserId");
    const bal = await UserDetails.getUserBalanceByAddress(e.target.value);
    console.log("getRegisterUserByAddress", bal);
    dispatch(addUserBalance(bal.data));
    dispatch(addUserAddress(e.target.value));
    setOpen(false);
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

  const ITEM_HEIGHT = 48;
  return (
    <AppBar sx={{ bgcolor: "#282c34" }} position='static'>
      <Toolbar>
        <Button
          sx={{ bgcolor: "#1b1e22" }}
          variant='contained'
          onClick={handleOpenNetworkDialog}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Networks
        </Button>
        <Box>
          <Dialog
            open={openNetwork}
            onClose={handleCloseNetworkDialog}
            maxWidth='sm'
          >
            <DialogContent sx={{ backgroundColor: "#282c34" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: "white" }}>Select an Network</p>
                <button
                  onClick={handleCloseNetworkDialog}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                  </svg>
                </button>
              </div>

              <InputBase
                placeholder='Search'
                inputProps={{ "aria-label": "search" }}
                sx={{
                  color: "silver",
                  border: "1px solid white",
                  marginTop: "1px",
                  width: "100%",
                  borderRadius: "10px",
                  height: "35px",
                }} // Changing the placeholder text color to silver
              />

              <div
                style={{
                  overflowY: "scroll",
                  height: "130px",
                  marginTop: "10px",
                }}
              >
                {networks.map((network, index) => (
                  <a
                    key={index}
                    href='#'
                    style={{
                      textDecoration: "none",
                      color: "white",
                      display: "block",
                      transition: "background-color 0.3s",
                    }}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      style={{ marginTop: "10px" }}
                    >
                      <img
                        src={networkImages[index]} // Use the corresponding image source
                        alt={`Network ${index + 1}`}
                        style={{
                          width: "25px",
                          height: "25px",
                          marginRight: "10px",
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          marginLeft: "-1px",
                        }}
                      >
                        <p>{network}</p>
                      </div>
                    </Box>
                  </a>
                ))}
              </div>

              <div>
                <Box
                  display='flex'
                  alignItems='center'
                  style={{ marginTop: "10px" }}
                >
                  <Typography
                    sx={{
                      color: "#1098fc",
                      textDecoration: "none",
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    Show test networks
                  </Typography>
                  <Switch
                    sx={{ marginLeft: "80px" }}
                    checked={showTestNetworks}
                    onChange={handleToggle}
                    color='primary'
                  />
                </Box>

                {showTestNetworks && (
                  <div
                    style={{
                      overflowY: "scroll",
                      height: "130px",
                      marginTop: "1px",
                    }}
                  >
                    <div>
                      {testNetworks.map((network, index) => (
                        <a
                          key={index}
                          href='#'
                          style={{
                            textDecoration: "none",
                            color: "white",
                            display: "block",
                            transition: "background-color 0.3s",
                          }}
                        >
                          <Box
                            display='flex'
                            alignItems='center'
                            style={{ marginTop: "10px" }}
                          >
                            <img
                              src={testNetworkImages[index]} // Use the corresponding image source
                              alt={`Network ${index + 1}`}
                              style={{
                                width: "25px",
                                height: "25px",
                                marginRight: "10px",
                              }}
                            />
                            <div
                              style={{
                                flex: 1,
                                marginLeft: "-1px",
                              }}
                            >
                              <p>{network}</p>
                            </div>
                          </Box>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // Center horizontally within the row
                }}
              >
                <Box
                  component='button'
                  sx={{
                    width: "300px",
                    height: "35px",
                    backgroundColor: "transparent",
                    border: "2px solid #1098fc",
                    borderRadius: "20px",
                    padding: "6px 12px",
                    fontSize: "16px",
                    color: "#1098fc",
                    "&:hover": {
                      backgroundColor: "#1098fc",
                      color: "white",
                    },
                  }}
                >
                  Add Network
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>

        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Button
            style={{ marginLeft: "-90px" }}
            sx={{ bgcolor: "#282c34" }}
            id='demo-customized-button'
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            variant='contained'
            disableElevation
            onClick={handleOpenDialog}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <b>Accounts</b>
          </Button>

          <Box>
            <Dialog open={opened} onClose={handleCloseDialog} maxWidth='sm'>
              <DialogContent sx={{ backgroundColor: "#282c34" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ color: "white" }}>Select an account</p>
                  <button
                    onClick={handleCloseDialog}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <line x1='18' y1='6' x2='6' y2='18' />
                      <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                  </button>
                </div>

                <InputBase
                  placeholder='Search accounts'
                  inputProps={{ "aria-label": "search" }}
                  sx={{
                    color: "silver",
                    border: "1px solid white",
                    marginTop: "1px",
                    width: "100%",
                    borderRadius: "10px",
                    height: "35px",
                  }} // Changing the placeholder text color to silver
                />

                <div
                  style={{
                    overflowY: "scroll",
                    height: "150px",
                    marginTop: "10px",
                  }}
                >
                  {!bal ? (
                    <>
                    <div style={{marginLeft: "100px", marginTop: "50px"}}>
                      <ReactLoading
                        type={"bars"}
                        color={"#1098fc"}
                        height={70}
                        width={70}
                      />
                      </div>
                    </>
                  ) : (
                    addForBal.map((account, index) => (
                      <a
                        key={index}
                        onClick={handleValue}
                        value={account.address}
                        href='#' // Provide a meaningful link or handle the click event
                        style={{ textDecoration: "none", color: "white" }} // Remove underline and set text color
                      >
                        <Box
                          display='flex'
                          alignItems='center'
                          style={{ marginTop: "10px" }}
                        >
                          <img
                            src={round} // Replace with the actual image source
                            alt={`Account ${index + 1}`}
                            style={{
                              width: "25px",
                              height: "25px",
                              marginRight: "10px",
                            }} // Customize image size
                          />

                          <div
                            style={{
                              flex: 1,
                              marginLeft: "-1px", // Customize the left margin
                            }}
                          >
                            <p>
                              Account {index + 1}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {bal && <>{getBal[index].data.toFixed(5)} ETH  </>}
                            </p>
                            <p style={{ marginTop: "-10px" }}>
                              <option value={account.address}>
                                <PartiallyHiddenText
                                  text={account.address}
                                  visibleChars={8}
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                {bal && (
                                  <>{getBal[index].data.toFixed(5)} ETH </>
                                )}
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                              </option>
                            </p>{" "}
                            {/* Add margin from the top */}
                          </div>
                        </Box>
                      </a>
                    ))
                  )}
                </div>

                <p
                  style={{
                    marginTop: "40px",
                  }}
                >
                  <span
                    style={{
                      color: "#1098fc",
                      cursor: "pointer",
                      textDecoration: "none",
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottom = "1px solid #1098fc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottom =
                        "1px solid transparent";
                    }}
                    onClick={addAccount}
                  >
                    Add Account
                  </span>
                </p>

                <p>
                  <span
                    style={{
                      color: "#1098fc",
                      cursor: "pointer",
                      textDecoration: "none",
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottom = "1px solid #1098fc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottom =
                        "1px solid transparent";
                    }}
                    onClick={() => {
                      // Handle the click event here
                    }}
                  >
                    Import account
                  </span>
                </p>

                <p>
                  <span
                    style={{
                      color: "#1098fc",
                      cursor: "pointer",
                      textDecoration: "none",
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottom = "1px solid #1098fc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottom =
                        "1px solid transparent";
                    }}
                    onClick={() => {
                      // Handle the click event here
                    }}
                  >
                    Add Hardware Wallet
                  </span>
                </p>
              </DialogContent>
            </Dialog>
          </Box>
        </Typography>

        <IconButton
          sx={{ color: "white" }}
          aria-label='more'
          id='long-button'
          aria-controls={openDot ? "long-menu" : undefined}
          aria-expanded={openDot ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <StyledMenu
          id='demo-customized-menu'
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={onClickSetting} disableRipple>
            Setting
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            Account Details
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            Notifications
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={handleClose} disableRipple>
            More
          </MenuItem>
        </StyledMenu>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
