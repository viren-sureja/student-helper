import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SendIcon from "@material-ui/icons/Send";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import Spi from "./Spi";
import LaptopIcon from "@material-ui/icons/Laptop";
import BookNavbar from "../Book/BookNavbar";
import Cpi from "./Cpi";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
const useStyles = makeStyles((theme) => ({}));
const Calculator = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {/* <BookNavbar /> */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        centered
        aria-label="icon label tabs example"
        style={{
          marginInline: `${isMobile ? "" : "200px"}`,
          marginTop: "10px",
        }}
      >
        <Tab icon={<LaptopIcon />} label="Calculate SPI" />
        <Tab icon={<PhoneAndroidIcon />} label="Calculate CPI" />
      </Tabs>
      {value == 0 ? <Spi /> : <Cpi />}
    </div>
  );
};

export default Calculator;
