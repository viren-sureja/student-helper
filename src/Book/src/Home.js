import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Hero from "./Hero";
import Options from "./Options";
import AboutUs from "./AboutUs";
import Features from "./Features";
import Footer from "./Footer";
import Navbar from "./Navbar";
const useStyles = makeStyles((theme) => ({}));
const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <Hero />
      <Options />
      <Features />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
