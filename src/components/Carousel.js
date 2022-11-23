import React, { useState } from "react";

import '../css/components/Carousel.css';
import arrow from '../assets/images/carousel-arrow.svg';


export const CarouselItem = ({ children, width }) => {
    return (
      <div className='carousel-item' style={{ width: width}}>
        {children}
        
      </div>
    );
  };

  const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = React.Children.count(children) - 1;
        }

        setActiveIndex(newIndex);
    }

    return <div className="flex justify-center">

      <img
        src={arrow}
        alt="Précédente"
        className="cursor-pointer rotate-180 mr-4 h-6 my-auto"
        onClick={() => { updateIndex(activeIndex - 1); }}
      />
      <div className='carousel'>

        <div className='inner' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { width: "100%" });
            })}
        </div>

        <div className="indicators pt-5">

            {React.Children.map(children, (child, index) => {
                return (
                    <div
                      className={`${index === activeIndex ? "bg-secondary_color" : "bg-grey_light"} h-3 w-3 mx-2 rounded-full`}
                      onClick={() => updateIndex(index)}
                    />
                );
            })}
        </div>

      </div>

      <img
        src={arrow}
        alt="Suivante"
        className="cursor-pointer ml-4 h-6 my-auto"
        onClick={() => { updateIndex(activeIndex + 1); }}
      />
      {/* <button className="bg-blue_green_flash" onClick={() => { updateIndex(activeIndex + 1); }}>Next</button> */}
    </div>;
  };

export default Carousel;