import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import { Link } from "react-router-dom";
import Navigations from "./Navigations";
import LanguageSwitcher from "../Localization/LanguageSwitcher";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#37474f" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <DynamicFormIcon />
          </IconButton>
          <Navigations />
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
