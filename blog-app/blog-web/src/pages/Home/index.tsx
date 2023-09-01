import { useState } from "react";
import { useAuth } from "store/auth";
import { slides } from "./data";

export default function HomePage() {
  const auth = useAuth();
  const user = auth.state.user;
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // useEffect(() => {
  //   setInterval(() => {
  //     setCurrentIndex(currentIndex + 1);
  //     if (currentIndex === slides.length) {
  //       setCurrentIndex(0);
  //     }
  //   }, 3000)
  // }, [currentIndex])

  let height = window.innerHeight - 64;
  let width = window.innerWidth - 64;
  
  console.log("height", height);
  

  return (
    <div>
      {/* <div 
          className="w-11/12 my-8 mx-auto  border rounded-lg shadow bg-gray-800 border-gray-700 dark:bg-#19212c">
          <div className="p-5">
            <h1 className="mb-2 text-3xl text-center font-bold tracking-tight text-white">
              Welcome {user ? `${user.username}` : "To Blog App"}
            </h1>
             <main className="container mx-auto py-8">
              <section className="mb-8">
                <h2 className="text-2xl text-white font-bold mb-4">Introduction</h2>
                <p className="text-lg text-gray-400 dark:text-gray-400">
                  This blog app is built using Adonis, React, Redux, TypeScript, MySQL, and NodeJS.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl text-white font-bold mb-4">Key Features</h2>
                <ul className="list-disc list-inside">
                  <li className="text-lg text-gray-400 mb-2">User Registration and Authentication</li>
                  <li className="text-lg text-gray-400 mb-2">Blog Post Creation and Management</li>
                  <li className="text-lg text-gray-400 mb-2">Responsive Design</li>
                </ul>
              </section>
              <section className="mb-8">
                {!user ? (
                  <>
                    <h2 className="text-2xl text-white font-bold mb-2">Get Started</h2>
                    <p className="text-lg text-gray-400 mb-4">Sign up to start creating your own blog posts or explore existing posts.</p>
                    <Link
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      to={ROUTE_PATHS.AUTH_SIGNUP}>
                        Sign Up
                      </Link>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl text-white font-bold mb-4">Explore Blogs</h2>
                      <Link
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        to={ROUTE_PATHS.ARTICLES}>
                        Blogs
                      </Link>
                  </>
                )}
              </section>
            </main>
          </div>
        </div> */}
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
            className={`carousel-slide h-full w-full flex ${
              index === currentIndex ? "visible" : "hidden"
            }`}
          >
            <img
              src={require(`assets/${image.src}`)}
              alt={image.heading}
              className={`h-[${height}] w-full object-cover`}
            />
            <div className="absolute left-0 top-0 p-6 text-white">
              <h2 className="text-4xl font-bold">{image.heading}</h2>
              <p className="mt-2">Get to know more about {image.heading} by exploring blogs about {image.heading}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
