import { Box, useTheme, Container } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "../../App.css";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Box
      className="footer-container"
        sx={{
          mt: "7em",
          overscrollBehavior: "contain",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgb(30, 30, 30)"
              : getCssPropertyValue("--primary-300"),
        }}
      >
        <Container>
          <Box className="footer-grid">
            <Box className="branding">Value Sell Form</Box>
            <Box className="link-attribution" sx={{ color: "white" }}>
              <a
                className="img-link"
                href="https://www.freepik.com/free-vector/business-partnership-teamwork-cooperation-making-deal-goal-achievement-beneficial-collaboration-handshaking-businessmen-cartoon-characters_12084746.htm#query=sales&position=25&from_view=search&track=sph"
              >
                Teamwork
              </a>{" "}
              <a
                className="img-link"
                href="https://www.freepik.com/free-vector/consultative-selling-abstract-concept_12084791.htm#query=sales&position=39&from_view=search&track=sph"
              >
                Handshake
              </a>{" "}
              <a
                className="img-link"
                href="https://www.freepik.com/free-vector/sales-managers-with-laptops-growth-chart-sales-growth-manager-accounting-sales-promotion-operations-concept-white-background_11667200.htm#query=sales&position=41&from_view=search&track=sph"
              >
                Tracking
              </a>{" "}
              and{" "}
              <a
                className="img-link"
                href="https://www.freepik.com/free-vector/tiny-business-people-manager-tasks-goals-accomplishment-chart-task-management-project-managers-tool-task-management-software-concept_11669245.htm#query=sales%20tracker&position=37&from_view=search&track=ais"
              >
                Sharing
              </a>{" "}
              images by vectorjuice on Freepik
              <Box sx={{ color: "white" }}>
                <a
                  className="img-link"
                  href="https://www.freepik.com/free-photo/portrait-young-man-with-curly-hair-wearing-shirt_11015700.htm#query=man%20smiling&position=18&from_view=search&track=ais"
                >
                  Review image
                </a>{" "}
                by wayhomestudio on Freepik
              </Box>
              <Box sx={{ color: "white" }}>© {year} All rights reserved</Box>
            </Box>
            <Box className="footer-contact" sx={{ color: "white" }}>
              <a className="contact-link" href="https://www.facebook.com">About</a>
              <a className="contact-link" href="https://www.1worldsync.com">Contact</a>
              <a className="contact-link" href="https://www.valueselling.com">Inspiration</a>
            </Box>
            <Box className="socials">
              <a className="social-link" href="https://github.com/oodtoon">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                className="social-link"
                href="https://www.youtube.com/@hobbies2seriously"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a className="social-link" href="https://www.linkedin.com/in/brody-blair-46ab72164">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
