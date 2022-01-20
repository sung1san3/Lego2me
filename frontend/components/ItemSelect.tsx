import React, { useEffect, useState } from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import MediumCard from "./MediumCard";
import { Square } from "@mui/icons-material";

interface ItemSelectProps {
  cardsData: {
    img: string;
    title: string;
  }[];
  itemListTitle: string;
  //setState: Dispatch<SetStateAction<string>>;
}

const ItemSelect: React.FunctionComponent<ItemSelectProps> = ({
  cardsData,
  itemListTitle,
  //setState,
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
  // Skeleton

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
        className="flex space-x-3 overflow-scroll p-3 pb-4 -ml-3 mb-4 scroll-smooth bg-gray-200 rounded-lg border-x-8"
      >
        {/* items */}
        {cardsData.map(({ img, title }) => (
          // eslint-disable-next-line react/jsx-key
          <MediumCard
            key={img}
            img={img}
            title={title}
            itemListTitle={itemListTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemSelect;
