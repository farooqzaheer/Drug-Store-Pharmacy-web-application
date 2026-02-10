import React, { useState } from "react";
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
  TablePagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getObjects } from "../Api/Api";
import Drag from "./Drag";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DisplayDrags() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["drags"],
    queryFn: () => getObjects("drags"),
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Some error occurred while fetching drags.</div>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
        {t("drag.drag-table--header--title")}
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
                {t("drag.drag-table--header--id")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("drag.drag-table--header--drag-name")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("drag.drag-table--header--category")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("drag.drag-table--header--quantity")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("drag.drag-table--header--price")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("drag.drag-table--header--total-bought")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("drag.drag-table--header--remain-drag")}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontSize: "15px", fontFamily: "Rajdhani" }}
              >
                {t("drag.drag-table--header--action")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((drag) => (
              <TableRow align="left" key={drag.id}>
                <Drag drag={drag} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={() => navigate("/register/drag/")}
          variant="contained"
          sx={{ fontFamily: "Rajdhani" }}
        >
          {t("drag.drag-btn--add-drag")}
        </Button>
      </Box>
    </Box>
  );
}

export default DisplayDrags;
