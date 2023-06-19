import { Box } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faTiktok, faWix, faWindows, faAmazon, faAirbnb, faShopify, faLyft, faSpotify, faPlaystation, faMailchimp, faGoogle, faSquarespace, faAndroid, faSlack } from "@fortawesome/free-brands-svg-icons";

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
  <FontAwesomeIcon icon={faApple} />,
  <FontAwesomeIcon icon={faTiktok} />,
  <FontAwesomeIcon icon={faWix} />,
  <FontAwesomeIcon icon={faWindows} />,
  <FontAwesomeIcon icon={faAmazon} />,
  <FontAwesomeIcon icon={faAirbnb} />,
  <FontAwesomeIcon icon={faShopify} />,
  <FontAwesomeIcon icon={faLyft} />,
  <FontAwesomeIcon icon={faSpotify} />,
  <FontAwesomeIcon icon={faPlaystation} />,
  <FontAwesomeIcon icon={faMailchimp} />,
  <FontAwesomeIcon icon={faSlack} />,
  <FontAwesomeIcon icon={faGoogle} />,
  <FontAwesomeIcon icon={faSquarespace} />,
  <FontAwesomeIcon icon={faAndroid} />

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
        <Box className="curtain-start"></Box>
        <Box className="curtain-end"></Box>
        <Box className="testimonial-title">Trusted By Leading Brands!</Box>
        <BrandCarousel brands={brands} />
      </Box>
    </>
  );
};

export default Brands;
