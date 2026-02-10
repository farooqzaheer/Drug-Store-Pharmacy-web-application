import React, { useState } from "react";
import { TextField, Button, Box, FormControl } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
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

export default function DragRegister() {
  const [inputs, setInputs] = useState({});
  const [category, setCategory] = useState(null);
  const [showCard, setShowCard] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch categories
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getObjects("categories"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event, value) => {
    setCategory(value);
  };

  const addInputMutation = useMutation({
    mutationFn: (data) => addObject("drags", data),
    onSuccess: () => {
      setSuccessMessage("Drag added successfully!");
      setShowCard(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: (error) => {
      console.error("Error occurred while adding drag:", error);
      if (error.response && error.response.data) {
        console.error("Backend error:", error.response.data);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dragData = {
      ...inputs,
      category: category?.id, // Sending category_id
    };

    addInputMutation.mutate(dragData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Some error occurred while fetching categories.</div>;
  }

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
              placeholder="Drag Name"
              name="name"
              value={inputs.name || ""}
              onChange={handleInputChange}
              autoFocus
            />
            <FormControl fullWidth>
              <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.name}
                value={category}
                onChange={handleCategoryChange}
                renderInput={(params) => (
                  <TextField {...params} label="Select Category" required />
                )}
              />
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
              placeholder="Price"
              name="price"
              type="number"
              value={inputs.price || ""}
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
