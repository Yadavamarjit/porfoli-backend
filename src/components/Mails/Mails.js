import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { extractRowsCols } from "../../utils/adminUtils";
import { Grid } from "@mui/material";

export default function Mails({ type, data }) {
  const { cols, rows } = extractRowsCols(data);
  console.log({ rows }, extractRowsCols(data));
  return (
    <Grid container>
      <Grid item xs={12} style={{ overflowX: "auto" }}>
        {/* Set overflowX to "auto" to enable horizontal scroll */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {cols.map((colName) => (
                  <TableCell align="center" key={colName}>
                    {colName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {cols.map((colName) => (
                    <TableCell align="center" key={colName}>
                      {row[colName]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
