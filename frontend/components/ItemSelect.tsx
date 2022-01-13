import React from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import MediumCard from "./MediumCard";

interface ItemSelectProps {
  cardsData: {
    img: string;
    title: string;
  }[];
  itemListTitle?: string;
}

const ItemSelect: React.FunctionComponent<ItemSelectProps> = ({
  cardsData,
  itemListTitle,
}) => {
  function handleClickLeft() {
    if (process.browser) {
      const horizontalScroll = document.getElementById(`${itemListTitle}`);
      if (horizontalScroll !== null) horizontalScroll.scrollLeft -= 200;
    }
  }

  function handleClickRight() {
    if (process.browser) {
      const horizontalScroll = document.getElementById(`${itemListTitle}`);
      if (horizontalScroll !== null) horizontalScroll.scrollLeft += 200;
    }
  }
  return (
    <div>
      <div className="flex items-center space-x-4 justify-between">
        <h2 className="text-xl font-semibold text-Montserrat">
          {itemListTitle}
        </h2>
        <div>
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
      </div>
      <div
        id={itemListTitle}
        className="flex overflow-scroll scrollbar-hide p-3 -ml-3 scroll-smooth bg-gray-200 rounded-lg"
      >
        {/* items */}
        {cardsData.map(({ img, title }) => (
          <MediumCard key={img} img={img} title={title} />
        ))}
      </div>
    </div>
  );
};

export default ItemSelect;
