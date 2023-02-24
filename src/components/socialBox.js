/** @format */

import React from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CusFormInput, CusOptions } from "../styled/styles";
import SelectLabels from "../layout/SelectOption";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { socialIcons } from "../assets/data";
import { changeSocials } from "../helpers/Constant";
const linkItem = {
  name: "",
  value: "",
  id: 0,
};
const SocialBox = ({ submitLinks, data = [] }) => {
  const [link, setLink] = React.useState(linkItem);
  const [list, setList] = React.useState([]);
  const [error, setError] = React.useState({});

  const handleChange = (data) => {
    console.log(data);
    setLink((prev) => ({
      ...prev,
      name: socialIcons.find((p) => p.id === data)?.name,
      id: data,
    }));
  };
  const handleInput = (event) => {
    const { value, name } = event.target;

    setLink((prev) => ({
      ...prev,
      value,
    }));
  };

  const validate = () => {
    if (link.name === "") {
      setError((prev) => ({ ...prev, msg: "Please Select Type" }));
    } else if (link.value === "") {
      setError((prev) => ({ ...prev, msg: "Please Enter Link" }));
    } else {
      setError((prev) => ({ ...prev, msg: "" }));

      return false;
    }

    return true;
  };

  const addToList = () => {
    const status = validate();

    if (!status) {
      let acc = [];
      acc.push(link.name);
      acc.push(link.value);
      let newList = list;
      newList.push(acc);
      setList(newList);
      submitLinks(newList);
      setLink(linkItem);
      setError({});
    }
  };

  const removeLink = (i) => {
    let newSocials = list.filter((data, index) => index !== i);
    setList(newSocials);
    submitLinks(newSocials);
  };

  React.useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);
  return (
    <CusFormInput>
      <CusOptions>
        <h5 className="input-label"> Links </h5>
        {Object.keys(error).length > 0 && (
          <span className="invalid">{error.msg}</span>
        )}
        
      </CusOptions>
      <SelectLabels style={{marginLeft:"20vh",backgroundColor:'white'}}
        data={socialIcons}
        handleChange={handleChange}
        fullWidth={true}
        selected={link.id}

      />
      <CusOptions>
        <TextField
        
          id="standard-basic"
          inputProps={{ "aria-label": "Without label" }}
          name="value"
          fullWidth
          style={{ marginTop: "20px" }}
          value={link.value}
          variant="standard"
          onChange={handleInput}
          placeholder="https://www.example.com/..."
        />
        <IconButton style={{ marginTop: "20px" }} onClick={addToList}>
          <AddBoxIcon fontSize="large" />
        </IconButton>
      </CusOptions>
      <List>
        {list.map((acc, index) => {
          return (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeLink(index)}
                >
                  <RemoveCircleOutlineSharpIcon />
                </IconButton>
              }
            >
              <ListItemText primary={acc[1]} secondary={acc[0]} />
            </ListItem>
          );
        })}
      </List>
    </CusFormInput>
  );
};

export default SocialBox;
