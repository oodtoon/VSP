import { useState, useEffect } from "react";
import Brand from "../Brand";
import "../../App.css";

const BrandArray = ({ brands }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [brands.length]);

  const visibleBrands = brands.concat(brands.slice(0, 5)).slice(currentIndex, currentIndex + 5);

  return (
    <div className="carousel">
      <div className="carousel-brands">
        {visibleBrands.map((brand, index) => {

          return (
            <div className="carousel-box">
              <Brand key={index} brand={brand}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandArray;

/* <div className="carousel">
      <div className="carousel-brands">
        {brands.map((brand, index) => {
          const slideIndex =
            (index - currentIndex + brands.length) % brands.length;
          const slideStyle = {
            transform: `translateX(-${slideIndex * 100}%)`,
          };
          return <div className="carousel-box">
              <Brand key={index} style={slideStyle} brand={brand} />
          </div>;
        })}
      </div>
    </div>*/
