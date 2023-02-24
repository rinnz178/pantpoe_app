/** @format */

import React from "react";
import {
  Grid,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
  Typography,
} from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { BaseUrl } from "../helpers/Constant.js";
import { useAuthContext } from "../context/AuthContext";

function LinearProgressWithLabel({ value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const PollOption = (props) => {
  const { id: postid, poll_options: polls } = props.post;
  const { token } = useAuthContext();
  // const [polls, setPolls] = React.useState([]);
  const [result, setResult] = React.useState([]);
  const [selected, setSelected] = React.useState({
    poll_option_id: "",
  });

  const [finalValue, setfinalValue] = React.useState(false);

  React.useEffect(() => {
    console.log("i am useeffect of poll");
    const controller = new AbortController();
    async function anyfunction() {
      if (postid !== null) {
        await axios({
          method: "get",
          url: `${BaseUrl}/poll/${postid}
                   `,
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            let arrobj = response.data.data;
            // console.log(arrobj.voted.poll_option_id);
            // const pollOptions = arrobj.poll_options;
            // setPolls(pollOptions);

            // setResult((prev) => {
            //   let newarr = arrobj.poll_options.map((item) => {
            //     if (item.id in arrobj.result) {
            //       return { [item.id]: arrobj.result[item.id] };
            //     } else {
            //       return { [item.id]: 0 };
            //     }
            //   });
            //   return { ...newarr };
            // });
            let data = {};
            for (var key in polls) {
              var obj = polls[key].id;
              if (obj in arrobj.result) {
                data = { ...data, [obj]: arrobj.result[obj] };
              } else {
                data = { ...data, [obj]: 0 };
              }
            }
            setResult(data);
            // pollOptions.map((item) => {
            //   if (item.id in arrobj.result) {
            //     data = { ...data, [item.id]: arrobj.result[item.id] };
            //   } else {
            //     data = { ...data, [item.id]: 0 };
            //   }
            // });
            // console.log(data);

            setSelected((prev) => ({
              poll_option_id:
                Object.keys(arrobj.voted).length < 0
                  ? 0
                  : arrobj.voted.poll_option_id,
            }));
          })
          .catch((error) => console.log);
      }
    }

    anyfunction();

    return () => {
      controller.abort();
      setSelected({});
      setResult([]);
    };
  }, [finalValue]);

  const votedSubmit = async (e) => {
    console.log("i am submit");
    const option_id = e.target.value;
    console.log(option_id);
    let formdata = new FormData();
    formdata.append("poll_option_id", option_id);
    console.log("helo");
    if (selected.poll_option_id !== undefined) {
      await axios({
        method: "DELETE",
        url: `${BaseUrl}/poll/${selected.poll_option_id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function () {
          return axios({
            method: "post",
            url: `${BaseUrl}/poll/`,
            data: formdata,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).catch((err) => {
            throw new Error("something went wrong");
          });
        })
        .catch((error) => console.log(error.message));
    } else {
      await axios({
        method: "post",
        url: `${BaseUrl}/poll/`,
        data: formdata,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(e.message);
        });
    }
    setfinalValue(!finalValue);
    // props.changeData();
  };

  return (
    <div>
      <FormLabel component="legend">
        {selected.poll_option_id > 0 ? "Already Voted!" : "Vote Here!"}
      </FormLabel>
      <RadioGroup
        aria-label="gender"
        onChange={votedSubmit}
        name="radio-buttons-group"
      >
        {polls.map((poll, index) => {
          return (
            <Grid container key={index}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControlLabel
                  value={poll.id}
                  disabled={selected.poll_option_id > 0 ? true : false}
                  control={
                    <Radio
                      checked={
                        selected.poll_option_id === poll.id ? true : false
                      }
                    />
                  }
                  label={poll.name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <LinearProgressWithLabel
                  value={result.length == 0 ? 0 : parseInt(result[poll.id])}
                />
              </Grid>
            </Grid>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default PollOption;
