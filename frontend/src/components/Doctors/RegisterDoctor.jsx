import React, { useState } from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
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

export default function RegisterDoctor() {
  const [inputs, setInputs] = useState({
    name: "",
    last_name: "", // New field for last name
    address: "", // New field for address
    phone: "", // New field for phone
    discount_percentage: "", // Add default value for discount percentage
    total_money_paid: 0, // Set default value to 0
    total_money_unpaid: 0, // Set default value to 0
  });
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
    mutationFn: (data) => addObject("doctors", data),
    onSuccess: () => {
      setSuccessMessage("Doctor added successfully!");
      setShowCard(false);
      setTimeout(() => {
        navigate("/doctors/");
      }, 1000);
    },
    onError: (error) => {
      console.error("Error occurred while adding doctor:", error);
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
              placeholder="Doctor Name"
              name="name"
              value={inputs.name}
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              fullWidth
              placeholder="Last Name"
              name="last_name"
              value={inputs.last_name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              placeholder="Address"
              name="address"
              value={inputs.address}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              placeholder="Phone"
              name="phone"
              value={inputs.phone}
              onChange={handleInputChange}
            />
            <TextField
              required
              fullWidth
              placeholder="Discount Percentage"
              name="discount_percentage"
              type="number"
              value={inputs.discount_percentage}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
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
