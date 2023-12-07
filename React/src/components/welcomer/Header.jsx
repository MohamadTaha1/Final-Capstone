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
    <div className="bg-primary flex justify-center items-center h-fit p-40">
      <h1 className="text-bgc font-edu-tas text-3xl md:text-5xl lg:text-7xl">
        {carouselTexts[currentIndex]}
      </h1>
    </div>
  );
};

export default Header;
