/** @format */

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import DOMPurify from "dompurify";
import Popper from "@mui/material/Popper";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { BaseUrl, getFullUrl } from "../helpers/Constant";
import { Avatar, Divider, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const styles = {
  root: {
    marginLeft: 5,
  },
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(5),
  color: "#000",
  backgroundColor: "#f5f4f2",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  zIndex: "1",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    color: "#333",
    // padding: theme.spacing(1, 1, 1, 0),
    padding: "12px 50px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      color: "#000",
      width: "auto",
      "&:focus": {
        width: "auto",
      },
    },
  },
}));

const SpinnerAdornment = withStyles(styles)((props) => (
  <CircularProgress className={props.classes.spinner} size={20} />
));

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
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignContent: "center",
  padding: "10px 10px",
  columnGap: "10px",
  "&:hover": {
    backgroundColor: "#edebeb",
    borderRadius: "5px",
  },
  [theme.breakpoints.up("xs")]: {
    justifyContent: "flex-start",
  },
  [theme.breakpoints.only("xs")]: {
    justifyContent: "flex-start",
  },
}));

const SearchInput = (props) => {
  const { ...others } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [keyword, setKeyword] = React.useState("");
  const [setData, setIsSetData] = React.useState(true);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [newResult, setNewResult] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [lastPage, setLastPage] = React.useState(1);

  const [isMore, setIsMore] = React.useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.target.value.length);
    if (event.target.value.length >= 3) {
      setOpen((previousOpen) => true);
    } else {
      setOpen((previousOpen) => false);
    }
    if (event.target.value.length == 0) {
      setResult([]);
      setKeyword("");
      setNewResult(false);
      setPage(0);
    } else {
      setKeyword(event.target.value);
    }
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

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
          `${BaseUrl}/user/search?page=${page}`,
          {
            params: {
              s: keyword,
              status: "",
            },
          },
          { cancelToken: cancel.token }
        )
        .then((res) => {
          // setResult([]);
          if (res.data.data.length > 0) {
            setResult((oldData) => {
              if (keyword && page === 1) {
                return res.data.data;
              } else if (keyword) {
                return [...oldData, ...res.data.data];
              } else {
                return [...oldData, ...res];
              }
            });
            setLastPage((lastPage) => {
              if (lastPage !== res.data?.last_page) {
                return res.data?.last_page;
              } else {
                return lastPage;
              }
            });
          }
          setNewResult(false);
        });
    } catch (err) {
      console.log(err.message);
    }
    setIsSetData(false);
  };

  const scrollEvent = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    console.log("height", scrollHeight);
    console.log("top", Math.round(scrollTop));
    console.log("client", clientHeight);
    console.log(Math.round(scrollHeight - scrollTop));
    if (clientHeight + scrollTop >= scrollHeight - 2) {
      console.log("now you reach to button");
      setNewResult(true);
    }
  };

  React.useEffect(() => {
    setIsSetData(false);

    async function anyNameFunction() {
      if (keyword != "" && lastPage >= page) {
        setIsSetData(true);
        await getData(keyword);
      }
    }

    setPage((oldpage) => oldpage + 1);
    anyNameFunction();
  }, [keyword, newResult]);

  return (
    <React.Fragment>
      <Search>
        <SearchIconWrapper>
          {setData === true ? <SpinnerAdornment /> : <SearchIcon />}
        </SearchIconWrapper>
        <StyledInputBase
          aria-describedby={id}
          placeholder="Search a creator..."
          value={keyword}
          inputProps={{ "aria-label": "search" }}
          onChange={handleClick}
        />
        <Popper
          style={{ zIndex: 1900 }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          disablePortal
        >
          <SearchResult padding={2}>
            <div className="postcontainer">
              <div className="scrollhostsearch" onScroll={scrollEvent}>
                {result.map((item, index) => {
                  return (
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
                        <div>
                          <h5 style={{ margin: "0px", fontSize: "14px" }}>
                            {item.user_info.user.name}(
                            {item.user_info.profile_url})
                          </h5>
                          <span
                            style={{ fontSize: "12px" }}
                            dangerouslySetInnerHTML={sanitizedData(
                              item?.user_info?.bio?.length > 30
                                ? item?.user_info?.bio.slice(0, 30) + "..."
                                : item?.user_info?.bio || ""
                            )}
                          ></span>
                        </div>
                      </BoxItem>
                    </Link>
                  );
                })}
              </div>
            </div>
          </SearchResult>
        </Popper>
      </Search>
    </React.Fragment>
  );
};

export default SearchInput;
