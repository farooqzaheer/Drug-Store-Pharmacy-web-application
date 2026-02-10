import React, { useState, useEffect } from "react";
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

export default function AdDrDrag() {
  const [inputs, setInputs] = useState({});
  const [doctor, setDoctor] = useState("");
  const [drag, setDrag] = useState("");
  const [showCard, setShowCard] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    data: doctors,
    isLoading: doctorsLoading,
    isError: doctorsError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getObjects("doctors"),
  });

  const {
    data: drags,
    isLoading: dragsLoading,
    isError: dragsError,
  } = useQuery({
    queryKey: ["drags"],
    queryFn: () => getObjects("drags"),
  });

  const {
    data: doctorDrags,
    isLoading: doctorDragsLoading,
    isError: doctorDragsError,
  } = useQuery({
    queryKey: ["doctor-drags"],
    queryFn: () => getObjects("doctor-drags"),
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

  const handleDragChange = (e) => {
    setDrag(e.target.value);
  };

  const addInputMutation = useMutation({
    mutationFn: (data) => addObject("doctor-drags", data),
    onSuccess: () => {
      setSuccessMessage("Doctor drag added successfully!");
      setShowCard(false);
      setTimeout(() => {
        navigate("/doctor/drag/");
      }, 2000);
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        if (error.response.data.non_field_errors) {
          setErrorMessage(
            "A doctor drag with this combination already exists."
          );
        } else {
          setErrorMessage("Error: " + JSON.stringify(error.response.data));
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorDragData = {
      doctor: doctor,
      drag: drag,
      quantity: inputs.quantity,
      total_price: inputs.total_price,
    };
    addInputMutation.mutate(doctorDragData);
  };

  if (doctorsLoading || dragsLoading || doctorDragsLoading) {
    return <div>Loading...</div>;
  }

  if (doctorsError || dragsError || doctorDragsError) {
    return <div>Some error occurred while fetching data.</div>;
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
              <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
              <Select
                labelId="doctor-select-label"
                value={doctor}
                onChange={handleDoctorChange}
                required
              >
                {doctors &&
                  doctors.map((doc) => (
                    <MenuItem key={doc.id} value={doc.id}>
                      {doc.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="drag-select-label">Select Drag</InputLabel>
              <Select
                labelId="drag-select-label"
                value={drag}
                onChange={handleDragChange}
                required
              >
                {drags &&
                  drags.map((dr) => (
                    <MenuItem key={dr.id} value={dr.id}>
                      {dr.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              placeholder="Quantity"
              name="quantity"
              type="number"
              value={inputs.quantity || ""}
              onChange={handleInputChange}
            />
            <TextField
              required
              fullWidth
              placeholder="Total Price"
              name="total_price"
              type="number"
              value={inputs.total_price || ""}
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
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
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
