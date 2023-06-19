import { useState, useEffect } from "react";
import Brand from "../Brand";
import "../../App.css";

const BrandArray = ({ brands }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isSliding) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
        setIsSliding(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isSliding, currentIndex, brands.length]);

  const getVisibleBrands = () => {
    const endIndex = (currentIndex + 7) % brands.length;
    if (endIndex >= currentIndex) {
      return brands.slice(currentIndex, endIndex);
    } else {
      return brands.slice(currentIndex).concat(brands.slice(0, endIndex));
    }
  };

  const visibleBrands = getVisibleBrands();

  return (
    <div className="carousel">
      <div className={`carousel-brands${isSliding ? " sliding" : ""}`}>
        {visibleBrands.map((brand, index) => {
          return (
            <div key={index} className="carousel-box">
              <Brand brand={brand} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandArray;
