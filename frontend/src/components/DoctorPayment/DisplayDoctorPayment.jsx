import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getObjects } from "../Api/Api";
import DoctorPayment from "./DoctorPayment";
import { useNavigate } from "react-router-dom";

function DisplayDoctorPayment() {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["doctor-payments"],
    queryFn: () => getObjects("doctor-payments"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Some error occurred while fetching Doctor Payment.</div>;
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, mt: 2 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead sx={{ background: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontSize: "15px" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                DoctorName
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                amountPaied
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                payment_date
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((doctor_payment) => (
              <TableRow align="left" key={doctor_payment.id}>
                <DoctorPayment doctor_payment={doctor_payment} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={() => navigate("/ad/payment/doctor/")}
          variant="contained"
          sx={{ fontFamily: "Rajdhani" }}
        >
          د پیسو ادا کول
        </Button>
      </Box>
    </Box>
  );
}

export default DisplayDoctorPayment;
