import React from "react";
import TableCell from "@mui/material/TableCell";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteObject } from "../Api/Api";
import { useMutation } from "@tanstack/react-query";

export default function DoctorDrag({ doctor_drag }) {
  const deleteCard = useMutation((id) => {
    return deleteObject("doctor-drags", { id });
  });
  return (
    <>
      <TableCell align="left">{doctor_drag.id}</TableCell>
      <TableCell align="left">{doctor_drag.doctor_name}</TableCell>
      <TableCell align="left" sx={{ pl: "35px" }}>
        {doctor_drag.doctor_discount}%
      </TableCell>
      <TableCell align="left">{doctor_drag.drag_name}</TableCell>
      <TableCell align="left" sx={{ pl: "40px" }}>
        {doctor_drag.drag_price}
      </TableCell>
      <TableCell align="left" sx={{ pl: "25px" }}>
        {doctor_drag.quantity}
      </TableCell>
      <TableCell align="left" sx={{ pl: "40px" }}>
        {doctor_drag.original_total_price}
      </TableCell>
      <TableCell align="left" sx={{ pl: "40px" }}>
        {doctor_drag.discounted_total_price}
      </TableCell>
      <TableCell align="left">
        <IconButton
          onClick={(e) => {
            if (
              window.confirm("Are you sure you want to delete this doctor?")
            ) {
              deleteCard.mutate(doctor_drag.id);
            }
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </>
  );
}
