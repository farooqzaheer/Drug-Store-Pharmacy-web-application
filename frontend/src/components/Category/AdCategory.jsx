import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { addObject } from "../Api/Api"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

export default function RegisterCategory() {
  const [inputs, setInputs] = useState({});
  const [showCard, setShowCard] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addInputMutation = useMutation({
    mutationFn: (data) => addObject("categories", data),
    onSuccess: () => {
      setSuccessMessage("Category added successfully!");
      setShowCard(false);
      setTimeout(() => {
        navigate("/categories/");
      }, 1000);
    },
    onError: (error) => {
      console.error("Error occurred while adding Category:", error);
      if (error.response && error.response.data) {
        console.error("Backend error:", error.response.data);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    addInputMutation.mutate(inputs);
  };

  return (
    <>
      {showCard && (
        <Box sx={style}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "20px" }}
          >
            <TextField
              required
              fullWidth
              placeholder="Category"
              name="name"
              value={inputs.name || ""}
              onChange={handleInputChange}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}

      {successMessage && (
        <div style={{ marginBottom: "16px", textAlign: "center" }}>
          <CheckCircleIcon
            sx={{
              fontSize: 48,
              color: "green",
              animation: "bounce 1s ease infinite",
            }}
          />
          <div style={{ color: "green", fontSize: 20, marginTop: "8px" }}>
            {successMessage}
          </div>
        </div>
      )}
    </>
  );
}
