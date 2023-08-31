import { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Brand from "../Brand";
import "../../App.css";

const BrandArray = ({ brands }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const size = useWindowSize();

  console.log(size);

  useEffect(() => {
    if (size.width >= 580) {
      const interval = setInterval(() => {
        setIsSliding(true);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [size]);

  useEffect(() => {
    if (size.width >= 580) {
      if (isSliding) {
        const timeout = setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
          setIsSliding(false);
        }, 1000);

        return () => clearTimeout(timeout);
      }
    }
  }, [isSliding, currentIndex, brands.length, size]);

  const getVisibleBrands = () => {
    if (size.width >= 580) {
      const endIndex = (currentIndex + 7) % brands.length;
      if (endIndex >= currentIndex) {
        return brands.slice(currentIndex, endIndex);
      } else {
        return brands.slice(currentIndex).concat(brands.slice(0, endIndex));
      }
    } else {
      return brands
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
