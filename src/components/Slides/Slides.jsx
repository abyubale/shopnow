import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const Slides = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "100px" }}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{ width: "100vh" }}
      >
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg?auto=compress&cs=tinysrgb&w=2000&h=750&dpr=1"
            alt="First slide"
            style={{
              height: "60vh",
            }}
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=1400&dpr=1"
            alt="First slide"
            style={{
              height: "60vh",
            }}
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=1400&dpr=1"
            alt="First slide"
            style={{
              height: "60vh",
            }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slides;
