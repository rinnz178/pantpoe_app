/** @format */

import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../helpers/Constant";
import { useSubscriptionContext } from "../context/SubscriptionContext";
import { useAuthContext } from "../context/AuthContext";

const columns = [
  { field: "tier", headerName: "Tier name", width: 150 },
  { field: "creator", headerName: "Creator name", width: 200 },
  { field: "date", headerName: "Date", width: 200 },
  { field: "cost", headerName: "Cost", width: 150 },
  {
    field: "action",
    flex: 1,
    headerName: "Action",
    renderCell: (params) => {
      return (
        <div>
          {console.log(params)}
          <Button
            onClick={(event) =>
              terminate(params.getValue(params.id, "maths"), event)
            }
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 2, backgroundColor: "#e91e63" }}>
            Terminate
          </Button>
          <Button
            to={`/join/${params.row.creator_profile_url}/checkout/?rid=${params.row.plan_id}`}
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 2, backgroundColor: "#4caf50" }}
            component={Link}>
            Extend
          </Button>
        </div>
      );
    },
  },
];

const extend = (plan_id, profile_url) => {};
const terminate = async (id, event, token) => {
  event.stopPropagation();
  const headers = {
    Authorization: `Bearer ${token}`,
    "My-Custom-Header": "foobar",
  };
  const res = await axios.delete(
    `${BaseUrl}/subscription/${id}
      `,
    { headers }
  );
  console.log(res.status);
};
const rows = [
  {
    id: 1,
    date: new Date(1979, 0, 1),
  },
  {
    id: 2,
    date: new Date(1984, 1, 1),
  },
  {
    id: 3,
    date: new Date(1992, 2, 1),
  },
];

const transformData = (data, token) => {
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
      token: token,
    };
  });
  return newData;
};

const terminate = async (id, event) => {
  event.stopPropagation();
};

export default function RenderCellGrid({ data }) {
  const history = useHistory();
  const { terminateSubscription } = useSubscriptionContext();
  const { token } = useAuthContext();

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={transformData(data, token)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        componentsProps={{
          row: { onMouseOver: handleRowOver },
        }}
      />
    </div>
  );
}
