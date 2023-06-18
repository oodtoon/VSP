import { Box } from "@mui/material";
import "../../App.css";

const Numbers = () => {
  return (
    <Box className="numbers-background">
      <Box
        className="numbers-container"
        sx={{
          mb: "2em",
        }}
      >
        <Box className="number-header">
          <div className="words-title">Sales Growth</div>
          <div className="words-main-msg">
            75% of customers still prefer working with people they can trust to make
            final purchases. Give them the trust and connection they need to
            grow your business.
          </div>
          <br />
        </Box>
        <Box className="info">
          Have the right approach when reaching out to your customers by putting their needs and wants first. You will be blown away by the increase in sales by just this simple approach.
          <br />
          <br />
          Your customesr will be happy, your sales team will be happy, and you'll be happy. <span className="win">That's a win, win, win!</span>
        </Box>
        <Box className="number1">
          <div className="number-title">Increase Revenue</div>
          <div className="number-num">55%</div>
          <div className="number-msg">
            <span className="highlight">Increase</span> average revenue for each
            sale and agreement
          </div>
        </Box>
        <Box className="number2">
          <div className="number-title">Establish Business</div>
          <div className="number-num">10x</div>
          <div className="number-msg">
            <span className="highlight">Grow</span> account base larger and
            quicker than ever before
          </div>
        </Box>
        <Box className="number3">
          <div className="number-title">Optimize Performance</div>
          <div className="number-num">5x</div>
          <div className="number-msg">
            <span className="highlight">Optimize</span> sales teams tasks to
            only go after promising leads
          </div>
        </Box>
        <Box className="number4">
          <div className="number-title">Consistent Expansion</div>
          <div className="number-num">800%</div>
          <div className="number-msg">
            <span className="highlight">Increase</span> in total company growth
            after adopting Value Sell
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Numbers;
