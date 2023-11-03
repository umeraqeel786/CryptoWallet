import * as React from "react";
import Header from "./Header/Header";
import Container from "@mui/material/Container";
import MetaTab from "./Tabs/Tab";
import Nav from "./Nav/Nav";
import Cart from "./Cart/Cart";
import { useEffect } from "react";
import UserDetails from "../services/userDetails";
import "../App.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAddress,
  addUserBalance,
  addUserAccounts,
  addUserAddresses,
} from "../store/slices/UserSlices";
import Lottie from "react-lottie";

import * as location from "../1055-world-locations.json";
import * as success from "../1127-success.json";

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Dashboard() {
  const [data, setData] = React.useState([]);
  const [loading, setloading] = React.useState(undefined);
  const [completed, setcompleted] = React.useState(undefined);

  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
   
    setloading(true);
    const fetchData = async () => {
      console.log("UserId", id);
      const res = await UserDetails.getUserAccount(id);
      console.log("getUserAccount", res.data);
      const bal = await UserDetails.getUserBalanceByAddress(
        res.data[0].address
      );
      console.log("getRegisterUserByAddress", bal.data);
      const acc = await UserDetails.getAllUserAccounts();
      console.log("Send", acc.data);
      dispatch(addUserAccounts(acc.data));
      dispatch(addUserBalance(bal.data));
      dispatch(addUserAddress(res.data[0].address));
      dispatch(addUserAddresses(res.data));
      
      setcompleted(true);
    };

    fetchData().catch(console.error);
  }, [location.state, dispatch]);

  return (
    <>
      {!completed ? (
        <>
          {!loading ? (
            <Lottie options={defaultOptions2                                                                                            } height={200} width={200} />
          ) : (
            <Lottie options={defaultOptions1} height={100} width={100} />
          )}                                            
        </>
      ) : (
        <>
          <Header />
          <Container fixed>
            <Nav />
            <Cart />
            <MetaTab />
          </Container>
        </>
      )}
    </>
  );
}

export default Dashboard;
