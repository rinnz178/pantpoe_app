import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../helpers/Constant";
import { Grid, Paper } from "@mui/material";
import "../../assets/payment_history.css";
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
} from "@mui/material";
import { Link } from "react-router-dom";

export const PaymentHistory = () => {
  const [paymentHistoryRows, setPaymentHistoryRows] = useState([]);

  useEffect(() => {
    axios.get(`${BaseUrl}/creator/payment-history?limit=3`).then((res) => {
      const rows = res.data.data;
      if (rows && rows?.length) {
        setPaymentHistoryRows(rows);
      }
    });
  }, []);
  return (
    <div className="main">
      <h2>Payment History</h2>
      <Grid container style={{ width:'auto',flexDirection:'row',justifyContent:'center'}}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{width:'auto'}}>CHARGE DATE</TableCell>
                  <TableCell align="center">AMT</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentHistoryRows && !paymentHistoryRows?.length && (
                  <div style={{ marginTop: 10, marginBottom: 10 ,textAlign:'center',alignContent:'center'}}>
                    <span style={{textAlign:'center',margin:'auto'}}>No history!</span>
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
                      
                      component="th"
                      scope="row"
                    >
                      {row.created_at}
                    </TableCell>
                    <TableCell align="center">
                      {row.total_amount}
                    </TableCell>
                    <TableCell align="center">
                      {row.status}
                    </TableCell>
                    <TableCell  align="center">
                      {" "}
                      <Link to="#" >
                        <button>REFUND</button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};
