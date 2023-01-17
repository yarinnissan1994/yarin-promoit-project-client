import React, { useState, useEffect } from "react";
import { CarouselComponent } from "../../components/Carousel/carousel.component";
import "./home.css";

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % 3);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  return (
    <div className="HomePage--container">
      <h1>Welcome To PromoIt</h1>
      <div className="carousel">
        <CarouselComponent />
      </div>
      <br />
      <h4>
        In order to improve our service we provide a Contact Us section in which
        you can ask questions, suggest ideas or just say hi!
      </h4>
    </div>
  );
};
