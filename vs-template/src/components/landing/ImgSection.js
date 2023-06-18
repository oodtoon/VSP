import { Container, Box } from "@mui/material"
import ImproveTeam from "../../20943477.jpg";
import CloseDeals from "../../20943890.jpg";
import ExportAssets from "../../20943944.jpg";
import TrackOpps from "../../20945830.jpg";

import "../../App.css"

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

const ImgSection = () => {
    return (
        <>
             <Container>
        <Box className="img-container">
          <Box
            className="text1"
            sx={{ ...text, textAlign: "center", pt: "6em" }}
          >
            What gets tracked, get's done. Track every opportunity you have to
            increase your teams odds of closing deals! Ensure you are following
            sales cycles used by some of the best selling brands in the country.
          </Box>
          <Box className="img1" sx={{ ...img }}>
            <img src={ImproveTeam} alt="hand shake" />
          </Box>
          <Box className="img2" sx={{ ...img }}>
            <img src={CloseDeals} alt="hand shake" />
          </Box>
          <Box
            className="text2"
            sx={{ ...text, textAlign: "center", pt: "6em" }}
          >
            Information is the most important factor in making sure you can make
            a sale. Make sure you have all the info you need to close a sale,
            and see when you have information. So you will know what information
            to go after!
          </Box>
          <Box
            className="text3"
            sx={{ ...text, textAlign: "center", pt: "6em" }}
          >
            Stay on top of sales opportunties by tracking your tasks needed.
            Better yet, share the information with your contact to make sure you
            both stick to a mutually agreed upon timeline for the sale!
          </Box>
          <Box className="img3" sx={{ ...img }}>
            <img src={TrackOpps} alt="hand shake" />
          </Box>
          <Box className="img4" sx={{ ...img }}>
            {" "}
            <img src={ExportAssets} alt="hand shake" />
          </Box>
          <Box
            className="text4"
            sx={{ ...text, mb: "1em", textAlign: "center", pt: "6em" }}
          >
            Easily export item info to your internal systems! Share the
            information with yourself, your team, and your sales contacts. Make
            sure everyone is one the same page!
          </Box>
        </Box>
      </Container>
        </>
    )
}

export default ImgSection