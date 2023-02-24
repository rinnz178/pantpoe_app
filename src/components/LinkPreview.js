/** @format */

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { customFetcher } from "../helpers/Constant";
const useStyles = makeStyles((theme) => ({
  cusCard: {
    marginBottom: "20px",
  },
}));
const LinkPreview = ({ link }) => {
  const classes = useStyles();
  const [linkdata, setLinkData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [more, setMore] = React.useState(true);
  // console.log(link);
  React.useEffect(() => {
    customFetcher(link)
      .then((data) => {
        if (data !== "") {
          setLinkData(data);
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
  }, [link]);

  if (loading) {
    return <h3>loading...</h3>;
  }
  console.log(linkdata);
  const { image, description, title, url } = linkdata;

  return (
    <Card className={classes.cusCard}>
      {linkdata?.image && (
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image={image}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {more ? description.substring(1, 200) : description}
          {!more && (
            <Button variant="text" onClick={() => setMore(true)}>
              Less Details
            </Button>
          )}
          {more && (
            <Button variant="text" onClick={() => setMore(false)}>
              ...More Details
            </Button>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={url} target="_blank">
          <Button size="small">Learn More</Button>
        </a>
      </CardActions>
    </Card>
  );
};

export default LinkPreview;
