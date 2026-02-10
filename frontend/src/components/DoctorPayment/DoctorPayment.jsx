import React from "react";
import TableCell from "@mui/material/TableCell";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteObject } from "../Api/Api";
import { useMutation } from "@tanstack/react-query";

export default function DoctorPayment({ doctor_payment }) {
  const deleteCard = useMutation((id) => {
    return deleteObject("doctors", { id });
  });

  return (
    <>
      <TableCell align="left">{doctor_payment.id}</TableCell>
      <TableCell align="left">{doctor_payment.doctor_name}</TableCell>
      <TableCell align="left">{doctor_payment.amount}</TableCell>
      <TableCell align="left">{doctor_payment.payment_date}</TableCell>
      <TableCell align="left">
        <IconButton
          onClick={(e) => {
            if (
              window.confirm("Are you sure you want to delete this doctor?")
            ) {
              deleteCard.mutate(doctor_payment.id);
            }
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </>
  );
}
