import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({}));

let calculated = -100;
const Cpi = () => {
  const classes = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault();
    let sum = 0;
    let sum1 = 0;
    for (let i = 0; i < subjects.length; i++) {
      console.log(subjects[i].credit, " ", subjects[i].spi);

      //   if (spi == -1) {
      //     backlog = 1;
      //   }
      sum += parseFloat(subjects[i].credit) * parseFloat(subjects[i].spi);
      sum1 += parseFloat(subjects[i].credit);
      console.log(sum, sum1);
    }
    // for (let subject in subjects) {
    //   const spi = convert(subject.spi);
    //   sum += subject.credit * spi;
    //   sum1 += subject.credit;
    // }

    let tempSPI = sum / sum1;
    setSPI(tempSPI);
    // console.log(SPI);
    setPercent(-100);
    calculated = 1;
  };
  const [subjects, setSubjects] = useState([
    { name: null, credit: null, spi: null },
  ]);
  const [SPI, setSPI] = useState(-100);
  const [percent, setPercent] = useState(-100);
  const handleChangeName = (i, event) => {
    const values = [...subjects];
    values[i].name = event.target.value;
    console.log(values[i].name, "*");
    setSubjects(values);
  };

  const handleChangeCredit = (i, event) => {
    const values = [...subjects];
    values[i].credit = event.target.value;
    console.log(values[i].credit, "*");
    setSubjects(values);
  };

  const handleChangespi = (i, event) => {
    const values = [...subjects];
    values[i].spi = event.target.value;
    console.log(values[i].spi);
    console.log(values[i].spi, "*");
    setSubjects(values);
  };
  const handleAdd = () => {
    const values = [...subjects];
    values.push({ name: null, credit: null, spi: null });
    setSubjects(values);
  };

  const handleRemove = (i) => {
    const values = [...subjects];
    values.splice(i, 1);
    setSubjects(values);
  };

  const percentage = () => {
    let temp = parseFloat(SPI) - 0.5;
    temp *= 10;
    setPercent(temp);
  };

  return (
    <div style={{ margin: "30px" }}>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        direction="row"
      >
        <Grid item>
          <Button
            // type="submit"
            onClick={() => handleAdd()}
            variant="outlined"
            style={{ color: "green" }}
          >
            Add Semester
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={(event) => handleSubmit(event)}
            variant="outlined"
            style={{ color: "green" }}
          >
            Calculate CPI
          </Button>
        </Grid>

        {SPI == -100 ? null : (
          <Grid item>
            <Button
              onClick={percentage}
              variant="outlined"
              style={{ color: "green" }}
            >
              Convert CPI to Percentag
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        direction="row"
        style={{ margin: "10px" }}
      >
        {SPI == -100 ? null : (
          <div>
            Congratulation!!!!
            <br />
            Your CPI is {SPI}.
            <br />
            {percent == -100 ? null : (
              <div>Your CPI in percentage is {percent}.</div>
            )}
          </div>
        )}
      </Grid>
      <form
        // onSubmit={() => handleSubmit()}
        style={{ width: "100%" }}
        autoComplete="off"
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={5}
          direction="column"
          style={{ margin: "10px" }}
        >
          {subjects.map((subject, idx) => {
            return (
              <div key={`${subject}-${idx}`} style={{ margin: "15px" }}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={2}
                  direction="row"
                >
                  {/* <Grid item xs={6} md={4}> */}
                  <Grid item>
                    <TextField
                      id="outlined-basic-email"
                      label="Enter Semester Number"
                      variant="outlined"
                      type="text"
                      name="Enter Semester Number"
                      value={subject.name || ""}
                      onChange={(e) => handleChangeName(idx, e)}
                      fullWidth
                    />
                  </Grid>
                  {/* <Grid item xs={6} md={4}> */}
                  <Grid item>
                    <TextField
                      id="outlined-basic-email"
                      label="Enter Semester Credit"
                      variant="outlined"
                      type="text"
                      name="Enter Semeste Credit"
                      value={subject.credit || ""}
                      onChange={(e) => handleChangeCredit(idx, e)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      id="outlined-basic-email"
                      label="Enter spi Received"
                      variant="outlined"
                      type="text"
                      name="Enter spi Received"
                      value={subject.spi || ""}
                      onChange={(e) => handleChangespi(idx, e)}
                      fullWidth
                    />
                  </Grid>
                  {/* <input
              type="text"
              placeholder="Enter text"
              value={field.value || ""}
              onChange={e => handleChange(idx, e)}
            /> */}

                  <Grid item>
                    <IconButton aria-label="delete">
                      <DeleteIcon
                        className="aboutUs_secondary-text"
                        fontSize="large"
                        onClick={() => handleRemove(idx)}
                      />
                    </IconButton>
                    {/* <button type="button" onClick={() => handleRemove(idx)}>
                      X
                    </button> */}
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Grid>
      </form>
    </div>
  );
};

export default Cpi;
