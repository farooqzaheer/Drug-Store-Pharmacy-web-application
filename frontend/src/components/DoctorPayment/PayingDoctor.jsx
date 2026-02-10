import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { addObject, getObjects } from "../Api/Api"; // Ensure these paths are correct
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

export default function AdDoctorPayment() {
  const [inputs, setInputs] = useState({});
  const [doctor, setDoctor] = useState("");
  const [showCard, setShowCard] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch doctors
  const {
    data: doctors,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getObjects("doctors"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDoctorChange = (e) => {
    setDoctor(e.target.value);
  };

  const addInputMutation = useMutation({
    mutationFn: (data) => addObject("doctor-payments", data),
    onSuccess: () => {
      setSuccessMessage("Payment added successfully!");
      setShowCard(false);
      setTimeout(() => {
        navigate("/doctor/payment/");
      }, 2000);
    },
    onError: (error) => {
      console.error("Error occurred while adding payment:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      ...inputs,
      doctor: doctor, // Use doctor ID instead of the entire doctor object
    };

    addInputMutation.mutate(paymentData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Some error occurred while fetching doctors.</div>;
  }

  return (
    <>
      {showCard && (
        <Box sx={style}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "20px" }}
          >
            <FormControl fullWidth>
              <InputLabel id="doctor-label">Doctor</InputLabel>
              <Select
                labelId="doctor-label"
                value={doctor}
                onChange={handleDoctorChange}
                required
              >
                {doctors.map((doc) => (
                  <MenuItem key={doc.id} value={doc.id}>
                    {doc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              placeholder="Amount"
              name="amount"
              type="number"
              value={inputs.amount || ""}
              onChange={handleInputChange}
            />
            <TextField
              required
              fullWidth
              placeholder="Payment Date"
              name="payment_date"
              type="datetime-local"
              value={inputs.payment_date || ""}
              onChange={handleInputChange}
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
