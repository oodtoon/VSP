import { Box } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";

import BrandCarousel from "./BrandCarousel";

import "../../App.css";

const testimonial = {
  display: "grid",
  margin: "auto",
  justifyContent: "center",
  left: 0,
  right: 0,
  width: "100%",
  backgroundColor: getCssPropertyValue("--secondary-100"),
  fontSize: "30px",
  color: "white",
  fontWeight: "bold",
};

const brands = [
  "Pepsi",
  "Coke",
  "Crayola",
  "Dell",
  "Lenovo",
  "Chevy",
  "Ford",
  "Miller",
  "Tesla",
  "Disney",
  "Starbucks",
];

const Brands = () => {
  return (
    <>
      <Box
        className="testimonial-container"
        sx={{
          ...testimonial,
        }}
      >
        <Box className="testimonial-title">Trusted By Leading Brands!</Box>
        <BrandCarousel brands={brands} />
      </Box>
    </>
  );
};

export default Brands;
