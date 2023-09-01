import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import { slides } from "./data";

export default function HomePage() {
  const auth = useAuth();
  const user = auth.state.user;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [height, setHeight] = useState(window.innerHeight - 64);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update height and width based on window dimensions
    const updateDimensions = () => {
      setHeight(window.innerHeight - 64);
      setWidth(window.innerWidth);
    };

    // Initial update
    updateDimensions();

    // Attach event listener to update dimensions on window resize
    window.addEventListener("resize", updateDimensions);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex: any) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex: any) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div>
      <div className="relative">
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
        {slides.map((image, index: number) => (
          <div
            key={index}
            style={{ height: `${height}px`, width: `${width}px`, 
            backgroundImage: `url(assets/${image.src})`
          }}
            className={` ${
              index === currentIndex ? "visible" : "hidden"
            }`}
          >
            {/* <img
              src={require(`assets/${image.src}`)}
              alt={image.heading} 
              style={{ height: `${height}px`, width: `${width}px`}}
            /> */}
            <div className="w-lg absolute left top-1/3 p-6 text-white">
              <h2 className="text-4xl font-bold font-outline-2">{image.heading}</h2>
              <p className="mt-2 text-xl font-outline-2">Explore 
                <span 
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate(ROUTE_PATHS.ARTICLES)}
                >
                  {" "}blogs{" "}   
                </span>
                <Link 
                  to={ROUTE_PATHS.ARTICLES}
                  className="text-blue-500 cursor-pointer"
                >
                  {" "}blogs{" "}   
                </Link>
              about {image.heading}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
