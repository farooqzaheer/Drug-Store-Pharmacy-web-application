import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import { Menu, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [values, setValues] = useState(""); // corrected useState usage
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        {" "}
        {/* corrected onClick handler */}
        <LanguageIcon sx={{ color: "#fff" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(false);
        }}
      >
        <MenuItem
          onClick={(e) => {
            i18n.changeLanguage("en");
            handleClose();
          }}
        >
          En
        </MenuItem>
        <MenuItem
          onClick={() => {
            i18n.changeLanguage("ps");
            handleClose();
          }}
        >
          Ps
        </MenuItem>
      </Menu>
    </>
  );
}

export default LanguageSwitcher;
