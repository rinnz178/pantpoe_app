/** @format */

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    height: "400px",
  },
  lists: {
    position: "absolute",
    height: "400px",
    overflow: "hidden",
    overflowY: "scroll",
    scrollBehavior: "smooth",
  },
  listItem: {
    border: "1px solid #333",
    marginTop: "10px",
  },
  question: {
    fontWeight: 700,
  },
  answer: {
    color: "#91938a",
  },
}));

export default function SimpleAccordion({ row }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.lists}>
        {row.map((item, index) => (
          <Accordion key={index} className={classes.listItem}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography
                variant="subTitle1"
                className={classes.question}
                component={"div"}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                component={"div"}
                className={classes.answer}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
