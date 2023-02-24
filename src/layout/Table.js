/** @format */

import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import {
  randomCreatedDate,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import { makeStyles } from "@mui/styles";
import { useSubscriptionContext } from "../context/SubscriptionContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  activeStatus: {
    color: "#4caf50",
    fontWeight: 600,
    fontSize: "1.2em",
    textTransform: "uppercase",
  },
  cancelStatus: {
    color: "#e91e63",
    fontWeight: 600,
    fontSize: "1.2em",
    textTransform: "uppercase",
  },
}));

export default function ColumnTypesGrid({ data }) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const { terminateSubscription } = useSubscriptionContext();

  const history = useHistory();

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const terminateContact = React.useCallback(
    (id) => () => {
      terminateSubscription(id);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, cancel_date: new Date() } : row
        )
      );
    },
    []
  );

  const duplicateUser = React.useCallback(
    (params) => () => {
      history.push(
        `/join/${params.row.creator_profile_url}/checkout/${params.row.plan_id}`
      );
      // setRows((prevRows) => {
      //   const rowToDuplicate = prevRows.find((row) => row.id === id);
      //   return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      // });
    },
    []
  );

  const columns = React.useMemo(
    () => [
      { field: "tier", headerName: "Tier name", width: 150 },
      { field: "creator", headerName: "Creator name", width: 200 },
      { field: "date", headerName: "Date", width: 200 },
      { field: "cost", headerName: "Cost", width: 150 },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        renderCell: (params) => {
          return params.row.cancel_date == null ? (
            <span className={classes.activeStatus}>Active</span>
          ) : (
            <span className={classes.cancelStatus}>Cancelled</span>
          );
        },
      },
      {
        field: "actions",
        headerName: "Action",
        type: "actions",
        flex: 1,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<RemoveCircleTwoToneIcon />}
            label="Terminate Tier"
            onClick={terminateContact(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<AddCircleOutlineTwoToneIcon />}
            label="Extend Tier"
            onClick={duplicateUser(params)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, terminateContact, duplicateUser]
  );

  const transformData = (data) => {
    let tier = "";
    let creator = "";
    let date = "";
    let cost = "";
    let action = "";
    let newData = data?.map((item) => {
      tier = item.subscription_plan.level;
      creator =
        item.creator.user_info.user.name +
        `(${item.creator.user_info.profile_url})`;
      date = `${item.join_date} - ${item.end_date}`;
      cost = `${item.subscription_fee}Ks`;
      return {
        tier: item.subscription_plan.level,
        creator:
          item.creator.user_info.user.name +
          `(${item.creator.user_info.profile_url})`,
        creator_profile_url: item.creator.user_info.profile_url,
        date: `${item.join_date} - ${item.end_date}`,
        cost: `${item.subscription_fee}Ks`,
        id: item.id,
        plan_id: item.subscription_plan.id,
        cancel_date: item.cancel_date,
      };
    });
    return newData;
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid columns={columns} rows={transformData(rows)} />
    </div>
  );
}