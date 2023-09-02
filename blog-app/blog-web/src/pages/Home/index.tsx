import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slides } from "./data";
import "./styles.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [height, setHeight] = useState(window.innerHeight - 64);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateDimensions = () => {
      setHeight(window.innerHeight - 64);
      setWidth(window.innerWidth);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // const autoAdvance = () => {
  //   setTimeout(() => {
  //     nextSlide();
  //     autoAdvance();
  //   }, 4500);
  // };

  // useEffect(() => {
  //   autoAdvance(); // Start the auto-advance when the component mounts
  // }, []);

  return (
    <div>
      <div className="relative">
        {/* Buttons for previous and next slides */}
        <button
          className="slider-button left-0"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="prev"
          onClick={prevSlide}
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Previous
          </span>
        </button>
        <button
          onClick={nextSlide}
          className="slider-button right-0"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="next"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
        {slides.map((image, index) => (
          <div
            key={index}
            style={{
              height: `${height}px`,
              width: `${width}px`,
            }}
            className={`${index === currentIndex ? "visible" : "hidden"}`}
          >
            <img
              src={require(`assets/${image.src}`)} // Added .default to fix image loading
              alt={image.heading}
              style={{ height: `${height}px`, width: `${width}px` }}
              className={`fade-in`} // Apply the fade-in animation
            />
            <div className="w-lg m-auto">
              <div className="absolute top-1/3 m-auto text-white">
                <h2 className={`text-4xl font-bold font-outline-2 fade-in`}>
                  {image.heading}
                </h2>
                <p className={`mt-2 text-xl font-outline-2 fade-in`}>
                  Explore
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => navigate(ROUTE_PATHS.ARTICLES)}
                  >
                    {" "}
                    blogs{" "}
                  </span>
                  about {image.heading}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
