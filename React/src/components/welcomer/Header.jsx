import { useState, useEffect } from "react";

const Header = () => {
  const carouselTexts = [
    "Welcome to Our Service",
    "Explore Our Restaurants",
    "Enjoy Delicious Meals",
    // Add more text items as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change the interval as needed

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-bgc pt-36 flex flex-col justify-center items-center h-fit p-32">
      <span className="text-primary font-edu-tas text-4xl md:text-6xl lg:text-7xl">
        {carouselTexts[currentIndex]}
      </span>
      <div className="mt-4 pt-6">
        <span className="text-primary font-edu-tas text-lg md:text-xl lg:text-2xl">
          your stop to a fast, fresh, homemade Maida{" "}
          <span aria-label="heart" role="img">
            ❤️
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
