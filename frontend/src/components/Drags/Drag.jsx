import React from "react";
import TableCell from "@mui/material/TableCell";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteObject } from "../Api/Api";
import { useMutation } from "@tanstack/react-query";

export default function Drag({ drag }) {
  const deleteCard = useMutation((id) => {
    return deleteObject("doctors", { id });
  });

  return (
    <>
      <TableCell align="left">{drag.id}</TableCell>
      <TableCell align="left">{drag.name}</TableCell>
      <TableCell align="left">{drag.category_name}</TableCell>
      <TableCell align="left">{drag.quantity}</TableCell>
      <TableCell align="left">{drag.price}</TableCell>
      <TableCell align="left" sx={{ pl: "30px" }}>
        {drag.total_bought}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          pl: "30px",
          background: drag.remaining_quantity < 10 ? "#f69490" : "inherit",
        }}
      >
        {drag.remaining_quantity}
      </TableCell>
      <TableCell align="left">
        <IconButton
          onClick={(e) => {
            if (window.confirm("Are you sure you want to delete this drag?")) {
              deleteCard.mutate(drag.id);
            }
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </>
  );
}
