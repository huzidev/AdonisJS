
export default function HomePage() {
  return (
    // <div>
    //   <div 
    //       className="w-11/12 my-8 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //       <div className="p-5">
    //         <h1 className="mb-4 text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
    //           Welcome To Blog App
    //         </h1>
    //         <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
    //           Name : 
    //         </h2> 
    //         <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
    //           Email :
    //         </h2> 
    //         <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
    //           Joined Date
    //         </h2> 
    //         <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
    //           Total Blogs
    //         </h2> 
    //       </div>
    //     </div>
    // </div>
    <div id="default-carousel" 
      className="w-11/12 my-8 mx-auto relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" data-carousel="slide"
    >
    {/* <!-- Carousel wrapper --> */}
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
        </div>
    </div>
    {/* <!-- Slider indicators --> */}
    <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        <button type="button" className="w-3 h-3 bg-white/30 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 bg-white/30 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 bg-white/30 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 bg-white/30 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 bg-white/30 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
    {/* <!-- Slider controls --> */}
    <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white group-hover:bg-white/30 transition-all duration-300 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex bg-white items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 group-hover:bg-white/30 transition-all duration-300 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>
  )
}
