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

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
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

  // Function to advance to the next slide every 4.5 seconds
  const autoAdvance = () => {
    setTimeout(() => {
      nextSlide();
      autoAdvance();
    }, 4500);
  };

  useEffect(() => {
    autoAdvance(); // Start the auto-advance when the component mounts
  }, []);

  return (
    <div>
      <div className="relative">
        {/* Buttons for previous and next slides */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={nextSlide}
        >
          &gt;
        </button>
        {slides.map((image, index) => (
          <div
            key={index}
            style={{
              height: `${height}px`,
              width: `${width}px`,
            }}
            className={`${
              index === currentIndex ? "visible" : "hidden"
            }`}
          >
            <img
              src={require(`assets/${image.src}`)} // Added .default to fix image loading
              alt={image.heading}
              style={{ height: `${height}px`, width: `${width}px` }}
              className={`fade-in`} // Apply the fade-in animation
            />
            <div className="w-lg m-auto">
              <div className="absolute top-1/3 m-auto text-white">
                <h2
                  className={`text-4xl font-bold font-outline-2 fade-in`}
                >
                  {image.heading}
                </h2>
                <p
                  className={`mt-2 text-xl font-outline-2 fade-in`}
                >
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
