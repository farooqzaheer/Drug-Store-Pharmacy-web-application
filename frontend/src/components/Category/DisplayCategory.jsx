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
import { useNavigate } from "react-router-dom";
import Category from "./Category";
import { useTranslation } from "react-i18next";

function DisplayCategory() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getObjects("categories"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Some error occurred while fetching drags.</div>;
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
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("category.cagegory--table--header--id")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("category.cagegory--table--header--category")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("category.cagegory--table--action")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((category) => (
              <TableRow align="left" key={category.id}>
                <Category category={category} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={() => navigate("/register/category/")}
          variant="contained"
          sx={{ fontFamily: "Rajdhani" }}
        >
          {t("category.cagegory--btn--add-category")}
        </Button>
      </Box>
    </Box>
  );
}

export default DisplayCategory;
