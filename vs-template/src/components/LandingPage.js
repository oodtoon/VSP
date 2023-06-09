import "../App.css";
import { Box, useTheme, Container } from "@mui/material";
import { getCssPropertyValue } from "../utils/style";
import ImproveTeam from "../20943477.jpg";
import CloseDeals from "../20943890.jpg";
import ExportAssets from "../20943944.jpg";
import TrackOpps from "../20945830.jpg";
import Login from "./Login";
import { HashLink as Link } from "react-router-hash-link";

const date = new Date();
const year = date.getFullYear();

const header = {
  p: "0.5em 2em",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  fontSize: "32.91px",
  fontWeight: 600,
  color: getCssPropertyValue("--primary-300"),
  mb: "2em",
};

const login = {
  ...header,
  backgroundColor: getCssPropertyValue("--primary-100"),
  color: "white",
  gridArea: "login",
  p: ".5em",
};

const testimonial = {
  display: "flex",
  justifyContent: "center",
  left: 0,
  right: 0,
  width: "100%",
  height: "7em",
  backgroundColor: getCssPropertyValue("--secondary-100"),
  fontSize: "30px",
  color: "white",
  fontWeight: "bold",
};

const numbers = {
  ...testimonial,
  height: "15em",
  backgroundColor: getCssPropertyValue("--primary-100"),
  color: getCssPropertyValue("--primary-300"),
  mb: "3em",
};

const text = {
  height: "20em",
  fontSize: "17px",
  fontFamily: "roboto",
  fontWeight: "bold",
  margin: "auto",
  justifyContent: "center",
};

const img = {
  ...text,
  backgroundColor: "transparent",
};

const loginField = document.querySelector("#login");

const LandingPage = (props) => {
  const handleScroll = (event) => {
    loginField.scrollIntoView({ behavior: "smooth" });
  };

  const theme = useTheme();

  return (
    <div>
      <Container>
        <div id="login">
          <Box
            sx={{
              ...header,
              display: "grid",
              gridAutoColumns: "1.5fr 1fr",
              gridTemplateAreas: `"header header" "msg login"`,
            }}
          >
            <Box sx={{ gridArea: "header" }}>
              <h1>
                More sales. Less stress.
                <br />
                It's that simple.
              </h1>
            </Box>
            <Box sx={{ maxWidth: "17em", mb: "1em", gridArea: "msg" }}>
              Developed by the markets top performing sales people, our selling
              frame work is test and proven. You'll get more sales with less
              work. Give it a try!
            </Box>
            <Box sx={{ ...login }}>
              <div className="login-action">Log in to sell more!</div>
              <Login
                username={props.username}
                setUsername={props.setUsername}
                password={props.password}
                setPassword={props.setPassword}
                handleLogin={props.handleLogin}
                handleUsername={props.handleUsername}
                handlePassword={props.handlePassword}
                notification={props.notification}
                notificationOpen={props.notificationOpen}
                notificationType={props.notificationType}
              />
            </Box>
          </Box>
        </div>
      </Container>

      <Box sx={{ ...testimonial, display: "grid", gridTemplateRows: "1fr 2fr", gridTemplateAreas: `"head" "brands"`}}>
        <Box sx={{ gridArea: "head", alignSelf: "center", m: "auto" }}>Trusted By Leading Brands!</Box>
        <Box sx={{ gridArea: "brands" }}>Pepsi, Lays, Why, Does, This, Not, Work?</Box>
      </Box>
          
      <Box sx={{ ...numbers }}>Increase Sales By 75%</Box>

      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Box sx={{ ...text, textAlign: "center", pt: "6em" }}>
            What gets tracked, get's done. Track every opportunity you have to
            increase your teams odds of closing deals! Ensure you are following
            sales cycles used by some of the best selling brands in the country.
          </Box>
          <Box sx={{ ...img }}>
            <img src={ImproveTeam} alt="hand shake" />
          </Box>
          <Box sx={{ ...img }}>
            <img src={CloseDeals} alt="hand shake" />
          </Box>
          <Box sx={{ ...text, textAlign: "center", pt: "6em" }}>
            Information is the most important factor in making sure you can make
            a sale. Make sure you have all the info you need to close a sale,
            and see when you have information. So you will know what information
            to go after!
          </Box>
          <Box sx={{ ...text, textAlign: "center", pt: "6em" }}>
            Stay on top of sales opportunties by tracking your tasks needed.
            Better yet, share the information with your contact to make sure you
            both stick to a mutually agreed upon timeline for the sale!
          </Box>
          <Box sx={{ ...img }}>
            <img src={TrackOpps} alt="hand shake" />
          </Box>
          <Box sx={{ ...img }}>
            {" "}
            <img src={ExportAssets} alt="hand shake" />
          </Box>
          <Box sx={{ ...text, mb: "1em", textAlign: "center", pt: "6em" }}>
            Easily export item info to your internal systems! Share the
            information with yourself, your team, and your sales contacts. Make
            sure everyone is one the same page!
          </Box>
        </Box>
      </Container>

      <Container>
        <Box sx={{ ...header, mt: "3em" }}>
          Want to increase your sales? Check out our 7-day free trial!
          <br />
          Test, track, and sell by{" "}
          <Link onClick={handleScroll}>logging in!</Link>
        </Box>
      </Container>

      <Box
        sx={{
          height: "10em",
          mt: "7em",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgb(30, 30, 30)"
              : getCssPropertyValue("--primary-300"),
        }}
      >
        <Box sx={{ color: "white" }}>
          <Box>
            Contact: Brody Bliar Phone: (248) 330-5617 email: brocbla@umich.edu
          </Box>
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
        </Box>
        <Box sx={{ color: "white" }}>© {year} All rights reserved</Box>
      </Box>
    </div>
  );
};

export default LandingPage;
