import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  CardActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getObject } from "../Api/Api";
import { styled } from "@mui/system";
import img1 from "../../assets/whatif.jpg";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  width: "100%",
  height: "550px",
  margin: "0 auto",
  padding: "10px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  border: "1px solid #ddd",
  position: "relative",
  overflow: "hidden",
}));

const Logo = styled("img")({
  width: "100%",
  height: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0.1,
  zIndex: 0,
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#555",
}));

const FieldLabel = styled(Typography)({
  color: "#666",
  fontWeight: "bold",
});

const FieldValue = styled(Typography)({
  color: "#000",
  fontWeight: "normal",
});

const AvatarContainer = styled(Box)({
  textAlign: "center",
  marginBottom: "10px",
});

const Footer = styled(CardActions)(({ theme }) => ({
  backgroundColor: "#eee",
  padding: "20px",
  borderTop: "1px solid #ddd",
  marginTop: "15px",
}));

const FooterText = styled(Typography)({
  color: "#333",
  marginBottom: "8px",
  display: "flex",
  justifyContent: "center",
});

export default function DoctorDetailBell() {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getObject("doctors", id),
  });

  if (isError) {
    return <>Failed to load data. Please try again.</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  if (!data) {
    return <>No Doctor with ID: {id}</>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#e0f7fa",
        padding: 1,
      }}
    >
      <StyledCard>
        <Logo src={img1} alt="Company Logo" />
        <CardContent sx={{ position: "relative", zIndex: 1 }}>
          <AvatarContainer>
            <Avatar alt={data.name} sx={{ width: 100, height: 100 }} />
          </AvatarContainer>
          <Title variant="h5" component="div">
            {data.name} {data.last_name}
          </Title>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Address:{data.address} &nbsp; phone:{data.phone}
          </Typography>
          <Box sx={{ marginTop: 3 }}>
            <Title variant="h6" component="div" sx={{ marginBottom: 2 }}>
              Billing Information
            </Title>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FieldLabel variant="body1">Unpaid Money:</FieldLabel>
              </Grid>
              <Grid item xs={6}>
                <FieldValue variant="body1">
                  {data.total_money_unpaid}
                </FieldValue>
              </Grid>
              <Grid item xs={6}>
                <FieldLabel variant="body1">Paid Money:</FieldLabel>
              </Grid>
              <Grid item xs={6}>
                <FieldValue variant="body1">{data.total_money_paid}</FieldValue>
              </Grid>
              <Grid item xs={6}>
                <FieldLabel variant="body1">Discount:</FieldLabel>
              </Grid>
              <Grid item xs={6}>
                <FieldValue variant="body1">
                  {data.discount_percentage}%
                </FieldValue>
              </Grid>
              <Grid item xs={6}>
                <FieldLabel variant="body1">Discounted Money:</FieldLabel>
              </Grid>
              <Grid item xs={6}>
                <FieldValue variant="body1">
                  {data.discount_percentage}%
                </FieldValue>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Footer>
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <FooterText variant="body2">
              Company Name: ABC Medical Center
            </FooterText>
            <FooterText variant="body2">
              Address: 1234 Health St, Wellness City, HC 56789
            </FooterText>
            <FooterText variant="body2">Phone: (123) 456-7890</FooterText>
            <FooterText variant="body2">
              <EmailIcon />
              &nbsp; contact@abcmedical.com &nbsp; <FacebookIcon />
              &nbsp; ZaheerPharma
            </FooterText>
          </Box>
        </Footer>
      </StyledCard>
    </Box>
  );
}
