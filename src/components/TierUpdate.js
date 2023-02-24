/** @format */

import React, { useRef } from "react";

import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getFullUrl, BaseUrl } from "../helpers/Constant";
import Editor from "./Editor";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  cusFormInput: {
    textAlign: "start",
    padding: " 10px 0px",

    "& label": {
      color: "#333333",
      padding: "18px 0px",
      marginBottom: "8px",
    },
    "& .inputField": {
      margin: "0.5rem 0px",
      background: "rgb(245, 244, 242)",
    },
  },
  cusOptions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logodiv: {
    marginLeft: "0px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "0px",
    },
  },
}));

const initialData = {
  id: "",
  level: "",
  description: "",
  photo: "",
  price: "",
};

const TierUpdate = ({ data }) => {
  const classes = useStyles();
  const photo = useRef(null);
  const { token } = useAuthContext();

  const NewgetValue = (value) => {
    setUpdateData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const [updateData, setUpdateData] = React.useState(initialData);

  const inputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setUpdateData((prev) => ({
        ...prev,
        photo: files[0],
      }));
    } else {
      setUpdateData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const editTier = (id) => {
    setUpdateData((prev) => ({
      ...prev,
      id,
    }));
  };

  const updateTier = (id) => {
    let formData = new FormData();
    formData.append(
      "level",
      updateData.level.length > 0 ? updateData.level : data.level
    );
    formData.append(
      "price",
      updateData.price.length > 0 ? updateData.price : data.price
    );
    formData.append("description", updateData.description);
    formData.append("image", updateData.photo ? updateData.photo : data.image);
    formData.append("_method", "put");

    axios({
      url: `${BaseUrl}/subscription-plan/${id}`,
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.success) {
          setUpdateData(initialData);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box
      className={classes.cusFormControl}
      style={{ textAlign: "start", alignmentBaseline: "central" }}>
      <Box className={classes.cusOptions}>
        <h5 className="input-label"> Tiers </h5>
        {updateData.id === data.id || (
          <Button onClick={() => editTier(data.id)}>Edit</Button>
        )}

        {updateData.id === data.id && (
          <Button onClick={() => updateTier(data.id)}>Update</Button>
        )}
      </Box>
      {/* name  */}
      <Grid container mt={3}>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            style={{ margin: "1em" }}
            gutterBottom
            component="div">
            Tier Name
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            defaultValue={data.level}
            name="level"
            inputProps={{
              "aria-label": "Without label",
              readOnly: data.id === updateData.id ? false : true,
            }}
            placeholder="sample"
            onChange={inputChange}
          />
        </Grid>
      </Grid>
      {/* logo  */}
      <Grid container mt={3} alignItems={"start"}>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            style={{ margin: "1em" }}
            gutterBottom
            component="div">
            Tier Logo
          </Typography>
        </Grid>
        <Grid item xs={8} className={`${classes.logodiv}`}>
          <div
            className={updateData.id === data.id ? "imgDiv" : ""}
            onClick={() => updateData.id === data.id && photo.current.click()}
            disabled={true}
            style={{
              backgroundImage: `url('${
                updateData.photo === ""
                  ? getFullUrl(data.image)
                  : window.URL.createObjectURL(updateData.photo)
              }')`,
              width: "80px",
              height: "80px",
              backgroundSize: "cover",
              marginLeft: "0px",
            }}
            loading="lazy"></div>
          <input
            style={{ display: "none" }}
            type="file"
            ref={photo}
            onChange={inputChange}
            name="photo"
            accept="image/*"
            className={classes.hidddendiv}
          />
        </Grid>
      </Grid>
      {/* price */}
      <Grid container mt={3}>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            style={{ margin: "1em" }}
            gutterBottom
            component="div">
            Tier price
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            name="price"
            defaultValue={data.price}
            inputProps={{
              "aria-label": "Without label",
              readOnly: data.id === updateData.id ? false : true,
            }}
            placeholder="0,000,000"
            onChange={inputChange}
          />
        </Grid>
      </Grid>

      {/* desc  */}
      <Grid container mt={3}>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            style={{ margin: "1em" }}
            gutterBottom
            component="div">
            Description
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          style={{ display: data.id === updateData.id ? "none" : "block" }}
          dangerouslySetInnerHTML={{
            __html: `${data.description}`,
          }}></Grid>
        <Grid
          item
          xs={8}
          style={{ display: data.id === updateData.id ? "block" : "none" }}>
          <Editor contents={data.description} getValue={NewgetValue}></Editor>
        </Grid>
      </Grid>

      {/* benefit  */}
      <Grid container mt={3} display={"none"}>
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            style={{ margin: "1em" }}
            gutterBottom
            component="div">
            Benefit
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            inputProps={{ "aria-label": "Without label" }}
            placeholder="text"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TierUpdate;
