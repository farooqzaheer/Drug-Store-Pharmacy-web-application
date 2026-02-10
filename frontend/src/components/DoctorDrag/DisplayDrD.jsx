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
import DoctorDrag from "./DoctorDrag";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DisplayDoctorDrags() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["doctor-drags"],
    queryFn: () => getObjects("doctor-drags"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // Log error for debugging
    console.error("Error fetching doctor drags:", isError);
    return <div>Error fetching drags. Please try again later.</div>;
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
        {t("doctordrag.doctor-drag-table--header--title")}
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
                {t("doctordrag.doctor-drag-table--header--id")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctordrag.doctor-drag-table--header--doctor-name")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctordrag.doctor-drag-table--header--doctor-discount")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctordrag.doctor-drag-table--header--drag-name")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctordrag.doctor-drag-table--header--drag-price")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctordrag.doctor-drag-table--header--quantity")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t(
                  "doctordrag.doctor-drag-table--header--original-totale-Price"
                )}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t(
                  "doctordrag.doctor-drag-table--header--discounted-totale-price"
                )}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("doctordrag.doctor-drag-table--header--action")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((doctor_drag) => (
              <TableRow align="left" key={doctor_drag.id}>
                <DoctorDrag doctor_drag={doctor_drag} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          sx={{ fontFamily: "Rajdhani" }}
          onClick={() => navigate("/doctor/drag/buying/")}
          variant="contained"
        >
          {t("doctordrag.doctor-drag-btn--sell-drag")}
        </Button>
      </Box>
    </Box>
  );
}

export default DisplayDoctorDrags;
