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
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getObjects } from "../Api/Api";
import Doctor from "./Doctors";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DisplayDoctors() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["doctor"],
    queryFn: () => getObjects("doctors"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Some error occurred while fetching drags.</div>;
  }

  return (
    <Box>
      <Typography
        align="center"
        sx={{
          mt: "10px",
          mb: "-15px",
          fontFamily: "Rajdhani",
          color: "#23247d",
          fontSize: "20px",
        }}
      >
        {t("doctor.doctor-table--header--doctor")}
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, mt: 2 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead sx={{ background: "black" }}>
            <TableRow>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctor.doctor-table--header--id")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctor.doctor-table--header--name")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctor.doctor-table--header--discount")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctor.doctor-table--header--paid-money")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctor.doctor-table--header--action")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((doctor) => (
              <TableRow align="left" key={doctor.id}>
                {/* <Link to={`/doctor/detail/${doctor.id}`} style={{textDecoration:"none"}}> */}
                <Doctor doctor={doctor} />
                {/* </Link> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          sx={{ fontFamily: "Rajdhani" }}
          onClick={() => navigate("/register/doctor/")}
          variant="contained"
        >
          {t("doctor.doctor-btn--add-drag")}
        </Button>
      </Box>
    </Box>
  );
}

export default DisplayDoctors;
