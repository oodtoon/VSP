import { Container, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

import Man from "../../1review.jpg";

import "../../App.css";

const reviewImg = {
  fontSize: ".6em",
  fontFamily: "roboto",
  fontWeight: "bold",
  margin: "auto",
  justifyContent: "center",
};

const Review = () => {
  return (
    <>
      <Container>
        <Box className="review-container">
          <Box className="review-words" sx={{ m: "auto", mt: "1em" }}>
            <div>Hear what industry professionals have to say:</div>
            <br />
            <div className="review-title">
              "I just love using this so much it has helped me more than you
              could ever believe!"{" "}
              <span className="name-title">
                - Don Frisko | Senior Sales Director
              </span>
            </div>
          </Box>

          <Box className="review-img-container" sx={{ ...reviewImg }}>
            <div className="quote">
              <FontAwesomeIcon icon={faQuoteRight} />
            </div>
            <img className="review-img" src={Man} alt="smiling man" />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Review;
