import { Box, Container } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import { HashLink as Link } from "react-router-hash-link";

const header = {
    p: "0.5em 2em",
    backgroundColor: getCssPropertyValue("--secondary-200"),
    fontWeight: 600,
    color: getCssPropertyValue("--primary-300"),
  };

const Demo = ({handleScroll}) => {
  return (
    <>
      <Container>
        <Box className="demo-container" sx={{ ...header, mt: "3em", fontSize: "32px" }}>
          <div>Want to increase your sales? Check out our <span className="demo-offer">7-day free trial!</span></div>
          <br />
          <div>
            Test, track, and sell by{" "}
            <Link onClick={handleScroll}>logging in!</Link>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default Demo;
