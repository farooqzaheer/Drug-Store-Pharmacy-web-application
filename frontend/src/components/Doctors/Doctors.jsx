import React from "react";
import TableCell from "@mui/material/TableCell";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteObject } from "../Api/Api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Doctor({ doctor }) {
  const navigate = useNavigate();
  const deleteCard = useMutation((id) => {
    return deleteObject("doctors", { id });
  });

  return (
    <>
      <TableCell align="left">{doctor.id}</TableCell>

      <TableCell align="left">{doctor.name}</TableCell>
      <TableCell align="left" sx={{ pl: "15px" }}>
        {doctor.discount_percentage}%
      </TableCell>
      <TableCell align="left">
        <Button
          variant="contained"
          sx={{ background: "#bbdefb", color: "#555", ml: "-20px" }}
          onClick={() => navigate(`/doctor/detail/${doctor.id}`)}
        >
          print bill
        </Button>
      </TableCell>
      <TableCell align="left">
        <IconButton
          onClick={(e) => {
            if (
              window.confirm("Are you sure you want to delete this doctor?")
            ) {
              deleteCard.mutate(doctor.id);
            }
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </>
  );
}
