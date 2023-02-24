/** @format */

import { Grid } from "@mui/material";
import { Item } from "../layout/CustomSection";
import SearchInput from "../layout/SearchInput";
import Sectiontitle from "../layout/SectionTitle";
import { CustomButton } from "../layout/CutomerButton";

// const useStyle = makeStyles((theme) => ({
//   section: {
//     margin: theme.spacing(1),
//   },
// }));

const CreatorSearch = () => {
  return (
    <>
      <Item align="center" marginTop={5}>
        <Sectiontitle label="Search 200,000+ creator on PantPoe" />
      </Item>
      <Grid container alignItems="center" justifyContent="space-around">
        <SearchInput style={{ flextGrow: "1" }} />

        <Grid>
          <CustomButton>Search</CustomButton>
        </Grid>
      </Grid>
    </>
  );
};

export default CreatorSearch;
