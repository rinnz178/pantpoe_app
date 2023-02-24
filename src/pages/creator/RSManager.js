import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  Popover,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Box, width } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import MenuButton from "../../layout/MenuItem";
import {
  CheckBox,
  Close,
  DeleteOutline,
  FilterListOutlined,
  InboxOutlined,
  KeyboardArrowDown,
  MailOutline,
  Send,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { CustomButton } from "../../layout/CutomerButton";
import { CustomButtonWhite } from "../../layout/CutomButtonWhite";
import { Link } from "react-router-dom";
import send from "../../assets/others/sent-email.svg";
import download from "../../assets/others/download.svg";
import filter from "../../assets/others/filter.svg";
import more from "../../assets/others/more.svg";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import gear from "../../assets/menu/gear.svg";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import {
  BaseUrl,
  getByLastMonth,
  getBycurrentWeek,
  getByThisMonth,
  getByLastWeek,
} from "../../helpers/Constant";
import { useAuthContext } from "../../context/AuthContext";
import moment from "moment";
import RSFilter from "./RSFilter";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CButton } from "../../layout/CCButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up("md")]: {
    container: {
      margin: "25px",
    },
    header: {
      margin: "10px",
    },
    customButtonWhite: {
      height: "40px",
      margin: "8px 4px",
      padding: "0px 0px",
      // width:'18vh'
    },
    alignStart: {
      textAlign: "start",
    },
    alignEnd: {
      textAlign: "end",
    },
  },
  [theme.breakpoints.down("md")]: {
    container: {
      margin: "10px",
    },
    header: {
      margin: "4px",
    },
    customButtonWhite: {
      height: "40px",
      margin: "8px 2px",
      padding: "0px 15px",
    },
    alignStart: {
      textAlign: "justify",
    },
    alignEnd: {
      textAlign: "justify",
    },
  },
  linkBtn: {
    fontSize: "12px",
    color: "rgb(51,149,255)",
  },
  addition: {
    background: "#f7f7f7",
    height: "90px",
    borderRadius: "4px",
    padding: "20px",
  },
  cardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  subTitle: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  customButton: {
    color: "#fff",
    height: "40px",
    padding: "0px 16px",
  },
  buttonImage: {
    width: 20,
    height: 20,
    display: "inline-flex",
  },
  tableContainer: {
    boxShadow: "none",
  },
  tableCell: {
    padding: "8px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  FilterSelection: {
    borderRadius: "50px",
    color: "black",
    height: "40px",
    width: "100px",
    textTransform: "capitalize",
    fontSize: "0.872rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  display: "inline-flex",
  margin: "6px",
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: "100%",
  color: "#000",
  [theme.breakpoints.up("md")]: {
    // marginLeft: theme.spacing(1),
    width: "100",
  },
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
    padding: theme.spacing(1.4, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "18ch",
      "&:focus": {
        width: "autoc",
      },
    },
  },
}));

//   Sample Table Start

function createDataSimple(id, date, amt, status) {
  return { id, date, amt, status };
}

const rowSamples = [
  createDataSimple(1, "2021-03-01", "$10", "Paid"),
  createDataSimple(2, "2021-03-01", "$10", "Paid"),
  createDataSimple(3, "2021-03-01", "$10", "Paid"),
];
//   Sample Table End

// DataTable Start
function createData(
  id,
  name,
  email,
  currentTier,
  lifeTime,
  joinDate,
  cancelDate,
  accessExpiration
) {
  return {
    id,
    name,
    email,
    currentTier,
    lifeTime,
    joinDate,
    cancelDate,
    accessExpiration,
  };
}

