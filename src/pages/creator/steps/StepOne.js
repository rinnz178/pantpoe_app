/** @format */

import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import { CButton } from "./../../../layout/CCButton";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { useSubscriptionContext } from "../../../context/SubscriptionContext";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "10px",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      padding: "10px",
    },
    "& h2": {
      textAlign: "center",
    },
  },
  container: {
    width: "90vw",
    maxWidth: "700px",
    textAlign: "start",
    height: "auto",
    padding: "0px 20px",

    [theme.breakpoints.only("xs")]: {
      padding: "5px",
    },
  },
  categories: {
    padding: " 20px 30px",
  },
  subtitle: {
    textTransform: "uppercase",
    display: "block",
    marginBottom: "20px",
  },
}));

const StepOne = () => {
  const { categories, getCategories } = useSubscriptionContext();
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    selected: JSON.parse(localStorage.getItem("selectedCategory")) || [],
    pass: true,
  });

  React.useEffect(() => {
    let getData = true;
    if (getData) getCategories();
    return () => {
      getData = false;
    };
  }, []);

  React.useEffect(() => {
    let len = state.selected.length;
    if (len > 0) {
      setState((prev) => ({ ...prev, pass: false }));
    }
  }, [state?.selected]);

  const handleChange = (id) => {
    const { selected } = state;
    let newlist = categories.map((item) => {
      let find = selected.indexOf(id);

      if (find > -1) {
        selected.splice(find, 1);
      } else {
        selected.push(id);
      }

      setState((prev) => ({
        selected: selected,
        pass: selected.length > 0 ? false : true,
      }));

      localStorage.setItem("selectedCategory", JSON.stringify(selected));

      // props.getTiers(state.selected);
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Grid container>
          <Grid item sm={12} md={8}>
            <span className={classes.subtitle}>Step 1 of 2</span>
            <Typography variant="h4" component="div" gutterBottom={false}>
              What describes your content?
            </Typography>
            <span className="cText">
              You can pick up more than one categories
            </span>
            <Grid container className={classes.categories}>
              <Grid item xs={12} sm={12} md={6}>
                <FormGroup>
                  {categories.map((category, index) => {
                    const { id, name } = category;
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={state.selected.includes(id)}
                            onChange={(e) => handleChange(id)}
                          />
                        }
                        label={name}
                      />
                    );
                  })}
                </FormGroup>
              </Grid>
            </Grid>
            <CButton
              disabled={state.pass}
              onClick={() => history.push("/step/2")}
            >
              Continue
            </CButton>
          </Grid>
          <Grid item sm={12} md={4} style={{ position: "relative" }}>
            <Box
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                backgroundImage:
                  'url("https://st2.depositphotos.com/4960035/7335/v/380/depositphotos_73351963-stock-illustration-creative-writing-concept.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "none",
                backgroundPosition: "center center",
              }}
            ></Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const Wrapper = styled.section`
  max-height: 100vh;
  margin-top: 10vh;
  display: grid;
  padding: 10px;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 800px;
    text-align: start;
    border: 1px solid rgb(229, 227, 221);
    border-radius: 4px;
    height: auto;
    padding: 20px;
  }
`;
export default StepOne;
