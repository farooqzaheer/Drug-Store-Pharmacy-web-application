import { Box, Button } from "@mui/material";
import { useState } from "react";
import NavBar from "./components/Layout/NavBar";
import DisplayDrags from "./components/Drags/DisplayDrags";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import "./components/Localization/localization";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <NavBar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </QueryClientProvider>
  );
}

export default App;