const rowsdata = [
  createData(
    1,
    "Ma",
    "mama@gmail.com",
    "Platinum",
    "Yes",
    "2021-05-10",
    "2021-07-10",
    "2022-05-10"
  ),
  createData(
    2,
    "Ma Chan",
    "mama@gmail.com",
    "Platinum",
    "Yes",
    "2021-05-10",
    "2021-07-10",
    "2022-05-10"
  ),
  createData(
    3,
    "Ma Ei",
    "mama@gmail.com",
    "Platinum",
    "Yes",
    "2021-05-10",
    "2021-07-10",
    "2022-05-10"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "currentTier",
    disablePadding: false,
    label: "Current Tier",
  },
  {
    id: "lifeTime",
    disablePadding: false,
    label: "Life Time",
  },
  {
    id: "joinDate",
    disablePadding: false,
    label: "Join Date",
  },
  {
    id: "cancelDate",
    disablePadding: false,
    label: "Cancel Date",
  },
  {
    id: "accessExpiration",
    disablePadding: false,
    label: "Acess Expiration",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteOutline />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListOutlined />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
// DataTable End
function FilterSelection({ lists, appliedFilterById, selectedSaveFilter }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    appliedFilterById(event.target.value);
  };
  React.useEffect(() => {
    if (selectedSaveFilter) {
      setAge(selectedSaveFilter);
    }
    return () => {
      setAge("");
    };
  }, [selectedSaveFilter]);
  return (
    <Select
      className={classes.FilterSelection}
      value={age}
      onChange={handleChange}
      displayEmpty
      inputProps={{
        "aria-label": "Without label",
      }}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {lists?.map((list, index) => (
        <MenuItem key={index} value={list.id}>
          Filter-({list.id})
        </MenuItem>
      ))}
    </Select>
  );
}

const initialOptionData = {
  statusValue: [],
  tierValue: [],
  joinDate: { name: "", start: "", end: "" },
};

const RSManager = () => {
  // pop over start

  // pop over end
  const classes = useStyles();
  const { token } = useAuthContext();
  // DataTable Start
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [paymentHistoryRows, setPaymentHistoryRows] = useState([]);
  const [filter, setFilter] = React.useState([]);
  const [filterOption, setFilterOption] = React.useState(initialOptionData);
  const [filterChange, setFilterChange] = React.useState(false);
  const [filterData, setFilterData] = React.useState([]);
  const [activeState, setActiveState] = React.useState({ name: "active" });
  const [selectedSaveFilter, setSelectedSaveFilter] = React.useState("");
  const filterRefresh = () => {
    setFilterChange(!filterChange);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // DataTable End
  //Drawer Start

  const getData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BaseUrl}/subscription/`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setRows(response.data.data);
        setFilter(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFilter = async () => {
    await axios({
      method: "get",
      url: `${BaseUrl}/filter/`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data) {
          setFilterData(res.data.filters);
        }
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    const controller = new AbortController();
    getData();
    console.log("you first called");
    return () => {
      controller.abort();
    };
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    getFilter();
    // console.log("you second called");
    return () => {
      controller.abort();
    };
  }, [filterChange]);

  useEffect(() => {
    axios.get(`${BaseUrl}/creator/payment-history?limit=3`).then((res) => {
      const rows = res.data.data;
      if (rows && rows?.length) {
        setPaymentHistoryRows(rows);
      }
    });
  }, []);

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d sec",
      m: "a minute",
      mm: "%d min",
      h: "an hour",
      hh: "%d hr",
      d: "a day",
      dd: "%d d",
      w: "a week",
      ww: "%d w",
      M: "a month",
      MM: "%d m",
      y: "a year",
      yy: "%d yr",
    },
  });
  // filtering start
  const handleSearchChange = (e) => {
    const value = e.target.value;
    let newrow = "";
    console.log(value);
    if (value.length >= 3) {
      console.log("you called");

      var regExp = new RegExp("^" + value, "i");
      newrow = rows.filter((row) => {
        return (
          regExp.test(row.user_info.user.email) ||
          regExp.test(row.user_info.user.name)
        );
      });
    } else {
      newrow = rows;
    }

    // console.log(newrow);
    setFilter(newrow);
  };

  const filterByStatus = (name) => {
    console.log(name);
    let dateobj = {};
    let newArray = "";
    let newarray = [];

    if (name === "new") {
      dateobj = getByThisMonth();

      newarray = rows.filter((item) => {
        let joinDate = new Date(item.join_date);
        let expireDate = new Date(item.end_date);
        return (
          joinDate.getTime() > dateobj.start && joinDate.getTime() < dateobj.end
        );
      });
    } else if (name === "active") {
      let current = new Date().getTime();

      newarray = rows.filter((item) => {
        let joinDate = new Date(item.join_date);
        let expireDate = new Date(item.end_date);
        return expireDate.getTime() > current;
      });
    } else if (name === "cancelled") {
      newarray = rows.filter((item) => {
        return item.cancel_date !== null;
      });
    } else {
      newarray = rows;
    }
    setFilter(newarray);
    setActiveState((prev) => ({ ...prev, name }));
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const apiFilter = async (type, data) => {
    await axios({
      method: "get",
      url: `${BaseUrl}/creator/rsmanager/`,
      params: {
        type: type,
        status: JSON.stringify(data.statusValue),
        tiers: JSON.stringify(data.tierValue),
        this_week: data.joinDate.name === "thisWeek" ? 1 : 0,
        last_week: data.joinDate.name === "lastWeek" ? 1 : 0,
        this_month: data.joinDate.name === "thisMonth" ? 1 : 0,
        last_month: data.joinDate.name === "lastMonth" ? 1 : 0,
        fdate: data.joinDate.start,
        tdate: data.joinDate.end,
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setFilter(res.data.data);
      })
      .catch((error) => console.log(error.message));
  };

  const deleteFilter = async (id) => {
    await axios({
      method: "DELETE",
      url: `${BaseUrl}/filter/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data) {
          filterRefresh();
          clearFilterOption();
        }
      })
      .catch((error) => console.log(error.message));
  };

  const appliedFilterById = (id) => {
    let result = filterData.find((x) => x.id === id);
    let newarray = { ...filterOption };
    if (result) {
      let name = "";
      if (result.this_week === 1) {
        name = "thisWeek";
      } else if (result.this_month === 1) {
        name = "thisMonth";
      } else if (result.last_week === 1) {
        name = "lastWeek";
      } else if (result.last_month === 1) {
        name = "lastMonth";
      } else {
        name = "";
      }
      newarray.joinDate.name = name;
      newarray.joinDate.start = result.from_date;
      newarray.joinDate.end = result.to_date;
      newarray.statusValue =
        result.status == !null
          ? result.status.split(",")?.map((item) => parseInt(item))
          : [];
      newarray.tierValue =
        result.tiers == !null
          ? result.tiers.split(",")?.map((item) => parseInt(item))
          : [];
      setFilterOption(newarray);
      apiFilter("apply_filter", newarray);
      setSelectedSaveFilter(id);
    }
  };
  const getFilterOption = (data) => {
    console.log(data);
    setFilterOption(data);
    apiFilter("apply_filter", data);
  };
  const clearFilterOption = () => {
    setFilter(rows);
    setFilterOption(initialOptionData);
    setSelectedSaveFilter("");
  };

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.header}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" display="inline">
                  Relationship Manager
                </Typography>
                {/* <MenuButton
                  label="As of today"
                  icon={<KeyboardArrowDown fontSize="large" />}
                /> */}
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Box className={classes.header}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={9} sm={9} md={9} lg={3}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search Name or Email"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleSearchChange}
                  />
                </Search>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={2} xl={2}>
                <Grid container>
                  <Grid item xs={6} sm={6} md={6} xl={3}>
                    <CButton
                      size="small"
                      btnactive={"active"}
                      // style={{
                      //   margin: "6px",
                      //   textAlign: "start",
                      //   width: "115px",
                      //   display: "flex",
                      //   justifyContent: "space-around",
                      //   alignItems: "center",
                      // }}
                      className={classes.customButton}
                      endIcon={<SendIcon />}
                    >
                      {/* <Avatar
                        alt="Remy Sharp"
                        src={send}
                        className={classes.buttonImage}
                      /> */}
                      Message
                    </CButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={9}
                xl={6}
                lg={6}
                className={classes.alignEnd}
              >
                <CustomButton
                  size="small"
                  style={{ margin: "8px 2px" }}
                  onClick={() => filterByStatus("active")}
                  btnactive={activeState.name === "active" ? "active" : ""}
                >
                  Acitve
                </CustomButton>
                <CustomButton
                  style={{ margin: "8px 2px" }}
                  size="small"
                  onClick={() => filterByStatus("new")}
                  btnactive={activeState.name === "new" ? "active" : ""}
                  className={classes.customButtonWhite}
                >
                  New
                </CustomButton>
                <CustomButton
                  size="small"
                  onClick={() => filterByStatus("cancelled")}
                  btnactive={activeState.name === "cancelled" ? "active" : ""}
                  className={classes.customButtonWhite}
                >
                  Cancel
                </CustomButton>
                <FilterSelection
                  lists={filterData}
                  appliedFilterById={appliedFilterById}
                  selectedSaveFilter={selectedSaveFilter}
                />

                <Button
                  onClick={clearFilterOption}
                  className={classes.linkBtn}
                  sx={{ float: "right" }}
                >
                  Clear all
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box className={classes.header}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} style={{ textAlign: "end" }}>
                <React.Fragment>
                  <Button onClick={toggleDrawer("right", true)}>
                    <Avatar
                      alt="Remy Sharp"
                      src={gear}
                      sx={{ width: 20, height: 20, float: "right" }}
                    />
                  </Button>
                  <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                  >
                    <RSFilter
                      filterOption={filterOption}
                      getFilterOption={getFilterOption}
                      filterData={filterData}
                      filterRefresh={filterRefresh}
                      selectedSaveFilter={selectedSaveFilter}
                      appliedFilterById={appliedFilterById}
                      deleteFilter={deleteFilter}
                      toggleDrawer={toggleDrawer}
                    />
                  </Drawer>
                </React.Fragment>
              </Grid>
            </Grid>
          </Box>

          <Box className={classes.header}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Box sx={{ width: "100%" }}>
                  <Paper sx={{ width: "100%", mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                      >
                        <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={rows.length}
                        />
                        <TableBody>
                          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                           rows.slice().sort(getComparator(order, orderBy)) */}
                          {stableSort(filter, getComparator(order, orderBy))
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            ?.map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={(event) =>
                                    handleClick(event, row.id)
                                  }
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    {row.user_info.user.name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.user_info.user.email}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.subscription_plan.level}
                                  </TableCell>
                                  <TableCell align="center">
                                    {moment(row.join_date).to(
                                      row.end_date,
                                      true
                                    )}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.join_date}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.cancel_date === null
                                      ? "-"
                                      : row.cancel_date}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.end_date}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: (dense ? 33 : 53) * emptyRows,
                              }}
                            >
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                  <FormControlLabel
                    control={
                      <Switch checked={dense} onChange={handleChangeDense} />
                    }
                    label="Dense padding"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Box className={classes.header}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    style={{ padding: "16px 0px 0px 16px" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <AccountCircleIcon fontSize="large" style={{marginRight:'10vh'}}/>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sm={10}
                    md={10}
                    style={{ padding: "16px 0px 0px 6px" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" display="inline">
                      Creator
                    </Typography>
                    <div
                      style={{ padding: "4px 0px" }}
                      className={classes.subTitle}
                    >
                      Your pantpoethu for 19 months
                    </div>
                    <div
                      style={{ padding: "0px 0px 4px 0px" }}
                      className={classes.subTitle}
                    >
                      No Reward
                    </div>
                  </Grid>
                </Grid>
                <Divider style={{ margin: "6px 0px" }} />
                <Grid item xs={12} sm={12} md={12}>
                  <Box
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    alignContent={"center"}
                  >
                    <CustomButton
                      size="small"
                      btnactive={"active"}
                      style={{
                        color: "#fff",
                        height: "36px",
                        margin: "6px",
                        padding: "0px 20px",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      endIcon={<SendIcon />}
                    >
                      {/* <Avatar
                        alt="Remy Sharp"
                        src={send}
                        sx={{ width: 20, height: 18, display: "inline-flex" }}
                      /> */}
                      Message
                    </CustomButton>
                    <CustomButton
                      size="small"
                      btnactive={"active"}
                      style={{
                        color: "#fff",
                        height: "36px",
                        margin: "6px",
                        padding: "0px 20px",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      endIcon={<MoreHorizIcon />}
                    >
                      {/* <Avatar
                        alt="Remy Sharp"
                        src={more}
                        sx={{ width: 20, height: 18, display: "inline-flex" }}
                      /> */}
                      More
                    </CustomButton>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Box>
          <Box className={classes.header}>
            <Card className="card">
              <CardContent className="cardcontent">
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      display="inline"
                      style={{ fontWeight: "bold" }}
                    >
                      ADDITIONAL DETAILS
                    </Typography>
                    <Box
                      style={{ padding: "4px", fontWeight: "bold" }}
                      className={classes.addition}
                    >
                      :D
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
          <Box className={classes.header}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: "16px 0px 0px 16px" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      display="inline"
                      style={{ fontWeight: "bold" }}
                    >
                      CONTACT INFORMATION
                    </Typography>
                  </Grid>
                </Grid>
                <Divider style={{ margin: "6px 0px" }} />
                <Grid container style={{ margin: "6px 0px" }}>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Typography
                      variant="subtitle1"
                      display="inline"
                      className={classes.subTitle}
                    >
                      Email Address
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Link to="#" className={classes.linkBtn}>
                      COPY
                    </Link>
                  </Grid>
                </Grid>
                <Grid container style={{ margin: "6px 0px" }}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Typography
                      variant="subtitle1"
                      display="inline"
                      className={classes.subTitle}
                    >
                      sample@gmail.com
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
          <Box className={classes.header}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: "16px 0px 0px 16px" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      display="inline"
                      style={{ fontWeight: "bold" }}
                    >
                      PAYMENT HISTORY
                    </Typography>
                  </Grid>
                </Grid>
                <Divider style={{ margin: "6px 0px" }} />
                <Grid container style={{ margin: "6px 0px" }}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <TableContainer
                      component={Paper}
                      className={classes.tableContainer}
                    >
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.tableCell}>
                              CHARGE DATE
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                            >
                              AMT
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                            >
                              STATUS
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                            ></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paymentHistoryRows && !paymentHistoryRows?.length && (
                            <div style={{marginTop: 10, marginBottom: 10}}>
                              No history!
                            </div>
                          )}
                          {paymentHistoryRows?.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                className={classes.tableCell}
                                component="th"
                                scope="row"
                              >
                                {row.created_at}
                              </TableCell>
                              <TableCell
                                className={classes.tableCell}
                                align="center"
                              >
                                {row.total_amount}
                              </TableCell>
                              <TableCell
                                className={classes.tableCell}
                                align="center"
                              >
                                {row.status}
                              </TableCell>
                              <TableCell
                                className={classes.tableCell}
                                align="center"
                              >
                                {" "}
                                <Link to="#" className={classes.linkBtn}>
                                  REFUND
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <Divider style={{ margin: "6px 0px" }} />
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: "16px" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1">
                      Showing more 3 more recent bills.
                    </Typography>
          
                    <Link to="/creator/payment-history"
                      className={classes.linkBtn}
                      sx={{ float: "right" }}
                    >
                      See all payment history
                    </Link>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RSManager;
