/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  categories,
  getCategory,
  category_id = 0,
  error = {},
}) {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(value);
    setCategory(value);
    getCategory(value);
  };

  React.useEffect(() => {
    setCategory(category_id);
  }, [category_id]);

  return (
    <Box sx={{ minWidth: 120, marginTop: "16px" }}>
      <FormControl
        fullWidth
        error={Object.keys(error).length > 0 ? true : false}>
        <InputLabel id="demo-simple-select-label">Required</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Required"
          onChange={handleChange}>
          <MenuItem value={0}>Choose One!</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
