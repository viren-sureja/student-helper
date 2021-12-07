import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "./AboutUs.css";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SchoolIcon from "@material-ui/icons/School";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import WhyUs from "./WhyUs";
const useStyles = makeStyles((theme) => ({}));
const AboutUs = () => {
  const classes = useStyles();

  const card = (name, university, city) => {
    return (
      <div className="aboutUs_card">
        <center>
          <div className="aboutUs_div">
            <div className="aboutUs_content">
              <div className="aboutUs_together aboutUs_primary-text">
                <PersonIcon />
                <Typography variant="h5" style={{ marginLeft: "8px" }}>
                  {name}
                </Typography>
              </div>
              <div className="aboutUs_together aboutUs_secondary-text">
                <SchoolIcon />
                <Typography variant="subtitle1" style={{ marginLeft: "8px" }}>
                  {university}
                </Typography>
              </div>
              <div className="aboutUs_together aboutUs_secondary-text">
                <LocationOnIcon />
                <Typography variant="subtitle1" style={{ marginLeft: "8px" }}>
                  {city}
                </Typography>
              </div>
            </div>
            <div className="aboutUs_social">
              <div className="aboutUs_background ">
                <IconButton aria-label="mail">
                  <EmailIcon
                    className="aboutUs_secondary-text"
                    fontSize="large"
                  />
                </IconButton>
              </div>

              <div
                className="aboutUs_background"
                style={{ marginLeft: "10px" }}
              >
                <IconButton aria-label="linkedin">
                  <LinkedInIcon
                    className="aboutUs_secondary-text"
                    fontSize="large"
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  };
  return (
    <div style={{ backgroundColor: "gray" }} id="AboutUs">
      <div style={{ paddingBlock: "30px" }}>
        <div data-aos="fade-up">
          <Typography variant="h5" align="center">
            About Us
          </Typography>
        </div>
        <div data-aos="fade-up">
          <Typography
            variant="subtitle1"
            align="center"
            style={{ margin: "20px" }}
          >
            We at StudentHelper tries to solve the some of the problems faced by
            the students. We tried to solve three problems in a single place,
            which we also faced as students. The first one was that there is not
            even a single platform via which students can get updated with the
            current activities in their college, or ask doubt regarding
            academics or other campus activities. So our knowledge sharing
            platform(StudentHelper Network is built for that). Second one was
            that we also don't have any platform for exchanging old college
            stuff with seniors and juniors, What we used to do is we make
            whatsapp groups and via that group we contact each others, but this
            is not a convenient way, because everyone has to go through all the
            messages and because of this some good deals might be missed. So our
            trading platform(StudentHelper Store is built for that). The third
            one is that in our college we don't get directly SPI/CPI in the
            result, College only sends Grades of particular subjects and we have
            to remember credit of each subject and from that, we have to
            calculate SPI/CPI, It is not difficult for the current semester, but
            what if we want to calculate for the previous semester? It is not
            possible to remember the credit of every subject we studied till the
            date. So our SPI/CPI calculator is built for that.
          </Typography>
        </div>
        <Grid container justify="center" alignItems="center">
          <Grid
            container
            justify="center"
            alignItems="center"
            // spacing={1}

            lg={9}
            md={11}
            sm={12}
          >
            <Grid item xs={12} md={4} style={{ marginBlock: "20px" }}>
              <div data-aos="zoom-in-up">
                <center>
                  {card(
                    "Dharansh Patel",
                    "CSE, Nirma University",
                    "Ahmedabad, Gujarat"
                  )}
                </center>
              </div>
            </Grid>

            <Grid item xs={12} md={4} style={{ marginBlock: "20px" }}>
              <div data-aos="zoom-in-up">
                <center>
                  {card(
                    "Shivam Bhalodia",
                    "CSE, Nirma University",
                    "Rajkot, Gujarat"
                  )}
                </center>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <WhyUs />
      </div>
    </div>
  );
};

export default AboutUs;
