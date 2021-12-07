import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({}));
const convert = (grade) => {
  const convert = grade;
  let final;
  convert == "A+"
    ? (final = 10)
    : convert == "A"
    ? (final = 9)
    : convert == "B+"
    ? (final = 8)
    : convert == "B"
    ? (final = 7)
    : convert == "C+"
    ? (final = 6)
    : convert == "C"
    ? (final = 5)
    : (final = -1);
  return final;
};
let calculated = -100,
  backlog = 0;

const Spi = () => {
  const classes = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault();
    let sum = 0;
    let sum1 = 0;
    backlog = 0;
    for (let i = 0; i < subjects.length; i++) {
      console.log(subjects[i].grade, " ", subjects[i].credit);
      const grade = convert(subjects[i].grade);
      if (grade == -1) {
        backlog = 1;
      }
      sum += parseFloat(subjects[i].credit) * grade;
      sum1 += parseFloat(subjects[i].credit);
    }
    // for (let subject in subjects) {
    //   const grade = convert(subject.grade);
    //   sum += subject.credit * grade;
    //   sum1 += subject.credit;
    // }
    // console.log(sum, sum1);
    let tempSPI = sum / sum1;
    setSPI(tempSPI);
    console.log(SPI);
    setPercent(-100);
    calculated = 1;
  };
  const [subjects, setSubjects] = useState([
    { name: null, credit: null, grade: null },
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

  const handleChangeGrade = (i, event) => {
    const values = [...subjects];
    values[i].grade = event.target.value;
    console.log(values[i].grade);
    console.log(values[i].grade, "*");
    setSubjects(values);
  };
  const handleAdd = () => {
    const values = [...subjects];
    values.push({ name: null, credit: null, grade: null });
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
            Add Subject
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={(event) => handleSubmit(event)}
            variant="outlined"
            style={{ color: "green" }}
          >
            Calculate SPI
          </Button>
        </Grid>
        {SPI == -100 ? null : backlog == 0 ? (
          <Grid item>
            <Button
              onClick={percentage}
              variant="outlined"
              style={{ color: "green" }}
            >
              Convert SPI to Percentag
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        direction="row"
        style={{ margin: "10px" }}
      >
        {SPI == -100 ? null : backlog == 0 ? (
          <div>
            Congratulation!!!!
            <br />
            Your SPI is {SPI}.
            <br />
            {percent == -100 ? null : (
              <div>Your SPI in percentage is {percent}.</div>
            )}
          </div>
        ) : (
          <div>Sorry, You Have IF!!!!</div>
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
                      label="Enter Subject Name"
                      variant="outlined"
                      type="text"
                      name="Enter Subject Name"
                      value={subject.name || ""}
                      onChange={(e) => handleChangeName(idx, e)}
                      fullWidth
                    />
                  </Grid>
                  {/* <Grid item xs={6} md={4}> */}
                  <Grid item>
                    <TextField
                      id="outlined-basic-email"
                      label="Enter Subject Credit"
                      variant="outlined"
                      type="text"
                      name="Enter Subject Credit"
                      value={subject.credit || ""}
                      onChange={(e) => handleChangeCredit(idx, e)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      id="outlined-basic-email"
                      label="Enter Grade Received"
                      variant="outlined"
                      type="text"
                      name="Enter Grade Received"
                      value={subject.grade || ""}
                      onChange={(e) => handleChangeGrade(idx, e)}
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

export default Spi;
