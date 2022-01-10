import React from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";

interface ItemSelectProps {
  cardsData: {
    img: string;
    title: string;
  }[];
}

const ItemSelect = () => {
  function handleClickLeft() {
    if (process.browser) {
      const horizontalScroll = document.getElementById("cardcontainer");
      if (horizontalScroll !== null) horizontalScroll.scrollLeft -= 200;
    }
  }

  function handleClickRight() {
    if (process.browser) {
      const horizontalScroll = document.getElementById("cardcontainer");
      if (horizontalScroll !== null) horizontalScroll.scrollLeft += 200;
    }
  }
  return (
    <div>
      <div className="flex-grow text-xl font-semibold">
        <h2>Live Anywhere</h2>
      </div>
      <div className="flex items-center space-x-4 justify-end">
        <button
          className="hover:scale-110 transition duration-200"
          onClick={handleClickLeft}
        >
          <ArrowCircleLeftIcon className="h-8" />
        </button>
        <button
          className="hover:scale-110 transition duration-200"
          onClick={handleClickRight}
        >
          <ArrowCircleRightIcon className="h-8" />
        </button>
      </div>
      <div
        id="cardcontainer"
        className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 scroll-smooth"
      >
        {cardsData.map(({ img, title }) => (
          <MediumCard key={img} img={img} title={title} />
        ))}
      </div>
    </div>
  );
};

export default ItemSelect;
