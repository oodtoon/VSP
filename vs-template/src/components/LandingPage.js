import "../App.css";

import { useRef, useEffect, useState  } from "react";
import MainLogin from "./landing/MainLogin";
import Brands from "./landing/Brands";
import Numbers from "./landing/Numbers";
import ImgSection from "./landing/ImgSection";
import Review from "./landing/Review";
import Demo from "./landing/Demo"
import Footer from "./landing/Footer";


const LandingPage = (props) => {
  
  const [isScroll, setIsScroll] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (isScroll === true) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsScroll(false);
    }
  }, [isScroll]);

  const handleScroll = () => {
    setIsScroll(true);
  };


  return (
    <div>
        <MainLogin
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
          scrollRef={scrollRef}
        />
        <Brands />
        <Numbers />
        <ImgSection />
        <Review />
        <Demo handleScroll={handleScroll} />
        <Footer />
    </div>
  );
};

export default LandingPage;
