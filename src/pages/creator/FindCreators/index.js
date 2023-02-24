import React from "react";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import { CButton } from "../../../layout/CCButton";
import { withStyles } from "@material-ui/core/styles";
import { Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import DOMPurify from "dompurify";
import { BaseUrl, getFullUrl } from "../../../helpers/Constant";
import axios from "axios";
import { Avatar, Typography } from "@mui/material";
import Popper from "@mui/material/Popper";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "auto",
    marginTop: "48px",
    // width:'55vw',
    alignContent:'center',
    height:'80vh'

  },
  search: {
    alignContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  header: {
    textAlign: "center",
  },
  searchbox: {
    alignItems: "center",
    // margin: "auto",
    alignContent: "center",
    justifyContent:'center'
  },
  button:{
    background: "linear-gradient(0deg, rgba(51,149,255,1) 0%, rgba(3,224,255,1) 100%)",
    borderRadius: "50px",
    fontWeight: "bold",
    height: "10vh",
    padding: "13px 17px",
    color:'white'
  },
  content:{
    width:'55vw'
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    backgroundColor: "#f5f4f2",
    color: "#333",
    // padding: theme.spacing(1, 1, 1, 0),
    padding: "12px 50px",
    // vertical padding + font size from searchIcon
    borderRadius: "28px",
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      color: "#000",
      width: "39vw",
      "&:focus": {
        width: "39vw",
      },
      
    },
    [theme.breakpoints.up("md")]: {
      color: "#000",
      width: "30vw",
      "&:focus": {
        width: "35vw",
      },
      
    },
    [theme.breakpoints.up("sm")]: {
      color: "#000",
      width: "39vw",
      "&:focus": {
        width: "35vw",
      },
      
    },
  },
}));

const SearchResult = styled("div")(({ theme }) => ({
  position: "static",
  height: "auto",
  width: "200px",
  backgroundColor: "#fff",
  color: "#333",

  borderRadius: "5px",
  [theme.breakpoints.up("xs")]: {
    position: "static",
    zIndex: "1000",
    width: "300px",
  },
  [theme.breakpoints.only("xs")]: {
    position: "static",
    zIndex: "1000",
    width: "200px",
  },
}));

const BoxItem = styled("div")(({ theme }) => ({
  display: "flex",
  boxSizing: "border-box",
  height: 100,
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "12px 14px",
  columnGap: "10px",
  "&:hover": {
    backgroundColor: "#edebeb",
    borderRadius: "5px",
  },
}));

export const FindCreators = (props) => {
  const classes = useStyles();
  const { ...others } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [keyword, setKeyword] = React.useState("");
  const [setData, setIsSetData] = React.useState(true);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState([]);

  const [isMore, setIsMore] = React.useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.target.value.length);
    if (event.target.value.length >= 3) {
      setOpen((previousOpen) => true);
    } else {
      setOpen((previousOpen) => false);
    }
    setKeyword(event.target.value);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

  const toggleReadMore = () => {
    setIsMore(!isMore);
  };

  const getData = async (keyword) => {
    let cancel;
    if (cancel) {
      cancel.cancel();
    }
    cancel = axios.CancelToken.source();
    setIsSetData(true);
    try {
      await axios
        .get(
          `${BaseUrl}/user/search`,
          {
            params: {
              s: keyword,
              status: "",
            },
          },
          { cancelToken: cancel.token }
        )
        .then((res) => {
          setResult([]);
          if (res.data.data.length > 0) {
            setResult(res.data.data);
          }
          setIsSetData(false);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    setIsSetData(true);

    async function anyNameFunction() {
      if (keyword != "") {
        await getData(keyword);
      }
    }
    anyNameFunction();
  }, [keyword]);

  return (
    <Box className={classes.wrapper}>
      <Grid container>
        <Grid item xs={12} md={12} marginBottom={1}>
          <h1 className={classes.header}>Find Creators</h1>
        </Grid>
      </Grid>
      <Box className={classes.searchbox} >
        <Grid container>
          <Grid xs={12} >
            <StyledInputBase
              value={keyword}
              inputProps={{ "aria-label": "search" }}
              onChange={handleClick}
              placeholder="Search a creator...."
            />
            {/* <span className={classes.button}>
              <SearchIcon />
              Search
            </span> */}
          </Grid>
        </Grid>
      </Box>
      <br />
      <Divider />
      <br />
      <Grid
        container
        spacing={2}
        marginTop={1}
        className={classes.content}
        style={{ flexDirection: "row", flex: "wrap", alignItems: 'center' }}
      >
        {result.map((item, index) => {
          return (
            <Grid gap={3} style={{ width: "33%", margin: "4px 0px" }}>
              <Link
                to={`/creators/${item.user_info.profile_url}`}
                onClick={() => {
                  setResult([]);
                  setOpen(false);
                  setKeyword("");
                  {
                    props?.closeSidebar && props?.closeSidebar();
                  }
                }}
                key={index}
                style={{ textDecoration: "none", color: "#333" }}
              >
                <BoxItem>
                  <Avatar
                    src={getFullUrl(item.user_info.profile_image)}
                    alt={item.user_info.user.name}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', }}>
                    <h5 style={{ margin: "0px" }}>
                      {item.user_info.user.name}({item.user_info.profile_url})
                    </h5>
                    <span
                      style={{ fontSize: "0.825rem" }}
                      dangerouslySetInnerHTML={sanitizedData(
                        item?.user_info?.bio?.length > 80
                          ? item?.user_info?.bio.slice(0, 80) + "..."
                          : item?.user_info?.bio || ""
                      )}
                    ></span>
                  </div>
                </BoxItem>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
