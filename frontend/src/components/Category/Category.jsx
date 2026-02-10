import React from "react";
import TableCell from "@mui/material/TableCell";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteObject } from "../Api/Api";
import { useMutation } from "@tanstack/react-query";

export default function Category({ category }) {
  const deleteCard = useMutation((id) => {
    return deleteObject("categories", { id });
  });
  return (
    <>
      <TableCell align="left">{category.id}</TableCell>
      <TableCell align="left">{category.name}</TableCell>
      <TableCell align="left">
        <IconButton
          onClick={(e) => {
            if (
              window.confirm("Are you sure you want to delete this doctor?")
            ) {
              deleteCard.mutate(category.id);
            }
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </>
  );
}
