import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "utils/responsive.css";
import { slides } from "./data";
import "./styles.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [height, setHeight] = useState<number>(window.innerHeight - 64);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const updateDimensions = () => {
      setHeight(window.innerHeight - 64);
      setWidth(window.innerWidth);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function prevSlide() {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }

  function nextSlide() {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     nextSlide();
  //   }, 2500)
  // }, [currentIndex])

  function addURL(type: string) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", JSON.stringify({ ['category']: type }));
    const newUrl = ROUTE_PATHS.ARTICLES + '?' + searchParams.toString();
    navigate(newUrl);
  }

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
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
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
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
        {slides.map((image, index: number) => (
          <div
            key={index}
            // style={{
            //   height: `${height}px`,
            //   width: `${width}px`,
            // }}
            className={`${index === currentIndex ? "visible" : "hidden"}`}
          >
            <img
              src={require(`assets/${image.src}`)} // Added .default to fix image loading
              alt={image.heading}
              style={{ height: `${height}px`, width: `${width}px`}}
              className={`fade-in`} // Apply the fade-in animation
            />
              <div className="responsive mx-auto absolute top-[40%] left-1/2 -translate-x-1/2 text-white">
                <h2 className={`text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-lg xxs:text-lg font-bold font-outline-2 fade-in`}>
                  {image.heading}
                </h2>
                <p className={`mt-2 text-xl lg:text-lg md:text-lg sm:text-lg xs:text-sm xxs:text-sm font-outline-2 fade-in`}>
                  Explore
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => addURL(image.heading.toLowerCase())}
                  >
                    {" "}
                    blogs{" "}
                  </span>
                  about {image.heading}
                </p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
