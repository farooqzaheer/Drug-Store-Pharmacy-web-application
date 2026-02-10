import { Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Rajdhani from "../../assets/NotoNaskhArabic-VariableFont_wght.ttf";
import { useTranslation } from "react-i18next";

export default function Navigations() {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Tabs
        sx={{
          "& .MuiButtonBase-root.MuiTab-root": {
            fontSize: "15px",
            display: "flex",
            color: "#fff",
            fontFamily: "Rajdhani",
          },
          "& .Mui-selected": {
            color: "#fff",
            opacity: 0.7,
            borderRadius: 2,
          },
        }}
      >
        <Tab
          style={{ font: "Rajdhani" }}
          label={t("navigation.navigation-tab--label--drag")}
          component={Link}
          to="/"
        />
        <Tab
          label={t("navigation.navigation-tab--label--categories")}
          component={Link}
          to="/categories/"
        />
        <Tab
          label={t("navigation.navigation-tab--label--doctor")}
          component={Link}
          to="/doctors/"
        />
        <Tab
          label={t("navigation.navigation-tab--label--doctor-purchase")}
          component={Link}
          to="/doctor/drag/"
        />
        <Tab
          label={t("navigation.navigation-tab--label--daily-spends")}
          component={Link}
          to="/"
        />
        <Tab
          label={t("navigation.navigation-tab--label--doctor-pyment")}
          component={Link}
          to="/doctor/payment/"
        />
        <Tab
          label={t("navigation.navigation-tab--label--login")}
          component={Link}
          to="/"
        />
      </Tabs>
    </div>
  );
}
